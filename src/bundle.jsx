
// ===== animations.jsx =====

// animations.jsx
// Reusable animation starter: Stage, Timeline, Sprite, easing helpers.
// Usage (in an HTML file that loads React + Babel):
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <MyScene />
//   </Stage>
//
// Inside <Stage>, any child can call useTime() to read the current
// playhead (seconds). Or wrap content in <Sprite start={1} end={4}>...</Sprite>
// to only render during that window -- children receive a `localTime` and
// `progress` via the useSprite() hook.
//
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: (t) => t,

  // Quad
  easeInQuad:    (t) => t * t,
  easeOutQuad:   (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Cubic
  easeInCubic:    (t) => t * t * t,
  easeOutCubic:   (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  // Quart
  easeInQuart:    (t) => t * t * t * t,
  easeOutQuart:   (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),

  // Expo
  easeInExpo:  (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },

  // Sine
  easeInSine:    (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine:   (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

  // Back (overshoot)
  easeOutBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: (t) => {
    const c1 = 1.70158, c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },

  // Elastic
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? (ease[i] || Easing.linear) : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }) {
  return (t) => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({ time: 0, duration: 10, playing: false });

const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({ localTime: 0, progress: 0, duration: 0 });
const useSprite = () => React.useContext(SpriteContext);

function Sprite({ start = 0, end = Infinity, children, keepMounted = false }) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration)
    ? clamp(localTime / duration, 0, 1)
    : 0;

  const value = { localTime, progress, duration, visible };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0, y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em',
}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let ty = 0;

  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }

  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity',
    }}>
      {text}
    </div>
  );
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0, y = 0,
  width = 400, height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null, // {label: string} for striped placeholder
}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let scale = 1;

  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }

  const content = placeholder ? (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>
      {placeholder.label || 'image'}
    </div>
  ) : (
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
  );

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity',
    }}>
      {content}
    </div>
  );
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0, y = 0,
  width = 100, height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render, // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const { localTime, duration } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let scale = 1;

  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }

  const overrides = render ? render(spriteCtx) : {};

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides,
    }} />
  );
}


function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children,
}) {
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch { return 0; }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);

  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try { localStorage.setItem(persistKey + ':t', String(time)); } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(
        el.clientWidth / width,
        (el.clientHeight - barH) / height
      );
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;
          else { next = duration; setPlaying(false); }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  const displayTime = hoverTime != null ? hoverTime : time;

  const ctxValue = React.useMemo(
    () => ({ time: displayTime, duration, playing, setTime, setPlaying }),
    [displayTime, duration, playing]
  );

  return (
    <div
      ref={stageRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        background: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Canvas area — vertically centered in remaining space */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        <div
          ref={canvasRef}
          style={{
            width, height,
            background,
            position: 'relative',
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            flexShrink: 0,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
        >
          <TimelineContext.Provider value={ctxValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>

      {/* Playback bar — stacked below canvas, never overlapping */}
      <PlaybackBar
        time={displayTime}
        actualTime={time}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying(p => !p)}
        onReset={() => { setTime(0); }}
        onSeek={(t) => setTime(t)}
        onHover={(t) => setHoverTime(t)}
      />
    </div>
  );
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({ time, duration, playing, onPlayPause, onReset, onSeek, onHover }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const timeFromEvent = React.useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);

  const onTrackMove = (e) => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };

  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };

  const onTrackDown = (e) => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };

  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = (e) => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);

  const pct = duration > 0 ? (time / duration) * 100 : 0;
  const fmt = (t) => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor((total * 100) % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',

      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0,
    }}>
      <IconButton onClick={onReset} title="Return to start (0)">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2v10M12 2L5 7l7 5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </IconButton>
      <IconButton onClick={onPlayPause} title="Play/pause (space)">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="2" width="3" height="10" fill="currentColor"/>
            <rect x="8" y="2" width="3" height="10" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
          </svg>
        )}
      </IconButton>

      {/* Current time: fixed width so it doesn't thrash */}
      <div style={{
        fontFamily: mono,
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        width: 64, textAlign: 'right',
        color: '#f6f4ef',
      }}>
        {fmt(time)}
      </div>

      {/* Scrub track */}
      <div
        ref={trackRef}
        onMouseMove={onTrackMove}
        onMouseLeave={onTrackLeave}
        onMouseDown={onTrackDown}
        style={{
          flex: 1,
          height: 22,
          position: 'relative',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{
          position: 'absolute',
          left: 0, right: 0, height: 4,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute',
          left: 0, width: `${pct}%`, height: 4,
          background: 'oklch(72% 0.12 250)',
          borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute',
          left: `${pct}%`, top: '50%',
          width: 12, height: 12,
          marginLeft: -6, marginTop: -6,
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}/>
      </div>

      {/* Duration: fixed width */}
      <div style={{
        fontFamily: mono,
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        width: 64, textAlign: 'left',
        color: 'rgba(246,244,239,0.55)',
      }}>
        {fmt(duration)}
      </div>
    </div>
  );
}

