'use client';

import { useEffect, useState } from 'react';
import { I18N, t, type Lang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';
import { CountUp } from './effects';

export function Vault() {
  const { lang } = useTheme();
  const S = I18N.vault;
  const tt = t(S.title, lang) as readonly string[];
  return (
    <section id="vault" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-tag"><span className="num">03</span> {t(S.tag, lang)}</div>
            <h2 className="section-title">
              {tt[0]}<em>{tt[1]}</em>{tt[2]}
            </h2>
          </div>
          <p className="section-sub">{t(S.sub, lang)}</p>
        </div>

        <div className="card" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'grid', placeItems: 'center', zIndex: 2,
          }}>
            <div style={{
              transform: 'rotate(-6deg)',
              fontFamily: 'var(--mono)', fontSize: 'clamp(48px, 9vw, 110px)',
              fontWeight: 600, letterSpacing: '-.03em',
              color: 'transparent',
              WebkitTextStroke: '1px color-mix(in oklab, var(--primary) 35%, transparent)',
              opacity: .8,
              textAlign: 'center', lineHeight: .95,
              filter: 'drop-shadow(0 0 calc(var(--glow) * .5) var(--primary-glow))',
            }}>
              {t(S.demoTitle, lang)}<br/>
              <span style={{
                fontSize: '.36em', color: 'var(--primary)',
                WebkitTextStroke: '0', opacity: 1, letterSpacing: '.2em',
              }}>
                {t(S.demoSub, lang)}
              </span>
            </div>
          </div>

          <div style={{
            padding: '14px 20px', borderBottom: '1px solid var(--line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'var(--mono)', fontSize: 11,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="dot er" /><span className="dot wn" /><span className="dot" />
              <span style={{ color: 'var(--fg-3)', marginLeft: 6 }}>{t(S.headerLabel, lang)}</span>
            </div>
            <div style={{ color: 'var(--fg-3)', display: 'flex', gap: 14 }}>
              <span>
                <span className="dot pulse" style={{ background: 'var(--warn)', boxShadow: '0 0 8px var(--warn)' }} />
                {' '}{t(S.demoMode, lang)}
              </span>
              <span>{t(S.last30, lang)}</span>
            </div>
          </div>

          <div className="kpi-row" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--line)',
          }}>
            <KPI label={t(S.kpi.cost, lang)} value={34}    suffix="%" color="var(--primary)" sub={t(S.kpi.costSub, lang)} />
            <KPI label={t(S.kpi.dep,  lang)} value={47}                color="var(--cyan)"    sub={t(S.kpi.depSub, lang)}  divider />
            <KPI label={t(S.kpi.ml,   lang)} value={2.1}  suffix="M" decimals={1} color="var(--purple)" sub={t(S.kpi.mlSub, lang)} divider />
            <KPI label={t(S.kpi.up,   lang)} value={99.98} suffix="%" decimals={2} color="var(--ok)"     sub={t(S.kpi.upSub, lang)} divider />
          </div>

          <div className="chart-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 0 }}>
            <div style={{ padding: 24, borderRight: '1px solid var(--line)' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginBottom: 14,
                fontFamily: 'var(--mono)', fontSize: 11,
              }}>
                <span style={{ color: 'var(--fg-3)' }}>{t(S.revenueLabel, lang)}</span>
                <span style={{ display: 'flex', gap: 12 }}>
                  <Legend color="var(--primary)" label={t(S.before, lang)} />
                  <Legend color="var(--cyan)"    label={t(S.after, lang)} />
                </span>
              </div>
              <BigChart />
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="mono" style={{
                fontSize: 11, color: 'var(--fg-3)', letterSpacing: '.06em', textTransform: 'uppercase',
              }}>{t(S.topEvents, lang)}</div>
              <EventStream lang={lang} />
            </div>
          </div>
        </div>

        <p className="mono" style={{ marginTop: 18, fontSize: 11, color: 'var(--fg-4)', textAlign: 'center' }}>
          {t(S.disclaimer, lang)}
        </p>
      </div>

      <style>{`
        @media(max-width:880px){
          .kpi-row{grid-template-columns:repeat(2,1fr) !important;}
          .kpi-row > div:nth-child(2){border-left:1px solid var(--line) !important;}
          .kpi-row > div:nth-child(3){border-left:0 !important; border-top:1px solid var(--line) !important;}
          .kpi-row > div:nth-child(4){border-top:1px solid var(--line) !important;}
          .chart-row{grid-template-columns:1fr !important;}
          .chart-row > div:first-child{border-right:0 !important; border-bottom:1px solid var(--line) !important;}
        }
      `}</style>
    </section>
  );
}

