'use client';

import { Fragment } from 'react';
import { I18N, t } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';

interface StackItem { name: string; meta: string }
interface StackGroup { label: string; icon: string; items: StackItem[] }

export function Stack() {
  const { lang } = useTheme();
  const S = I18N.stack;
  const tt = t(S.title, lang) as readonly string[];
  const groups: StackGroup[] = [
    {
      label: t(S.groups.g1, lang), icon: '◰',
      items: [
        { name: 'Next.js',      meta: 'app router · ssr · edge' },
        { name: 'React Native', meta: 'expo · new arch' },
        { name: 'TypeScript',   meta: 'strict · zod' },
      ],
    },
    {
      label: t(S.groups.g2, lang), icon: '◱',
      items: [
        { name: 'NestJS',     meta: 'modular · tRPC' },
        { name: 'Node.js',    meta: 'v22 · esm' },
        { name: 'PostgreSQL', meta: 'rls · prisma' },
      ],
    },
    {
      label: t(S.groups.g3, lang), icon: '◲',
      items: [
        { name: 'AWS',          meta: 'lambda · s3 · cognito' },
        { name: 'Python',       meta: 'pandas · fastapi' },
        { name: 'scikit-learn', meta: 'ml · sklearn · sagemaker' },
      ],
    },
  ];

  return (
    <section id="stack" className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-tag"><span className="num">04</span> {t(S.tag, lang)}</div>
            <h2 className="section-title">
              {tt[0]}<em>{tt[1]}</em>{tt[2]}
            </h2>
          </div>
          <p className="section-sub">{t(S.sub, lang)}</p>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '12px 18px', borderBottom: '1px solid var(--line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="dot er" /><span className="dot wn" /><span className="dot" />
              <span style={{ marginLeft: 10 }}>~/primecoders/stack.json</span>
            </div>
            <span>readonly</span>
          </div>

          <div className="stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {groups.map((g, i) => (
              <StackCol key={g.label} {...g} divider={i > 0} />
            ))}
          </div>

          <div style={{
            padding: '14px 22px', borderTop: '1px solid var(--line)',
            background: 'rgba(204,255,0,.02)',
            fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-2)',
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          }}>
            <span style={{ color: 'var(--primary)' }}>$</span>
            <span>npx primecoders --stack --explain</span>
            <span style={{ color: 'var(--fg-4)' }}>→</span>
            <span style={{ color: 'var(--fg-3)' }}>{t(S.outputLine, lang)}</span>
            <span className="cursor" style={{ background: 'var(--primary)' }} />
          </div>
        </div>

        <div className="marquee" style={{ marginTop: 36 }}>
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <Fragment key={k}>
                {[
                  'NEXT.JS', 'NESTJS', 'REACT NATIVE', 'TYPESCRIPT', 'AWS', 'LAMBDA', 'S3',
                  'COGNITO', 'POSTGRES', 'REDIS', 'PYTHON', 'SCIKIT-LEARN', 'SAGEMAKER', 'PINECONE', 'OPENAI',
                ].map((tag) => (
                  <span key={tag + k} style={{
                    fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--fg-3)',
                    display: 'inline-flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap',
                  }}>
                    <span style={{ color: 'var(--primary)' }}>▸</span>{tag}
                  </span>
                ))}
              </Fragment>
            ))}
          </div>
        </div>

        <style>{`
          @media(max-width:880px){
            .stack-grid{grid-template-columns:1fr !important;}
            .stack-grid > div{border-left:0 !important;border-top:1px solid var(--line) !important;}
            .stack-grid > div:first-child{border-top:0 !important;}
          }
        `}</style>
      </div>
    </section>
  );
}

interface StackColProps extends StackGroup { divider: boolean }

function StackCol({ label, icon, items, divider }: StackColProps) {
  return (
    <div style={{
      padding: 24, borderLeft: divider ? '1px solid var(--line)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 22, color: 'var(--primary)', lineHeight: 1,
        }}>{icon}</span>
        <span className="mono" style={{
          fontSize: 11, color: 'var(--fg-3)',
          textTransform: 'uppercase', letterSpacing: '.1em',
        }}>{label}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => (
          <div key={it.name} className="mono" style={{ fontSize: 13, color: 'var(--fg-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                color: 'var(--fg-4)', fontSize: 11, width: 20, display: 'inline-block',
              }}>
                {i === items.length - 1 ? '└─' : '├─'}
              </span>
              <span style={{ color: 'var(--fg)' }}>{it.name}</span>
            </div>
            <div style={{
              paddingLeft: 28, fontSize: 11, color: 'var(--fg-4)', marginTop: 2,
            }}>
              {it.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