function IconButton({ children, onClick, title }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6,
        color: '#f6f4ef',
        cursor: 'pointer',
        padding: 0,
        transition: 'background 120ms',
      }}
    >
      {children}
    </button>
  );
}


Object.assign(window, {
  Easing, interpolate, animate, clamp,
  TimelineContext, useTime, useTimeline,
  Sprite, SpriteContext, useSprite,
  TextSprite, ImageSprite, RectSprite,
  Stage, PlaybackBar,
});



// ===== data.jsx =====
// data.jsx — coords, cities, KPIs, map paths

// Normalized coordinates on a 1920x1080 canvas for the world map
// (equirectangular-ish — hand-tuned for visual balance, not GIS accuracy)
const WORLD_VIEWBOX = { w: 1920, h: 1080 };

// KPIs (original-preserving numbers)
const KPIS = [
  { key: 'people',    value: '750',    unit: 'personnes',            note: "Population équilibrée — 50% techniciens, 50% ingénieurs & experts",  pos: { x: 230, y: 470 },  size: 170 },
  { key: 'revenue',   value: '55',     unit: 'M€ de CA',             note: "Croissance ~10%/an, CA multiplié par 2 en 10 ans",                   pos: { x: 230, y: 730 },  size: 160 },
  { key: 'clients',   value: '+200',   unit: 'clients',              note: "Partenaires industriels en France et à l'international",             pos: { x: 880, y: 210 },  size: 170 },
  { key: 'sites',     value: '3',      unit: "sites d'intégration",  note: "Cœur industriel : France + Tunisie",                                 pos: { x: 1140, y: 260 }, size: 150 },
  { key: 'studies',   value: '9',      unit: "bureaux d'études",     note: "Ingénierie mécanique, électronique, logicielle",                     pos: { x: 1420, y: 330 }, size: 160 },
  { key: 'locations', value: '12',     unit: 'implantations',        note: "Présence au plus près des clients",                                  pos: { x: 1650, y: 560 }, size: 150 },
];

// Country people-pins (on the world map view)
const COUNTRY_PINS = [
  { key: 'france',  label: 'FRANCE',  people: 650, pos: { x: 990,  y: 420 } },
  { key: 'tunisia', label: 'TUNISIE', people: 100, pos: { x: 1015, y: 530 } },
];

// France cities (on the zoomed France view, coords in a 620x720 viewbox)
const FRANCE_VIEWBOX = { w: 620, h: 720 };
const FRANCE_CITIES = [
  { name: 'Cherbourg-en-Cotentin', pos: { x: 200, y: 160 }, type: 'implantation' },
  { name: 'Asnières',              pos: { x: 360, y: 220 }, type: 'bureau',      meta: 'Siège' },
  { name: 'Clamart',               pos: { x: 365, y: 232 }, type: 'bureau' },
  { name: 'Le Plessis-Pâté',       pos: { x: 375, y: 248 }, type: 'integration', meta: 'Site intégration' },
  { name: 'Longué-Jumelles',       pos: { x: 270, y: 330 }, type: 'integration' },
  { name: 'Bourges',               pos: { x: 380, y: 345 }, type: 'bureau' },
  { name: 'Roanne',                pos: { x: 430, y: 400 }, type: 'bureau' },
  { name: 'Lyon',                  pos: { x: 455, y: 420 }, type: 'bureau' },
  { name: 'Bordeaux',              pos: { x: 275, y: 490 }, type: 'implantation' },
  { name: 'Toulouse',              pos: { x: 325, y: 580 }, type: 'bureau' },
  { name: "Laudun-l'Ardoise",      pos: { x: 440, y: 540 }, type: 'implantation' },
  { name: 'Aix-en-Provence',       pos: { x: 485, y: 560 }, type: 'bureau' },
];

// Sites d'intégration (detail cards)
const INTEGRATION_SITES = [
  {
    country: 'FRANCE',
    city: 'Le Plessis-Pâté',
    headcount: '50 p.',
    label: 'Intégration MN — PC industriels, bancs de test',
    flag: '🇫🇷',
  },
  {
    country: 'FRANCE',
    city: 'Longué-Jumelles',
    headcount: '190 p.',
    label: 'Prototypage, proximité client, projet stratégique défense',
    flag: '🇫🇷',
  },
  {
    country: 'TUNISIE',
    city: 'Tunis',
    headcount: '90 p.',
    label: 'Best-cost pour la production série, réactivité',
    flag: '🇹🇳',
  },
];

Object.assign(window, {
  WORLD_VIEWBOX, KPIS, COUNTRY_PINS,
  FRANCE_VIEWBOX, FRANCE_CITIES,
  INTEGRATION_SITES,
});


// ===== worldmap.jsx =====
// worldmap.jsx — stylized dot-based world map
// Made of tiny squares arranged to suggest continents (not a real SVG map).

