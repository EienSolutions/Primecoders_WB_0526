'use client';

import { I18N, t, type Lang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';
import { Bars } from './effects';

type Stage  = 'hot' | 'qualifying' | 'tour' | 'cold';
type Status = 'in' | 'low' | 'out';

export function Lab() {
  const { lang } = useTheme();
  const S = I18N.lab;
  const tt = t(S.title, lang) as readonly string[];
  return (
    <section id="lab" className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-tag"><span className="num">02</span> {t(S.tag, lang)}</div>
            <h2 className="section-title">
              {tt[0]}<em>{tt[1]}</em>{tt[2]}
            </h2>
          </div>
          <p className="section-sub">{t(S.sub, lang)}</p>
        </div>

        <div className="bento">
          <LabRealEstate lang={lang} />
          <LabAuto lang={lang} />
          <LabBI lang={lang} />
          <LabAI lang={lang} />
        </div>
      </div>
    </section>
  );
}

// ── 1. Real Estate ───────────────────────────────────────────
function LabRealEstate({ lang }: { lang: Lang }) {
  const S = I18N.lab.re;
  const rows: { name: string; stage: Stage; score: number; time: string }[] = [
    { name: 'Marta R.', stage: 'hot',        score: 87, time: '2m' },
    { name: 'Diego N.', stage: 'qualifying', score: 62, time: '14m' },
    { name: lang === 'en' ? 'López Family' : 'Familia López', stage: 'tour', score: 91, time: '1h' },
    { name: 'Andrea V.', stage: 'cold',      score: 31, time: '3h' },
  ];
  return (
    <div className="card b-7" style={{ padding: 0, overflow: 'hidden', minHeight: 420 }}>
      <LabHead num="01" tag="real_estate" title={t(S.title, lang)} sub={t(S.sub, lang)} />

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid var(--line)',
      }}>
        <div style={{ padding: 22, borderRight: '1px solid var(--line)', minHeight: 240 }}>
          <div className="mono" style={{
            fontSize: 10, color: 'var(--fg-4)', marginBottom: 14,
            letterSpacing: '.08em', textTransform: 'uppercase',
          }}>
            ▸ assistant.session_4811
          </div>
          <ChatBubble who="bot"  text={t(S.bot1, lang)} />
          <ChatBubble who="user" text={t(S.user1, lang)} />
          <ChatBubble who="bot"  text={t(S.bot2, lang)} small />
          <PropMini lang={lang} />
          <div className="mono" style={{
            fontSize: 11, color: 'var(--fg-3)', marginTop: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span className="dot pulse" />{t(S.sentiment, lang)}
          </div>
        </div>

        <div style={{ padding: 22 }}>
          <div className="mono" style={{
            fontSize: 10, color: 'var(--fg-4)', marginBottom: 14,
            letterSpacing: '.08em', textTransform: 'uppercase',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>▸ {t(S.pipelineLabel, lang)}</span><span style={{ color: 'var(--primary)' }}>● live</span>
          </div>
          {rows.map((r) => <CrmRow key={r.name} {...r} lang={lang} />)}
          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--line)',
            display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11,
          }}>
            <span style={{ color: 'var(--fg-3)' }}>{t(S.leads24h, lang)}</span>
            <span style={{ color: 'var(--primary)' }}>+42 ▲</span>
          </div>
        </div>
      </div>

      <LabFoot stack={['NestJS', 'OpenAI', 'Pinecone', 'Postgres']} outcome={t(S.outcome, lang)} lang={lang} />
    </div>
  );
}

