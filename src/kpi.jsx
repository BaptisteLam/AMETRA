// kpi.jsx — KPI orbs (light theme) + country pins

function useCountUp(target, progress) {
  const eased = window.Easing.easeOutCubic(Math.max(0, Math.min(1, progress)));
  const n = typeof target === 'string' ? parseFloat(target.replace(/[^\d.]/g, '')) : target;
  if (!isFinite(n)) return target;
  const v = n * eased;
  if (typeof target === 'string' && target.includes('+')) return '+' + Math.round(v);
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
  const pulse = 1 + Math.sin(time * 1.6 + data.pos.x * 0.01) * 0.008;
  const hoverScale = isHovered ? 1.06 : 1;

  return (
    <div
      style={{
        position: 'absolute', left: data.pos.x, top: data.pos.y,
        width: size, height: size,
        marginLeft: -size/2, marginTop: -size/2,
        transform: `scale(${scale * pulse * hoverScale})`,
        opacity: opacity * (dimmed ? 0.35 : 1),
        transition: 'transform 180ms cubic-bezier(.2,.9,.2,1), opacity 180ms',
        cursor: 'pointer',
        pointerEvents: entryT >= 1 ? 'auto' : 'none',
      }}
      onMouseEnter={() => onHover(data.key)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{
        position: 'absolute', inset: -8, borderRadius: '50%',
        border: `1px solid oklch(58% 0.22 25 / ${isHovered ? 0.55 : 0.22})`,
        transition: 'border 180ms',
      }}/>
      {isHovered && (
        <div style={{
          position: 'absolute', inset: -20, borderRadius: '50%',
          border: '1px solid oklch(58% 0.22 25 / 0.4)',
          animation: 'ametra-ping 1.2s ease-out infinite',
        }}/>
      )}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 32% 28%, oklch(66% 0.23 28), oklch(48% 0.22 25) 85%)',
        boxShadow: isHovered
          ? '0 0 50px oklch(58% 0.22 25 / 0.45), 0 20px 40px rgba(180,30,35,0.25), inset 0 0 40px rgba(0,0,0,0.18)'
          : '0 14px 36px rgba(180,30,35,0.22), inset 0 0 30px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 8, textAlign: 'center',
        transition: 'box-shadow 220ms',
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: size * 0.28, fontWeight: 700,
          color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1,
        }}>{displayValue}</div>
        <div style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: size * 0.085, fontWeight: 500,
          color: 'rgba(255,255,255,0.92)',
          marginTop: 6, letterSpacing: '0.04em',
          maxWidth: size * 0.88, lineHeight: 1.2,
        }}>{data.unit}</div>
      </div>
      {isHovered && (
        <div style={{
          position: 'absolute', top: size + 14, left: '50%',
          transform: 'translateX(-50%)',
          minWidth: 240, maxWidth: 280,
          padding: '10px 14px',
          background: 'rgba(14,14,16,0.95)',
          border: '1px solid rgba(20,20,24,0.15)',
          borderRadius: 8, color: '#FAFAF7',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 13, lineHeight: 1.45, textAlign: 'center',
          pointerEvents: 'none',
          animation: 'ametra-fade 200ms ease-out',
          zIndex: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}>{data.note}</div>
      )}
    </div>
  );
}

function CountryPin({ data, time, start }) {
  const localT = time - start;
  const entryT = Math.max(0, Math.min(1, localT / 0.6));
  if (entryT <= 0) return null;
  const scale = window.Easing.easeOutBack(entryT);

  const dir = data.labelDir || 'top-right';
  // label positioning offset
  const labelOffset =
    dir === 'top-left'     ? { top: -56,  left: -120, align: 'right' } :
    dir === 'top-right'    ? { top: -56,  left: 18,   align: 'left'  } :
    dir === 'bottom-right' ? { top: 20,   left: 18,   align: 'left'  } :
                             { top: 20,   left: -120, align: 'right' };

  return (
    <div style={{
      position: 'absolute', left: data.pos.x, top: data.pos.y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: entryT,
      zIndex: 10,
    }}>
      {/* Ping ring */}
      <div style={{
        position: 'absolute', inset: -20,
        width: 70, height: 70, marginLeft: -35, marginTop: -35,
        borderRadius: '50%',
        border: '2px solid oklch(58% 0.22 25 / 0.4)',
        animation: 'ametra-ping 2s ease-out infinite',
      }}/>
      {/* Dot */}
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        background: 'oklch(58% 0.22 25)',
        border: '3px solid #FFFFFF',
        boxShadow: '0 4px 14px rgba(180,30,35,0.45)',
      }}/>
      {/* Callout line + label */}
      <div style={{
        position: 'absolute',
        top: labelOffset.top, left: labelOffset.left,
        width: 120, textAlign: labelOffset.align,
      }}>
        <div style={{
          display: 'inline-flex', flexDirection: 'column',
          alignItems: labelOffset.align === 'right' ? 'flex-end' : 'flex-start',
        }}>
          <div style={{
            padding: '4px 10px',
            background: 'oklch(58% 0.22 25)',
            color: '#FFFFFF',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 13, fontWeight: 600,
            letterSpacing: '0.14em',
            whiteSpace: 'nowrap', borderRadius: 2,
            marginBottom: 4,
          }}>{data.label}</div>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(20,20,24,0.1)',
            padding: '6px 12px',
            display: 'flex', alignItems: 'baseline', gap: 6,
            borderRadius: 4,
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
            whiteSpace: 'nowrap',
          }}>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 26, fontWeight: 700,
              color: '#0E0E10', letterSpacing: '-0.02em', lineHeight: 1,
            }}>{data.people}</div>
            <div style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 11, color: 'rgba(20,20,24,0.55)',
              letterSpacing: '0.14em',
            }}>Personnes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KPIOrb, CountryPin, useCountUp });