// Precomputed continent footprints — each entry: {cx, cy, r, density}
// r = radius (in a 1920x1080 space); we scatter dots within it.
// These are placed by eye to approximate continent positions.

function generateWorldDots() {
  // Seeded deterministic random
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const dots = [];
  const addBlob = (cx, cy, rx, ry, density) => {
    const count = Math.floor(density * rx * ry / 1000);
    for (let i = 0; i < count; i++) {
      // Elliptical jittered distribution
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      const x = cx + Math.cos(a) * r * rx + (rand() - 0.5) * 8;
      const y = cy + Math.sin(a) * r * ry + (rand() - 0.5) * 8;
      dots.push({ x, y, s: 2.5 + rand() * 1.2 });
    }
  };

  // NORTH AMERICA (multiple blobs for shape)
  addBlob(310, 310, 180, 120, 14);
  addBlob(420, 420, 90,  80,  14);
  addBlob(230, 240, 80,  60,  10);
  addBlob(150, 400, 50,  70,  8);   // mexico/central

  // SOUTH AMERICA
  addBlob(510, 640, 90, 160, 14);
  addBlob(490, 780, 50, 90,  10);

  // EUROPE
  addBlob(960, 370, 85, 60, 18);
  addBlob(1010, 420, 40, 30, 16);

  // AFRICA
  addBlob(1010, 580, 120, 150, 14);
  addBlob(990, 720, 90, 80, 12);

  // MIDDLE EAST
  addBlob(1110, 490, 70, 50, 14);

  // ASIA (big)
  addBlob(1300, 380, 180, 120, 14);
  addBlob(1450, 450, 140, 90, 12);
  addBlob(1220, 330, 90, 60, 12);
  addBlob(1550, 520, 80, 70, 10);   // south asia
  addBlob(1620, 430, 60, 60, 12);   // china east
  addBlob(1350, 290, 90, 40, 8);    // russia

  // SOUTHEAST ASIA / INDONESIA
  addBlob(1580, 600, 90, 40, 10);

  // AUSTRALIA
  addBlob(1700, 740, 100, 70, 14);

  return dots;
}

const WORLD_DOTS = generateWorldDots();