function ChatBubble({ who, text, small }: { who: 'bot' | 'user'; text: string; small?: boolean }) {
  const isBot = who === 'bot';
  return (
    <div style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', marginBottom: 8 }}>
      <div style={{
        maxWidth: '88%',
        padding: small ? '8px 11px' : '9px 13px',
        borderRadius: 12,
        fontSize: 12.5, lineHeight: 1.5,
        background: isBot ? 'rgba(255,255,255,.04)' : 'var(--primary-dim)',
        color: isBot ? 'var(--fg)' : 'var(--primary)',
        border: '1px solid ' + (isBot ? 'var(--line)' : 'color-mix(in oklab, var(--primary) 30%, transparent)'),
      }}>{text}</div>
    </div>
  );
}

function PropMini({ lang }: { lang: Lang }) {
  const S = I18N.lab.re;
  return (
    <div style={{
      marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid var(--line)',
      background: 'rgba(255,255,255,.02)', display: 'flex', gap: 10, alignItems: 'center',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 8,
        background: 'repeating-linear-gradient(135deg, var(--bg-elev-2), var(--bg-elev-2) 6px, var(--bg-elev) 6px, var(--bg-elev) 12px)',
        border: '1px solid var(--line)', flexShrink: 0,
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--fg-4)',
      }}>img</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--fg)' }}>Condesa · {t(S.propUnits, lang)}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t(S.propPrice, lang)}</div>
      </div>
      <span className="tag primary" style={{ padding: '3px 8px', fontSize: 10 }}>{t(S.match, lang)}</span>
    </div>
  );
}

interface CrmRowProps {
  name:  string;
  stage: Stage;
  score: number;
  time:  string;
  lang:  Lang;
}

function CrmRow({ name, stage, score, time, lang }: CrmRowProps) {
  const stageColorMap: Record<Stage, string> = {
    hot: 'var(--err)', qualifying: 'var(--warn)', tour: 'var(--primary)', cold: 'var(--fg-4)',
  };
  const stageColor = stageColorMap[stage];
  const stageLabel = t(I18N.lab.re.stages[stage], lang);
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10,
      alignItems: 'center', padding: '8px 0', borderBottom: '1px dashed var(--line)',
      fontFamily: 'var(--mono)', fontSize: 12,
    }}>
      <div>
        <div style={{ color: 'var(--fg)' }}>{name}</div>
        <div style={{ color: stageColor, fontSize: 10, marginTop: 2 }}>{stageLabel} · {time}</div>
      </div>
      <div style={{
        width: 56, height: 4, borderRadius: 2,
        background: 'rgba(255,255,255,.06)', overflow: 'hidden',
      }}>
        <div style={{ width: `${score}%`, height: '100%', background: stageColor }} />
      </div>
      <span style={{ color: 'var(--fg-3)', fontSize: 11, width: 28, textAlign: 'right' }}>{score}</span>
    </div>
  );
}

