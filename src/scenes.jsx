// scenes.jsx — scenes retuned for LIGHT theme (white background)

const RED = 'oklch(58% 0.22 25)';
const INK = '#0E0E10';
const INK_MUTED = 'rgba(20,20,24,0.55)';
const INK_FAINT = 'rgba(20,20,24,0.35)';

// ── SCENE 1: INTRO ──
function SceneIntro({ time, start, end }) {
  const localT = time - start;
  const dur = end - start;
  if (time < start || time > end + 0.5) return null;
  const inT = window.Easing.easeOutCubic(Math.min(1, localT / 0.9));
  const exitT = Math.max(0, Math.min(1, (localT - (dur - 0.6)) / 0.6));
  const fade = 1 - exitT;
  const ty = (1 - inT) * 40 - exitT * 20;
  const kickT = Math.min(1, Math.max(0, (localT - 0.1) / 0.5));

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: 'center',
      padding: '0 120px',
      pointerEvents: 'none',
      opacity: fade,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: kickT,
        transform: `translateX(${(1-kickT) * -20}px)`,
        marginBottom: 36,
      }}>
        <div style={{ width: 56, height: 1, background: RED }}/>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14, color: RED,
          letterSpacing: '0.3em',
        }}>AMETRA / 2026</div>
      </div>

      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 132, fontWeight: 700,
        color: INK, letterSpacing: '-0.04em', lineHeight: 0.92,
        transform: `translateY(${ty}px)`,
        opacity: inT,
      }}>
        Une <span style={{ color: RED, fontStyle: 'italic', fontWeight: 400 }}>organisation</span><br/>
        globale. Au plus près<br/>
        de vos <span style={{ color: RED, fontStyle: 'italic', fontWeight: 400 }}>enjeux</span>.
      </div>

      <div style={{
        position: 'absolute', bottom: 60, left: 120,
        display: 'flex', gap: 24, opacity: kickT,
      }}>
        {['FR', 'TN', 'EU', 'WORLD'].map((t, i) => (
          <div key={t} style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, color: INK_FAINT,
            letterSpacing: '0.3em',
          }}>{String(i+1).padStart(2,'0')} · {t}</div>
        ))}
      </div>
    </div>
  );
}

// ── SCENE 2: WORLD VIEW ──
function SceneWorld({ time, start, end, hoveredKPI, setHoveredKPI }) {
  const localT = time - start;
  if (time < start || time > end + 0.5) return null;
  const dur = end - start;
  const fadeIn = Math.min(1, localT / 0.5);
  const zoomStart = dur - 1.2;
  const zoomT = Math.max(0, Math.min(1, (localT - zoomStart) / 1.2));
  const fadeOut = 1 - zoomT;
  // Subtle scale-in on the map (no hard zoom — kept to preserve composition)
  const mapScale = 1 + zoomT * 0.15;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: fadeIn * fadeOut,
      willChange: 'opacity',
    }}>
      {/* Real world map as background */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '60px 60px',
        opacity: 0.9,
        transform: `scale(${mapScale})`,
        transformOrigin: '50% 50%',
        transition: 'transform 400ms ease-out',
      }}>
        <window.RealWorldMap
          viewBox={window.WORLD_VB}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {window.COUNTRY_PINS.map((p, i) => (
        <window.CountryPin key={p.key} data={p} time={time}
          start={start + 1 + i * 0.25}/>
      ))}

      {window.KPIS.map((k, i) => (
        <window.KPIOrb key={k.key} data={k} time={time}
          start={start + 0.8 + i * 0.22}
          hovered={hoveredKPI === k.key}
          anyHovered={!!hoveredKPI}
          onHover={setHoveredKPI}/>
      ))}

      <div style={{
        position: 'absolute', top: 140, right: 120,
        opacity: fadeIn, textAlign: 'right', zIndex: 5,
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11, color: INK_FAINT,
          letterSpacing: '0.3em', marginBottom: 8,
        }}>01 / VUE GLOBALE</div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 28, fontWeight: 600,
          color: INK, letterSpacing: '-0.02em', lineHeight: 1,
        }}>Le groupe<br/>en chiffres</div>
      </div>
    </div>
  );
}