function WorldMap({ opacity = 1, highlightFrance = 0, highlightTunisia = 0 }) {
  const V = window.WORLD_VIEWBOX;

  return (
    <svg
      viewBox={`0 0 ${V.w} ${V.h}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={V.w} height={V.h} fill="url(#mapGlow)"/>

      {/* Dots */}
      <g>
        {WORLD_DOTS.map((d, i) => (
          <rect
            key={i}
            x={d.x - d.s/2}
            y={d.y - d.s/2}
            width={d.s}
            height={d.s}
            fill="rgba(244,241,234,0.22)"
            rx={0.8}
          />
        ))}
      </g>

      {/* France highlight — a cluster of red dots */}
      {highlightFrance > 0 && (
        <g opacity={highlightFrance}>
          {[
            [960, 370], [970, 375], [980, 380], [955, 385], [975, 390],
            [965, 400], [985, 395], [950, 395], [990, 385],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={4} height={4}
              fill="oklch(62% 0.22 25)" rx={0.8}/>
          ))}
        </g>
      )}

      {/* Tunisia highlight */}
      {highlightTunisia > 0 && (
        <g opacity={highlightTunisia}>
          {[[1010, 530], [1020, 525], [1015, 540], [1025, 535]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={4} height={4}
              fill="oklch(62% 0.22 25)" rx={0.8}/>
          ))}
        </g>
      )}
    </svg>
  );
}

Object.assign(window, { WorldMap, WORLD_DOTS });


// ===== francemap.jsx =====
// francemap.jsx — stylized France outline + cities with hover

// Hand-traced simplified France polygon (hexagone) in a 620x720 space
const FRANCE_PATH = `
M 320 75
L 360 90
L 395 110
L 420 140
L 445 170
L 460 205
L 470 250
L 495 280
L 515 310
L 520 350
L 510 395
L 495 425
L 490 460
L 500 495
L 510 525
L 505 555
L 490 580
L 470 595
L 445 605
L 405 605
L 360 590
L 325 585
L 295 595
L 260 595
L 225 575
L 195 545
L 170 510
L 158 470
L 155 430
L 170 395
L 190 370
L 200 340
L 195 305
L 178 275
L 165 240
L 172 205
L 195 175
L 222 148
L 250 125
L 280 100
L 305 85
Z
`;

// Corsica
const CORSICA_PATH = `
M 525 525
Q 540 520 545 535
Q 548 555 540 575
Q 528 580 520 565
Q 515 545 525 525 Z
`;

function FranceMap({ time, start, entryDur, holdDur, hoveredCity, setHoveredCity }) {
  const V = window.FRANCE_VIEWBOX;
  const CITIES = window.FRANCE_CITIES;

  const localT = time - start;
  const mapReveal = Math.max(0, Math.min(1, localT / entryDur));

  return (
    <svg
      viewBox={`0 0 ${V.w} ${V.h}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor="rgba(244,241,234,0.06)"/>
          <stop offset="100%" stopColor="rgba(244,241,234,0.02)"/>
        </linearGradient>
      </defs>

      {/* Outline — drawn via stroke-dasharray reveal */}
      <path
        d={FRANCE_PATH}
        fill="url(#mapFill)"
        stroke="rgba(244,241,234,0.38)"
        strokeWidth={1.5}
        strokeDasharray="3000"
        strokeDashoffset={3000 * (1 - mapReveal)}
        style={{ transition: 'none' }}
      />
      <path
        d={CORSICA_PATH}
        fill="url(#mapFill)"
        stroke="rgba(244,241,234,0.38)"
        strokeWidth={1.5}
        opacity={mapReveal}
      />

      {/* Grid */}
      <g opacity={mapReveal * 0.15}>
        {Array.from({length: 7}).map((_, i) => (
          <line key={'h'+i} x1={0} y1={i*100+50} x2={V.w} y2={i*100+50}
            stroke="rgba(244,241,234,0.3)" strokeWidth={0.5} strokeDasharray="2 4"/>
        ))}
        {Array.from({length: 6}).map((_, i) => (
          <line key={'v'+i} x1={i*120+60} y1={0} x2={i*120+60} y2={V.h}
            stroke="rgba(244,241,234,0.3)" strokeWidth={0.5} strokeDasharray="2 4"/>
        ))}
      </g>

      {/* Connection lines from Paris hub (Asnières area) */}
      <g opacity={Math.max(0, Math.min(1, (localT - entryDur) / 0.8))}>
        {CITIES.map((c, i) => {
          if (c.name === 'Asnières') return null;
          const delay = 0.08 * i;
          const lineT = Math.max(0, Math.min(1,
            (localT - entryDur - delay) / 0.6
          ));
          const hub = CITIES.find(x => x.name === 'Asnières').pos;
          const dx = c.pos.x - hub.x;
          const dy = c.pos.y - hub.y;
          const isHovered = hoveredCity === c.name;
          return (
            <line
              key={c.name + '-line'}
              x1={hub.x} y1={hub.y}
              x2={hub.x + dx * lineT}
              y2={hub.y + dy * lineT}
              stroke={isHovered ? 'oklch(62% 0.22 25)' : 'rgba(244,241,234,0.22)'}
              strokeWidth={isHovered ? 1.2 : 0.6}
              style={{ transition: 'stroke 160ms, stroke-width 160ms' }}
            />
          );
        })}
      </g>

      {/* City pins */}
      {CITIES.map((c, i) => {
        const delay = entryDur + 0.08 * i;
        const pinT = Math.max(0, Math.min(1, (localT - delay) / 0.35));
        if (pinT <= 0) return null;
        const isHovered = hoveredCity === c.name;

        const color = c.type === 'integration' ? 'oklch(62% 0.22 25)' :
                      c.type === 'bureau' ? 'oklch(82% 0 0)' :
                      'oklch(62% 0.22 25)';
        const size = isHovered ? 8 : (c.type === 'integration' ? 6 : 4);

        return (
          <g key={c.name}
             transform={`translate(${c.pos.x}, ${c.pos.y}) scale(${pinT})`}
             style={{ cursor: 'pointer' }}
             onMouseEnter={() => setHoveredCity(c.name)}
             onMouseLeave={() => setHoveredCity(null)}
          >
            {/* Hit target */}
            <circle r={16} fill="transparent" style={{ pointerEvents: 'all' }}/>

            {/* Pulse ring for integration sites */}
            {c.type === 'integration' && (
              <circle r={size + 4 + (Math.sin(time * 3 + i) + 1) * 2}
                fill="none" stroke={color} strokeOpacity={0.4}
                strokeWidth={1}/>
            )}
            <circle r={size} fill={color} filter={isHovered ? "url(#glow)" : undefined}
              style={{ transition: 'r 160ms' }}/>
            <circle r={size - 2} fill={isHovered ? '#fff' : 'rgba(14,14,16,0.4)'}
              style={{ transition: 'fill 160ms' }}/>

            {/* Label */}
            <g transform={`translate(${12}, ${4})`} style={{ pointerEvents: 'none' }}>
              <text
                x={0} y={0}
                fontFamily="JetBrains Mono, ui-monospace, monospace"
                fontSize={isHovered ? 13 : 11}
                fontWeight={isHovered ? 600 : 500}
                fill={isHovered ? '#F4F1EA' : 'rgba(244,241,234,0.72)'}
                letterSpacing="0.02em"
                style={{ transition: 'font-size 160ms, fill 160ms' }}
              >
                {c.name}
              </text>
              {isHovered && c.meta && (
                <text x={0} y={14}
                  fontFamily="Inter, system-ui, sans-serif"
                  fontSize={10}
                  fill="oklch(72% 0.18 25)"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                >
                  ▸ {c.meta}
                </text>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window, { FranceMap });


// ===== kpi.jsx =====
// kpi.jsx — KPI orbs with counting animation and hover

function useCountUp(target, progress) {
  // progress 0..1 → eased count from 0 to target
  const eased = window.Easing.easeOutCubic(Math.max(0, Math.min(1, progress)));
  const n = typeof target === 'string' ? parseFloat(target.replace(/[^\d.]/g, '')) : target;
  if (!isFinite(n)) return target;
  const v = n * eased;
  // Format: keep same decimals as target
  if (typeof target === 'string' && target.includes('+')) {
    return '+' + Math.round(v);
  }
  return Math.round(v).toString();
}

function KPIOrb({ data, time, start, onHover, hovered, anyHovered }) {
  const localT = time - start;
  const entryT = Math.max(0, Math.min(1, localT / 0.8));
  const countT = Math.max(0, Math.min(1, (localT - 0.15) / 1.1));

  if (entryT <= 0) return null;

  const scale = window.Easing.easeOutBack(entryT);
  const opacity = Math.min(1, entryT * 1.5);

  const displayValue = useCountUp(data.value, countT);
  const size = data.size;
  const isHovered = hovered;
  const dimmed = anyHovered && !isHovered;

  // Pulse
  const pulse = 1 + Math.sin(time * 1.6 + data.pos.x * 0.01) * 0.008;
  const hoverScale = isHovered ? 1.06 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: data.pos.x,
        top: data.pos.y,
        width: size,
        height: size,
        marginLeft: -size/2,
        marginTop: -size/2,
        transform: `scale(${scale * pulse * hoverScale})`,
        opacity: opacity * (dimmed ? 0.3 : 1),
        transition: 'transform 180ms cubic-bezier(.2,.9,.2,1), opacity 180ms',
        cursor: 'pointer',
        pointerEvents: entryT >= 1 ? 'auto' : 'none',
      }}
      onMouseEnter={() => onHover(data.key)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: -8,
        borderRadius: '50%',
        border: `1px solid oklch(62% 0.22 25 / ${isHovered ? 0.5 : 0.25})`,
        transition: 'border 180ms',
      }}/>
      {/* Ping */}
      {isHovered && (
        <div style={{
          position: 'absolute', inset: -20,
          borderRadius: '50%',
          border: '1px solid oklch(62% 0.22 25 / 0.35)',
          animation: 'ametra-ping 1.2s ease-out infinite',
        }}/>
      )}

      {/* Core disk */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, oklch(68% 0.23 28), oklch(48% 0.2 25))',
        boxShadow: isHovered
          ? '0 0 60px oklch(62% 0.22 25 / 0.6), inset 0 0 40px rgba(0,0,0,0.25)'
          : '0 10px 40px oklch(40% 0.22 25 / 0.4), inset 0 0 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        textAlign: 'center',
        transition: 'box-shadow 220ms',
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: size * 0.26,
          fontWeight: 700,
          color: '#F4F1EA',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          {displayValue}
        </div>
        <div style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: size * 0.08,
          fontWeight: 500,
          color: 'rgba(244,241,234,0.88)',
          marginTop: 6,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          maxWidth: size * 0.85,
          lineHeight: 1.15,
        }}>
          {data.unit}
        </div>
      </div>

      {/* Hover tooltip */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: size + 14,
          left: '50%',
          transform: 'translateX(-50%)',
          minWidth: 240,
          maxWidth: 280,
          padding: '10px 14px',
          background: 'rgba(14,14,16,0.95)',
          border: '1px solid rgba(244,241,234,0.15)',
          borderRadius: 8,
          color: 'rgba(244,241,234,0.85)',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 13,
          lineHeight: 1.45,
          textAlign: 'center',
          pointerEvents: 'none',
          animation: 'ametra-fade 200ms ease-out',
          zIndex: 20,
        }}>
          {data.note}
        </div>
      )}
    </div>
  );
}