// ── 2. Automotive ────────────────────────────────────────────
function LabAuto({ lang }: { lang: Lang }) {
  const S = I18N.lab.auto;
  const cars: { sku: string; model: string; price: string; stock: number; status: Status }[] = [
    { sku: 'MX-241', model: 'Sentra 2024',     price: 'MXN 389,000', stock: 4, status: 'in' },
    { sku: 'MX-187', model: 'Versa 2024',      price: 'MXN 295,500', stock: 1, status: 'low' },
    { sku: 'MX-902', model: 'Frontier Pro 4X', price: 'MXN 712,900', stock: 0, status: 'out' },
    { sku: 'MX-115', model: 'Kicks Advance',   price: 'MXN 412,200', stock: 7, status: 'in' },
  ];
  return (
    <div className="card b-5" style={{ padding: 0, overflow: 'hidden', minHeight: 420 }}>
      <LabHead num="02" tag="automotive" title={t(S.title, lang)} sub={t(S.sub, lang)} />

      <div style={{ padding: 22, borderTop: '1px solid var(--line)' }}>
        <div className="mono" style={{
          fontSize: 10, color: 'var(--fg-4)', marginBottom: 14,
          letterSpacing: '.08em', textTransform: 'uppercase',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>▸ {t(S.stockLabel, lang)}</span><span style={{ color: 'var(--ok)' }}>● synced</span>
        </div>

        {cars.map((c) => <CarRow key={c.sku} {...c} />)}

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed var(--line)' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 }}>{t(S.syncStatus, lang)}</div>
          <Bars values={[40, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92]} color="var(--primary)" width={300} height={42} />
        </div>
      </div>

      <LabFoot stack={['Next.js', 'Postgres', 'Redis', 'AWS S3']} outcome={t(S.outcome, lang)} lang={lang} />
    </div>
  );
}

interface CarRowProps {
  sku:    string;
  model:  string;
  price:  string;
  stock:  number;
  status: Status;
}

function CarRow({ sku, model, price, stock, status }: CarRowProps) {
  const colorMap: Record<Status, string> = { in: 'var(--ok)', low: 'var(--warn)', out: 'var(--err)' };
  const c = colorMap[status];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto', gap: 12,
      padding: '8px 0', borderBottom: '1px dashed var(--line)',
      fontFamily: 'var(--mono)', fontSize: 12,
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--fg-4)', fontSize: 10 }}>{sku}</span>
          <span style={{ color: 'var(--fg)' }}>{model}</span>
        </div>
        <div style={{ color: 'var(--fg-3)', fontSize: 11, marginTop: 2 }}>{price}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: c, fontSize: 12 }}>● {stock} u</div>
        <div style={{ color: 'var(--fg-4)', fontSize: 10, marginTop: 2, textTransform: 'uppercase' }}>{status}</div>
      </div>
    </div>
  );
}