// ── SCENE 3: FRANCE ──
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
      position: 'absolute', inset: 0, display: 'flex',
      opacity: fadeIn * fadeOut, willChange: 'opacity',
    }}>
      <div style={{
        flex: '0 0 55%', position: 'relative',
        padding: '40px 20px 40px 80px',
      }}>
        <div style={{
          position: 'absolute', top: 60, left: 80,
          display: 'flex', alignItems: 'center', gap: 14,
          opacity: fadeIn,
        }}>
          <div style={{ width: 40, height: 1, background: RED }}/>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, color: RED,
            letterSpacing: '0.3em',
          }}>02 / FOCUS FRANCE</div>
        </div>

        <div style={{ position: 'absolute', inset: '90px 0 40px 60px' }}>
          <window.FranceDetailMap time={time} start={start + 0.3} entryDur={1.2}
            hoveredCity={hoveredCity} setHoveredCity={setHoveredCity}/>
        </div>
      </div>

      <div style={{
        flex: 1, padding: '120px 120px 80px 40px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 40,
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
        opacity: t1, transform: `translateY(${(1-t1) * 20}px)`,
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 72, fontWeight: 700,
          color: INK, letterSpacing: '-0.03em', lineHeight: 0.95,
        }}>
          12 implantations<br/>
          <span style={{ color: RED, fontStyle: 'italic', fontWeight: 400 }}>en France.</span>
        </div>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 14,
        opacity: t2, transform: `translateY(${(1-t2) * 20}px)`,
      }}>
        {[
          { color: RED, size: 12, label: "Site d'intégration", note: '50 p. — 190 p.' },
          { color: '#0E0E10', size: 8, label: "Bureau d'études", note: '9 sites' },
          { color: RED, size: 6, label: 'Implantation', note: 'Présence client' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '8px 0',
            borderBottom: '1px solid rgba(20,20,24,0.08)',
          }}>
            <div style={{
              width: item.size, height: item.size, borderRadius: '50%',
              background: item.color, flexShrink: 0,
            }}/>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15,
              color: INK, fontWeight: 500, flex: 1,
            }}>{item.label}</div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, color: INK_MUTED,
              letterSpacing: '0.1em',
            }}>{item.note}</div>
          </div>
        ))}
      </div>

      <div style={{
        minHeight: 130, padding: '20px 24px',
        background: cityInfo ? 'oklch(95% 0.02 25)' : 'rgba(20,20,24,0.03)',
        border: `1px solid ${cityInfo ? RED : 'rgba(20,20,24,0.1)'}`,
        borderRadius: 8,
        opacity: t3, transform: `translateY(${(1-t3) * 20}px)`,
        transition: 'background 220ms, border 220ms',
      }}>
        {cityInfo ? (
          <>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10, color: RED,
              letterSpacing: '0.3em', marginBottom: 8,
            }}>▸ SÉLECTION</div>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 32, fontWeight: 600,
              color: INK, letterSpacing: '-0.02em', marginBottom: 6,
            }}>{cityInfo.name}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, color: INK_MUTED,
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
              fontSize: 10, color: INK_FAINT,
              letterSpacing: '0.3em', marginBottom: 10,
            }}>SURVOLEZ UNE VILLE</div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 15, color: INK_MUTED, lineHeight: 1.5,
            }}>Une organisation maillée pour rester proche des industriels, sur l'ensemble du territoire — du Cotentin à la Méditerranée.</div>
          </>
        )}
      </div>
    </>
  );
}

// ── SCENE 4: SITES ──
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
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 60 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11, color: RED,
          letterSpacing: '0.3em',
        }}>03 / CŒUR INDUSTRIEL</div>
        <div style={{ flex: 1, height: 1, background: 'rgba(20,20,24,0.12)' }}/>
      </div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 96, fontWeight: 700,
        color: INK, letterSpacing: '-0.04em', lineHeight: 0.95,
        marginBottom: 60,
      }}>
        <span style={{ color: RED }}>3</span> sites<br/>
        <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(20,20,24,0.45)' }}>d'intégration</span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, flex: 1,
      }}>
        {window.INTEGRATION_SITES.map((s, i) => {
          const cardT = Math.max(0, Math.min(1, (localT - 0.5 - i * 0.2) / 0.6));
          const ease = window.Easing.easeOutCubic(cardT);
          return <SiteCard key={i} site={s} enter={ease} index={i}/>;
        })}
      </div>

      <div style={{
        marginTop: 40,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Math.min(1, Math.max(0, (localT - 1.4) / 0.5)),
      }}>
        <div style={{ width: 40, height: 1, background: RED }}/>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          color: INK_MUTED, letterSpacing: '0.04em', fontStyle: 'italic',
        }}>Coordination et support — un dispositif intégré, de la conception à la série.</div>
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
        background: hover ? 'oklch(97% 0.02 25)' : '#FFFFFF',
        border: `1px solid ${hover ? RED : 'rgba(20,20,24,0.12)'}`,
        borderRadius: 10,
        opacity: enter,
        transform: `translateY(${(1-enter) * 24}px)`,
        transition: 'background 220ms, border 220ms, box-shadow 220ms',
        boxShadow: hover ? '0 18px 40px rgba(180,30,35,0.10)' : '0 2px 8px rgba(0,0,0,0.03)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative', height: 140, marginBottom: 24,
        borderRadius: 6,
        background: 'repeating-linear-gradient(135deg, rgba(20,20,24,0.05) 0 8px, rgba(20,20,24,0.02) 8px 16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, color: INK_FAINT,
          letterSpacing: '0.2em',
        }}>PHOTO SITE — {site.city.toUpperCase()}</div>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '4px 10px',
          background: RED, color: '#FFFFFF',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 11, fontWeight: 600,
          letterSpacing: '0.2em', borderRadius: 2,
        }}>{site.country}</div>
      </div>
      <div style={{
        position: 'absolute', top: 20, right: 24,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11, color: INK_FAINT,
        letterSpacing: '0.2em',
      }}>{String(index + 1).padStart(2, '0')} / 03</div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 44, fontWeight: 700,
        color: INK, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6,
      }}>{site.headcount}</div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600,
        color: INK, marginBottom: 10,
      }}>{site.city}</div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 14,
        color: INK_MUTED, lineHeight: 1.5,
      }}>{site.label}</div>
    </div>
  );
}

Object.assign(window, { SceneIntro, SceneWorld, SceneFrance, SceneSites });