// Country pin on the world view
function CountryPin({ data, time, start }) {
  const localT = time - start;
  const entryT = Math.max(0, Math.min(1, localT / 0.6));
  if (entryT <= 0) return null;

  const scale = window.Easing.easeOutBack(entryT);

  return (
    <div style={{
      position: 'absolute',
      left: data.pos.x, top: data.pos.y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: entryT,
    }}>
      {/* Pulse */}
      <div style={{
        position: 'absolute', inset: -20,
        width: 70, height: 70,
        marginLeft: -35, marginTop: -35,
        borderRadius: '50%',
        border: '1px solid oklch(62% 0.22 25 / 0.35)',
        animation: 'ametra-ping 2s ease-out infinite',
      }}/>
      {/* Dot */}
      <div style={{
        width: 14, height: 14,
        borderRadius: '50%',
        background: 'oklch(62% 0.22 25)',
        boxShadow: '0 0 20px oklch(62% 0.22 25 / 0.8)',
      }}/>
      {/* Label */}
      <div style={{
        position: 'absolute',
        top: -44, left: '50%',
        transform: 'translateX(-50%)',
        padding: '4px 10px',
        background: 'oklch(62% 0.22 25)',
        color: '#F4F1EA',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        borderRadius: 2,
      }}>
        {data.label}
        <div style={{
          position: 'absolute',
          bottom: -5, left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: 8, height: 8,
          background: 'oklch(62% 0.22 25)',
        }}/>
      </div>
      {/* People count below */}
      <div style={{
        position: 'absolute',
        top: 22, left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          color: '#F4F1EA',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          {data.people}
        </div>
        <div style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 10,
          color: 'rgba(244,241,234,0.6)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: 3,
        }}>
          personnes
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KPIOrb, CountryPin, useCountUp });