// ── 3. BI ────────────────────────────────────────────────────
function LabBI({ lang }: { lang: Lang }) {
  const S = I18N.lab.bi;
  return (
    <div className="card b-5" style={{ padding: 0, overflow: 'hidden', minHeight: 380 }}>
      <LabHead num="03" tag="business_intel" title={t(S.title, lang)} sub={t(S.sub, lang)} />

      <div style={{ padding: 22, borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <BIBlock label={t(S.revenue, lang)} value="$ 2.41M" sub={t(S.revSub, lang)} color="var(--primary)" />
          <BIBlock label={t(S.conv, lang)}    value="4.82%"   sub={t(S.convSub, lang)} color="var(--cyan)" />
        </div>
        <div className="mono" style={{
          fontSize: 10, color: 'var(--fg-4)', letterSpacing: '.08em',
          textTransform: 'uppercase', marginBottom: 8,
        }}>{t(S.funnelLbl, lang)}</div>
        <Funnel lang={lang} />
      </div>

      <LabFoot stack={['Python', 'Glue', 'Athena', 'QuickSight']} outcome={t(S.outcome, lang)} lang={lang} />
    </div>
  );
}

function BIBlock({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{
      padding: 12, borderRadius: 10, border: '1px solid var(--line)',
      background: 'rgba(255,255,255,.015)',
    }}>
      <div className="mono" style={{
        fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '.06em',
      }}>{label}</div>
      <div className="mono" style={{
        fontSize: 22, color, marginTop: 6, textShadow: `0 0 12px ${color}`,
      }}>{value}</div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function Funnel({ lang }: { lang: Lang }) {
  const rows = [
    { label: 'visit',         n: 41200, pct: 100 },
    { label: 'view_product',  n: 18430, pct: 44 },
    { label: 'add_to_cart',   n: 6210,  pct: 15 },
    { label: 'checkout',      n: 1985,  pct: 4.8 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {rows.map((r) => (
        <div key={r.label} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--mono)', fontSize: 11,
        }}>
          <span style={{ width: 92, color: 'var(--fg-3)' }}>{r.label}</span>
          <div style={{
            flex: 1, height: 14, background: 'rgba(255,255,255,.04)', borderRadius: 3, overflow: 'hidden',
          }}>
            <div style={{
              width: `${r.pct}%`, height: '100%',
              background: 'linear-gradient(90deg, var(--primary-dim), var(--primary))',
            }} />
          </div>
          <span style={{ width: 56, textAlign: 'right', color: 'var(--fg)' }}>
            {r.n.toLocaleString(lang === 'en' ? 'en-US' : 'es-MX')}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── 4. AI Efficiency ─────────────────────────────────────────
function LabAI({ lang }: { lang: Lang }) {
  const S = I18N.lab.ai;
  return (
    <div className="card b-12" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '28px 28px 0' }}>
        <LabHead inline num="04" tag="efficiency_ai" title={t(S.title, lang)} sub={t(S.sub, lang)} />
      </div>

      <div className="ai-grid" style={{
        borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        <AISpec n="A.01" data={S.a1} stack={['Textract', 'Lambda', 'SQS']} lang={lang} />
        <AISpec n="A.02" data={S.a2} stack={['Prophet', 'SageMaker', 'Athena']} lang={lang} divider />
        <AISpec n="A.03" data={S.a3} stack={['OpenAI', 'Pinecone', 'NestJS']} lang={lang} divider />
      </div>
      <style>{`
        @media(max-width:880px){
          .ai-grid{grid-template-columns:1fr !important;}
          .ai-grid > div{border-left:0 !important;border-top:1px solid var(--line) !important;}
          .ai-grid > div:first-child{border-top:0 !important;}
        }
      `}</style>
    </div>
  );
}

interface AISpecData {
  title:   { es: string; en: string };
  problem: { es: string; en: string };
  outcome: { es: string; en: string };
}

interface AISpecProps {
  n:        string;
  data:     AISpecData;
  stack:    string[];
  divider?: boolean;
  lang:     Lang;
}

function AISpec({ n, data, stack, divider, lang }: AISpecProps) {
  const L = I18N.lab.ai.labels;
  return (
    <div style={{
      padding: 24, borderLeft: divider ? '1px solid var(--line)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', letterSpacing: '.06em' }}>{n}</div>
      <h4 style={{
        fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 600,
        margin: 0, letterSpacing: '-.01em',
      }}>{t(data.title, lang)}</h4>
      <div className="kvline"><span className="k">{t(L.problem, lang)}</span><span className="v">{t(data.problem, lang)}</span></div>
      <div className="kvline">
        <span className="k">{t(L.stack, lang)}</span>
        <span className="v" style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {stack.map((s) => <span key={s} className="kbd">{s}</span>)}
        </span>
      </div>
      <div className="kvline">
        <span className="k">{t(L.outcome, lang)}</span>
        <span className="v" style={{ color: 'var(--primary)' }}>{t(data.outcome, lang)}</span>
      </div>
    </div>
  );
}

// ── shared ───────────────────────────────────────────────────
interface LabHeadProps {
  num:     string;
  tag:     string;
  title:   string;
  sub:     string;
  inline?: boolean;
}

function LabHead({ num, tag, title, sub, inline }: LabHeadProps) {
  return (
    <div style={{ padding: inline ? 0 : 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--primary)' }}>[{num}]</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{tag}()</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>case ▸</span>
      </div>
      <h3 style={{
        fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '-.015em',
        fontWeight: 600, margin: '0 0 6px', lineHeight: 1.15,
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--fg-2)', margin: 0, fontSize: 13.5, maxWidth: '50ch' }}>{sub}</p>
    </div>
  );
}

function LabFoot({ stack, outcome, lang }: { stack: string[]; outcome: string; lang: Lang }) {
  return (
    <div style={{
      borderTop: '1px solid var(--line)', padding: '14px 22px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 12, background: 'rgba(255,255,255,.015)',
    }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {stack.map((tag) => <span key={tag} className="kbd">{tag}</span>)}
      </div>
      <div className="mono" style={{
        fontSize: 11, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {t(I18N.lab.outcomeLabel, lang)} <span style={{ color: 'var(--primary)' }}>▸ {outcome}</span>
      </div>
    </div>
  );
}
