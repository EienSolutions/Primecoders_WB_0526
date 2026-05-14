'use client';

import { I18N, t } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';
import { DataFlow, Sparkline } from './effects';

export function Pillars() {
  const { lang } = useTheme();
  const S = I18N.pillars;
  const titleParts = t(S.title, lang) as readonly string[];
  return (
    <section id="pillars" className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-tag"><span className="num">01</span> {t(S.tag, lang)}</div>
            <h2 className="section-title">
              {titleParts[0]}<em>{titleParts[1]}</em>{titleParts[2]}
            </h2>
          </div>
          <p className="section-sub">{t(S.sub, lang)}</p>
        </div>

        <div className="bento">
          <PillarBig />
          <PillarArch />
          <PillarAWS />
        </div>
      </div>
    </section>
  );
}

function PillarBig() {
  const { lang } = useTheme();
  const S = I18N.pillars;
  const tt = t(S.p1Title, lang) as readonly string[];
  return (
    <div className="card b-7 b-row-2" style={{
      padding: 28, display: 'flex', flexDirection: 'column', minHeight: 360, position: 'relative',
    }}>
      <div className="corner tl" /><div className="corner br" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="tag primary"><span className="dot pm" /> P_01</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t(S.p1Tag, lang)}</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>core ▸</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--sans)', fontSize: 'clamp(28px,3.4vw,42px)',
        letterSpacing: '-.02em', fontWeight: 600, margin: '24px 0 12px', lineHeight: 1.05,
      }}>
        {tt[0]}<em style={{ color: 'var(--primary)', fontStyle: 'normal' }}>{tt[1]}</em>{tt[2]}
      </h3>
      <p style={{ color: 'var(--fg-2)', margin: 0, maxWidth: '42ch' }}>{t(S.p1Body, lang)}</p>

      <div style={{
        marginTop: 'auto', paddingTop: 28, display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: 16,
      }}>
        <MiniMetric label={t(S.m1, lang)} value="+28%" trend="up"   color="var(--primary)" seed={3} />
        <MiniMetric label={t(S.m2, lang)} value="2.3h" trend="down" color="var(--cyan)"    seed={5} />
      </div>
    </div>
  );
}

interface MiniMetricProps {
  label: string;
  value: string;
  trend: 'up' | 'down';
  color: string;
  seed:  number;
}

function MiniMetric({ label, value, trend, color, seed }: MiniMetricProps) {
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 12, padding: 14,
      background: 'rgba(255,255,255,.015)', display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{label}</span>
        <span className="mono" style={{ fontSize: 11, color: trend === 'up' ? 'var(--ok)' : 'var(--cyan)' }}>
          {trend === 'up' ? '▲' : '▼'}
        </span>
      </div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, color,
        textShadow: `0 0 16px ${color}`,
      }}>{value}</div>
      <Sparkline width={180} height={36} color={color} points={28} speed={1300} seed={seed} />
    </div>
  );
}

function PillarArch() {
  const { lang } = useTheme();
  const S = I18N.pillars;
  return (
    <div className="card b-5" style={{ padding: 28, minHeight: 360, display: 'flex', flexDirection: 'column' }}>
      <div className="corner tr" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <span className="tag"><span className="dot cy" /> P_02</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t(S.p2Tag, lang)}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--sans)', fontSize: 28, letterSpacing: '-.015em',
        fontWeight: 600, margin: '0 0 10px', lineHeight: 1.1,
      }}>
        {t(S.p2Title, lang)}
      </h3>
      <p style={{ color: 'var(--fg-2)', margin: 0, fontSize: 14 }}>{t(S.p2Body, lang)}</p>

      <pre className="mono" style={{
        marginTop: 22, fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.55, flex: 1,
        whiteSpace: 'pre',
      }}>
{`├─ web/        Next.js · React
├─ mobile/     React Native · Expo
├─ api/        NestJS · tRPC · Postgres
├─ realtime/   WebSockets · Redis
└─ edge/       Lambda@edge · CDN`}
      </pre>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Next.js', 'NestJS', 'React Native', 'TypeScript'].map((tag) => (
          <span key={tag} className="kbd">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function PillarAWS() {
  const { lang } = useTheme();
  const S = I18N.pillars;
  const tt = t(S.p3Title, lang) as readonly string[];
  return (
    <div className="card b-5" style={{
      padding: 28, minHeight: 320, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <DataFlow direction="x" />
      <div className="corner bl" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <span className="tag"><span className="dot pr" /> P_03</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t(S.p3Tag, lang)}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--sans)', fontSize: 28, letterSpacing: '-.015em',
        fontWeight: 600, margin: '0 0 10px', lineHeight: 1.1,
      }}>
        {tt[0]}<em style={{ color: 'var(--primary)', fontStyle: 'normal' }}>{tt[1]}</em>{tt[2]}
      </h3>
      <p style={{ color: 'var(--fg-2)', margin: 0, fontSize: 14, marginBottom: 18 }}>{t(S.p3Body, lang)}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 'auto' }}>
        <KVCell label="cost_saved"     value="-34%" />
        <KVCell label="security_audit" value="A+" />
        <KVCell label="cold_starts"    value="<120ms" />
        <KVCell label="iam_policies"   value="least-priv" />
      </div>
    </div>
  );
}

function KVCell({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 10, padding: '10px 12px',
      background: 'rgba(255,255,255,.015)',
    }}>
      <div className="mono" style={{
        fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '.06em',
      }}>{label}</div>
      <div className="mono" style={{ fontSize: 15, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
    </div>
  );
}