// ===== scenes.jsx =====
// scenes.jsx — the three main scenes

// ── SCENE 1: INTRO (0 → 2s) ──────────────────────────────────────────────
function SceneIntro({ time, start, end }) {
  const localT = time - start;
  const dur = end - start;
  if (time < start || time > end + 0.5) return null;

  // Title slides up and fades
  const inT = window.Easing.easeOutCubic(Math.min(1, localT / 0.9));
  const exitT = Math.max(0, Math.min(1, (localT - (dur - 0.6)) / 0.6));
  const fade = 1 - exitT;
  const ty = (1 - inT) * 40 - exitT * 20;

  // Kicker
  const kickT = Math.min(1, Math.max(0, (localT - 0.1) / 0.5));

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '0 120px',
      pointerEvents: 'none',
      opacity: fade,
    }}>
      {/* Kicker */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: kickT,
        transform: `translateX(${(1-kickT) * -20}px)`,
        marginBottom: 36,
      }}>
        <div style={{
          width: 56, height: 1,
          background: 'oklch(62% 0.22 25)',
        }}/>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          color: 'oklch(72% 0.18 25)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          AMETRA / 2026
        </div>
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 132,
        fontWeight: 700,
        color: '#F4F1EA',
        letterSpacing: '-0.04em',
        lineHeight: 0.92,
        transform: `translateY(${ty}px)`,
        opacity: inT,
      }}>
        Une organisation<br/>
        <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(244,241,234,0.55)' }}>globale</span>
        <span style={{ color: 'oklch(62% 0.22 25)' }}>.</span>
        {' '}
        <span>Au plus près</span><br/>
        <span>de vos <span style={{ color: 'oklch(62% 0.22 25)', fontStyle: 'italic', fontWeight: 400 }}>enjeux</span>.</span>
      </div>

      {/* Bottom tick marker */}
      <div style={{
        position: 'absolute',
        bottom: 60, left: 120,
        display: 'flex', gap: 24,
        opacity: kickT,
      }}>
        {['FR', 'TN', 'EU', 'WORLD'].map((t, i) => (
          <div key={t} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'rgba(244,241,234,0.4)',
            letterSpacing: '0.3em',
          }}>
            {String(i+1).padStart(2,'0')} · {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCENE 2: WORLD VIEW (2 → 7s) ─────────────────────────────────────────
function SceneWorld({ time, start, end, hoveredKPI, setHoveredKPI }) {
  const localT = time - start;
  if (time < start || time > end + 0.5) return null;

  // Camera scale — ramps up toward end for zoom transition
  const dur = end - start;
  const fadeIn = Math.min(1, localT / 0.5);
  const zoomStart = dur - 1.2;
  const zoomT = Math.max(0, Math.min(1, (localT - zoomStart) / 1.2));
  const scale = 1 + window.Easing.easeInQuad(zoomT) * 2.2;
  // Focus on europe/france: at 1920x1080 the europe sits around (990, 400)
  const focusX = 990, focusY = 400;
  const tx = (960 - focusX) * zoomT;
  const ty = (540 - focusY) * zoomT;
  const fadeOut = 1 - zoomT;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: fadeIn * fadeOut,
      transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
      transformOrigin: `${focusX}px ${focusY}px`,
      willChange: 'transform, opacity',
    }}>
      {/* Base map */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.WorldMap
          highlightFrance={localT > 1 ? 1 : 0}
          highlightTunisia={localT > 1.3 ? 1 : 0}
        />
      </div>

      {/* Country pins */}
      {window.COUNTRY_PINS.map((p, i) => (
        <window.CountryPin
          key={p.key}
          data={p}
          time={time}
          start={start + 1 + i * 0.25}
        />
      ))}

      {/* KPI orbs */}
      {window.KPIS.map((k, i) => (
        <window.KPIOrb
          key={k.key}
          data={k}
          time={time}
          start={start + 0.8 + i * 0.22}
          hovered={hoveredKPI === k.key}
          anyHovered={!!hoveredKPI}
          onHover={setHoveredKPI}
        />
      ))}

      {/* Scene label */}
      <div style={{
        position: 'absolute',
        top: 60, right: 120,
        opacity: fadeIn,
        textAlign: 'right',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: 'rgba(244,241,234,0.4)',
          letterSpacing: '0.3em',
          marginBottom: 8,
        }}>
          01 / VUE GLOBALE
        </div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 28,
          fontWeight: 600,
          color: '#F4F1EA',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Le groupe<br/>en chiffres
        </div>
      </div>
    </div>
  );
}

