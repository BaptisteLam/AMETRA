// worldmap.jsx — renders the real world SVG (user-provided) with styling hooks.

const WORLD_SVG_PATH = 'assets/world.svg';
// ViewBox from the user-provided svg: "0 0 2000 857"
const WORLD_VB = { x: 0, y: 0, w: 2000, h: 857 };

// France mainland bbox (from parsing): 963..1027 x 175..230
// Zoomed france viewBox with padding
const FRANCE_VB = { x: 955, y: 168, w: 80, h: 75 };

// Projection helper: we don't have true lat/lon → svg mapping for this SVG,
// but we can infer from known anchors:
//   Paris  (lon 2.35, lat 48.85)  ≈ svg (995, 196)
//   Marseille (lon 5.37, lat 43.3) ≈ svg (1010, 225)  (bottom of mainland)
// Linear fit:
//   x = 987.8 + (lon - 2.35) * 2.39
//   y = 196 + (48.85 - lat) * 5.23   (y grows downward)
function lonlatToSvg(lon, lat) {
  const x = 987.8 + (lon - 2.35) * 2.39;
  const y = 196 + (48.85 - lat) * 5.23;
  return { x, y };
}

const CITY_COORDS = {
  'Cherbourg-en-Cotentin': lonlatToSvg(-1.62, 49.63),
  'Asnières':              lonlatToSvg( 2.28, 48.91),
  'Clamart':               lonlatToSvg( 2.26, 48.80),
  'Le Plessis-Pâté':       lonlatToSvg( 2.31, 48.57),
  'Longué-Jumelles':       lonlatToSvg( 0.12, 47.38),
  'Bourges':               lonlatToSvg( 2.40, 47.08),
  'Roanne':                lonlatToSvg( 4.07, 46.04),
  'Lyon':                  lonlatToSvg( 4.83, 45.76),
  'Bordeaux':              lonlatToSvg(-0.58, 44.84),
  'Toulouse':              lonlatToSvg( 1.44, 43.60),
  "Laudun-l'Ardoise":      lonlatToSvg( 4.66, 44.09),
  'Aix-en-Provence':       lonlatToSvg( 5.45, 43.53),
};

function useWorldSvgText() {
  return window.__WORLD_SVG__ || null;
}

// Apply a uniform "grayed out" style and highlight FR + TN.
function applyWorldStyle(svgEl, { highlightMode = 'muted' } = {}) {
  // Base styling for all country paths
  svgEl.querySelectorAll('path').forEach(p => {
    p.style.fill = '#ECEAE4';
    p.style.stroke = '#D8D6D0';
    p.style.strokeWidth = '0.4';
    p.style.transition = 'fill 300ms';
  });
  // Highlight France (all paths with class="France")
  const frenchPaths = svgEl.querySelectorAll('path.France, path[class*="France"]');
  frenchPaths.forEach(p => {
    p.style.fill = highlightMode === 'focus' ? '#FFFFFF' : '#1A1A1C';
    p.style.stroke = '#0E0E10';
    p.style.strokeWidth = '0.5';
  });
  // Highlight Tunisia
  const tn = svgEl.querySelector('#TN');
  if (tn) {
    tn.style.fill = 'oklch(58% 0.22 25)';
    tn.style.stroke = 'oklch(45% 0.22 25)';
    tn.style.strokeWidth = '0.5';
    tn.style.opacity = '0.9';
  }
}

function RealWorldMap({ viewBox, style, highlightMode, onMount }) {
  const containerRef = React.useRef(null);
  const svgText = useWorldSvgText();

  React.useEffect(() => {
    if (!svgText || !containerRef.current) return;
    const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    const svg = doc.documentElement;
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    if (viewBox) svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    applyWorldStyle(svg, { highlightMode });
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(svg);
    if (onMount) onMount(svg);
  }, [svgText, viewBox && viewBox.x, viewBox && viewBox.y, viewBox && viewBox.w, viewBox && viewBox.h, highlightMode]);

  return <div ref={containerRef} style={style}/>;
}

// France-scene detail map: same SVG, focused viewBox, cities overlaid in the
// same coordinate space.
function FranceDetailMap({ time, start, entryDur, hoveredCity, setHoveredCity }) {
  const localT = time - start;
  const mapReveal = Math.max(0, Math.min(1, localT / entryDur));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.4 + 0.6 * mapReveal,
        transition: 'opacity 400ms',
      }}>
        <RealWorldMap viewBox={FRANCE_VB} highlightMode="focus"
          style={{ width: '100%', height: '100%' }}/>
      </div>

      <svg
        viewBox={`${FRANCE_VB.x} ${FRANCE_VB.y} ${FRANCE_VB.w} ${FRANCE_VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
      >
        {window.FRANCE_CITIES.map((c, i) => {
          const coord = CITY_COORDS[c.name];
          if (!coord) return null;
          const delay = entryDur + 0.08 * i;
          const pinT = Math.max(0, Math.min(1, (localT - delay) / 0.35));
          if (pinT <= 0) return null;
          const isHovered = hoveredCity === c.name;
          const dimmed = hoveredCity && !isHovered;
          const color = c.type === 'integration' ? 'oklch(58% 0.22 25)' : '#0E0E10';
          const baseR = c.type === 'integration' ? 1.1 : 0.75;
          const r = isHovered ? baseR * 1.6 : baseR;

          return (
            <g key={c.name}
               transform={`translate(${coord.x}, ${coord.y})`}
               opacity={pinT * (dimmed ? 0.35 : 1)}
               style={{ cursor: 'pointer' }}
               onMouseEnter={() => setHoveredCity(c.name)}
               onMouseLeave={() => setHoveredCity(null)}>
              <circle r={3} fill="transparent" style={{ pointerEvents: 'all' }}/>
              {c.type === 'integration' && (
                <circle r={r + 0.7 + (Math.sin(time * 3 + i) + 1) * 0.4}
                  fill="none" stroke={color} strokeOpacity={0.45} strokeWidth={0.2}/>
              )}
              <circle r={r} fill={color}/>
              <circle r={r * 0.4} fill="#FFFFFF"/>
              <g transform={`translate(${r + 1.5}, 0.7)`} style={{ pointerEvents: 'none' }}>
                <text
                  fontFamily="Inter, system-ui, sans-serif"
                  fontSize={isHovered ? 2.2 : 1.7}
                  fontWeight={isHovered ? 600 : 500}
                  fill={isHovered ? '#0E0E10' : 'rgba(20,20,24,0.78)'}>
                  {c.name}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

Object.assign(window, {
  RealWorldMap, FranceDetailMap,
  WORLD_VB, FRANCE_VB, CITY_COORDS,
});