interface KPIProps {
  label:     string;
  value:     number;
  suffix?:   string;
  decimals?: number;
  color:     string;
  sub:       string;
  divider?:  boolean;
}

function KPI({ label, value, suffix, decimals, color, sub, divider }: KPIProps) {
  return (
    <div style={{
      padding: 22, borderLeft: divider ? '1px solid var(--line)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div className="mono" style={{
        fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '.08em',
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 'clamp(28px, 3.4vw, 40px)', color,
        fontWeight: 500, textShadow: `0 0 16px ${color}`, lineHeight: 1,
      }}>
        <CountUp to={value} suffix={suffix || ''} decimals={decimals || 0} />
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>{sub}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)' }}>
      <span style={{ width: 10, height: 2, background: color, display: 'inline-block', borderRadius: 1 }} /> {label}
    </span>
  );
}

function BigChart() {
  return (
    <div style={{ height: 220, position: 'relative' }}>
      <svg viewBox="0 0 600 220" width="100%" height="220" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" x2="600" y1={i * 55} y2={i * 55} stroke="var(--line)" strokeDasharray="2 4" />
        ))}
        {[
          { y: 0, l: '$ 3M' }, { y: 55, l: '$ 2M' }, { y: 110, l: '$ 1M' }, { y: 165, l: '$ 500k' },
        ].map((tt) => (
          <text key={tt.l} x="600" y={tt.y + 4} textAnchor="end" fontSize="10" fill="var(--fg-4)" fontFamily="var(--mono)">{tt.l}</text>
        ))}

        <defs>
          <linearGradient id="primareaA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity=".25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d="M0 175 C 60 168, 120 172, 180 165 S 300 158, 360 162 S 480 168, 600 158" fill="none" stroke="var(--fg-3)" strokeWidth="1.5" strokeDasharray="3 4" />
        <path d="M0 178 C 60 168, 120 145, 180 130 S 300 95, 360 78 S 480 55, 600 30" fill="none" stroke="var(--primary)" strokeWidth="2" />
        <path d="M0 178 C 60 168, 120 145, 180 130 S 300 95, 360 78 S 480 55, 600 30 L 600 220 L 0 220 Z" fill="url(#primareaA)" />

        <circle cx="600" cy="30" r="4" fill="var(--primary)" />
        <circle cx="600" cy="30" r="9" fill="var(--primary)" opacity=".25">
          <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".4;0;.4" dur="2s" repeatCount="indefinite" />
        </circle>

        {['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((l, i) => (
          <text key={l} x={i * 120 + 8} y="215" fontSize="10" fill="var(--fg-4)" fontFamily="var(--mono)">{l}</text>
        ))}
      </svg>
    </div>
  );
}

function EventStream({ lang }: { lang: Lang }) {
  const events = [
    { t: 'lambda.warmstart',    d: '128ms',          c: 'var(--ok)' },
    { t: 'pipeline.batch_ok',   d: '2,140 rows',     c: 'var(--primary)' },
    { t: 'cost.alert.review',   d: 'savings +$1.2k', c: 'var(--cyan)' },
    { t: 'ml.inference',        d: '12.4k req/s',    c: 'var(--purple)' },
    { t: 'auth.audit_pass',     d: 'iam OK',         c: 'var(--ok)' },
    { t: 'deploy.production',   d: 'v1.0.42',        c: 'var(--fg-2)' },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 1800);
    return () => clearInterval(id);
  }, []);
  const nowLabel = lang === 'en' ? 'now' : 'now';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      fontFamily: 'var(--mono)', fontSize: 11.5, flex: 1,
    }}>
      {events.map((e, i) => {
        const flashing = i === tick % events.length;
        return (
          <div key={e.t} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
            border: '1px solid var(--line)', borderRadius: 8,
            background: flashing ? 'rgba(204,255,0,.04)' : 'rgba(255,255,255,.015)',
            transition: 'background .4s',
          }}>
            <span className="dot" style={{ background: e.c, boxShadow: `0 0 8px ${e.c}` }} />
            <span style={{ color: 'var(--fg)', flex: 1 }}>{e.t}</span>
            <span style={{ color: 'var(--fg-3)' }}>{e.d}</span>
            <span style={{ color: 'var(--fg-4)', fontSize: 10 }}>{nowLabel}</span>
          </div>
        );
      })}
    </div>
  );
}