// ── SCENE 3: FRANCE ZOOM (7 → 13s) ───────────────────────────────────────
function SceneFrance({ time, start, end, hoveredCity, setHoveredCity }) {
  const localT = time - start;
  if (time < start - 0.2 || time > end + 0.5) return null;

  const dur = end - start;
  const fadeIn = Math.min(1, localT / 0.7);
  const exitStart = dur - 0.6;
  const exitT = Math.max(0, Math.min(1, (localT - exitStart) / 0.6));
  const fadeOut = 1 - exitT;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      opacity: fadeIn * fadeOut,
      willChange: 'opacity',
    }}>
      {/* Left: France map */}
      <div style={{
        flex: '0 0 55%',
        position: 'relative',
        padding: '40px 20px 40px 80px',
      }}>
        <div style={{
          position: 'absolute', top: 60, left: 80,
          display: 'flex', alignItems: 'center', gap: 14,
          opacity: fadeIn,
        }}>
          <div style={{
            width: 40, height: 1,
            background: 'oklch(62% 0.22 25)',
          }}/>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'oklch(72% 0.18 25)',
            letterSpacing: '0.3em',
          }}>
            02 / FOCUS FRANCE
          </div>
        </div>

        <div style={{ position: 'absolute', inset: '90px 0 40px 60px' }}>
          <window.FranceMap
            time={time}
            start={start + 0.3}
            entryDur={1.2}
            holdDur={dur - 2}
            hoveredCity={hoveredCity}
            setHoveredCity={setHoveredCity}
          />
        </div>
      </div>

      {/* Right: Details panel */}
      <div style={{
        flex: 1,
        padding: '120px 120px 80px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 40,
      }}>
        <SceneFranceDetails time={time} start={start + 0.8} hoveredCity={hoveredCity}/>
      </div>
    </div>
  );
}

function SceneFranceDetails({ time, start, hoveredCity }) {
  const localT = time - start;
  if (localT < 0) return null;

  const t1 = Math.min(1, localT / 0.5);
  const t2 = Math.max(0, Math.min(1, (localT - 0.5) / 0.5));
  const t3 = Math.max(0, Math.min(1, (localT - 1.2) / 0.5));

  const cityInfo = window.FRANCE_CITIES.find(c => c.name === hoveredCity);

  return (
    <>
      <div style={{
        opacity: t1,
        transform: `translateY(${(1-t1) * 20}px)`,
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 72,
          fontWeight: 700,
          color: '#F4F1EA',
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
        }}>
          12 implantations<br/>
          <span style={{ color: 'oklch(62% 0.22 25)', fontStyle: 'italic', fontWeight: 400 }}>en France.</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        opacity: t2,
        transform: `translateY(${(1-t2) * 20}px)`,
      }}>
        {[
          { color: 'oklch(62% 0.22 25)', size: 12, label: "Site d'intégration", note: '50 p. — 190 p.' },
          { color: 'oklch(82% 0 0)',     size: 8,  label: "Bureau d'études",    note: '9 sites' },
          { color: 'oklch(62% 0.22 25)', size: 6,  label: 'Implantation',       note: 'Présence client' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '8px 0',
            borderBottom: '1px solid rgba(244,241,234,0.08)',
          }}>
            <div style={{
              width: item.size, height: item.size,
              borderRadius: '50%',
              background: item.color,
              flexShrink: 0,
            }}/>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              color: '#F4F1EA',
              fontWeight: 500,
              flex: 1,
            }}>
              {item.label}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: 'rgba(244,241,234,0.45)',
              letterSpacing: '0.1em',
            }}>
              {item.note}
            </div>
          </div>
        ))}
      </div>

      {/* City hover info OR default stat */}
      <div style={{
        minHeight: 130,
        padding: '20px 24px',
        background: cityInfo ? 'oklch(22% 0.08 25 / 0.6)' : 'rgba(244,241,234,0.04)',
        border: `1px solid ${cityInfo ? 'oklch(62% 0.22 25 / 0.5)' : 'rgba(244,241,234,0.1)'}`,
        borderRadius: 8,
        opacity: t3,
        transform: `translateY(${(1-t3) * 20}px)`,
        transition: 'background 220ms, border 220ms',
      }}>
        {cityInfo ? (
          <>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: 'oklch(72% 0.18 25)',
              letterSpacing: '0.3em',
              marginBottom: 8,
            }}>
              ▸ SÉLECTION
            </div>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 32,
              fontWeight: 600,
              color: '#F4F1EA',
              letterSpacing: '-0.02em',
              marginBottom: 6,
            }}>
              {cityInfo.name}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: 'rgba(244,241,234,0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}>
              {cityInfo.type === 'integration' ? "Site d'intégration" :
               cityInfo.type === 'bureau' ? "Bureau d'études" : "Implantation"}
              {cityInfo.meta ? ` · ${cityInfo.meta}` : ''}
            </div>
          </>
        ) : (
          <>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: 'rgba(244,241,234,0.4)',
              letterSpacing: '0.3em',
              marginBottom: 10,
            }}>
              SURVOLEZ UNE VILLE
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              color: 'rgba(244,241,234,0.72)',
              lineHeight: 1.5,
            }}>
              Une organisation maillée pour rester proche des industriels, sur l'ensemble du territoire — du Cotentin à la Méditerranée.
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ── SCENE 4: SITES D'INTÉGRATION (13 → 18s) ──────────────────────────────
function SceneSites({ time, start, end }) {
  const localT = time - start;
  if (time < start - 0.2) return null;

  const dur = end - start;
  const fadeIn = Math.min(1, localT / 0.6);
  const exitT = Math.max(0, Math.min(1, (localT - (dur - 0.5)) / 0.5));
  const fadeOut = 1 - exitT;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      padding: '80px 120px',
      opacity: fadeIn * fadeOut,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 60 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: 'oklch(72% 0.18 25)',
          letterSpacing: '0.3em',
        }}>
          03 / CŒUR INDUSTRIEL
        </div>
        <div style={{
          flex: 1, height: 1, background: 'rgba(244,241,234,0.15)',
        }}/>
      </div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 96,
        fontWeight: 700,
        color: '#F4F1EA',
        letterSpacing: '-0.04em',
        lineHeight: 0.95,
        marginBottom: 60,
      }}>
        <span style={{ color: 'oklch(62% 0.22 25)' }}>3</span> sites<br/>
        <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(244,241,234,0.6)' }}>d'intégration</span>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        flex: 1,
      }}>
        {window.INTEGRATION_SITES.map((s, i) => {
          const cardT = Math.max(0, Math.min(1, (localT - 0.5 - i * 0.2) / 0.6));
          const ease = window.Easing.easeOutCubic(cardT);
          return (
            <SiteCard key={i} site={s} enter={ease} index={i} />
          );
        })}
      </div>

      {/* Bottom */}
      <div style={{
        marginTop: 40,
        display: 'flex', alignItems: 'center',
        gap: 14,
        opacity: Math.min(1, Math.max(0, (localT - 1.4) / 0.5)),
      }}>
        <div style={{
          width: 40, height: 1, background: 'oklch(62% 0.22 25)',
        }}/>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: 'rgba(244,241,234,0.55)',
          letterSpacing: '0.04em',
          fontStyle: 'italic',
        }}>
          Coordination et support — un dispositif intégré, de la conception à la série.
        </div>
      </div>
    </div>
  );
}

function SiteCard({ site, enter, index }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        padding: '28px 28px 32px',
        background: hover ? 'oklch(22% 0.08 25 / 0.5)' : 'rgba(244,241,234,0.04)',
        border: `1px solid ${hover ? 'oklch(62% 0.22 25)' : 'rgba(244,241,234,0.12)'}`,
        borderRadius: 10,
        opacity: enter,
        transform: `translateY(${(1-enter) * 24}px)`,
        transition: 'background 220ms, border 220ms',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Image placeholder */}
      <div style={{
        position: 'relative',
        height: 140,
        marginBottom: 24,
        borderRadius: 6,
        background: 'repeating-linear-gradient(135deg, rgba(244,241,234,0.05) 0 8px, rgba(244,241,234,0.02) 8px 16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(244,241,234,0.35)',
          letterSpacing: '0.2em',
        }}>
          PHOTO SITE — {site.city.toUpperCase()}
        </div>
        {/* Country tag */}
        <div style={{
          position: 'absolute',
          top: 12, left: 12,
          padding: '4px 10px',
          background: 'oklch(62% 0.22 25)',
          color: '#F4F1EA',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.2em',
          borderRadius: 2,
        }}>
          {site.country}
        </div>
      </div>

      {/* Index */}
      <div style={{
        position: 'absolute',
        top: 20, right: 24,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        color: 'rgba(244,241,234,0.35)',
        letterSpacing: '0.2em',
      }}>
        {String(index + 1).padStart(2, '0')} / 03
      </div>

      {/* Headcount */}
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 44,
        fontWeight: 700,
        color: '#F4F1EA',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {site.headcount}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 18,
        fontWeight: 600,
        color: '#F4F1EA',
        marginBottom: 10,
      }}>
        {site.city}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        color: 'rgba(244,241,234,0.65)',
        lineHeight: 1.5,
      }}>
        {site.label}
      </div>
    </div>
  );
}

Object.assign(window, { SceneIntro, SceneWorld, SceneFrance, SceneSites });

