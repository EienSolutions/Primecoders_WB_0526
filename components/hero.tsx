'use client';

import { I18N, t } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';
import { AsciiBlock, LiveBadge, Typer, type TyperLine } from './effects';

export function Hero() {
  const { lang, heroCopy } = useTheme();
  const head = I18N.hero.head[heroCopy] ?? I18N.hero.head.default;
  const H = t(head, lang);
  const S = I18N.hero;

  return (
    <section id="top" className="section hero" style={{ paddingTop: 'clamp(48px,7vw,96px)' }}>
      <div className="wrap" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, right: 'var(--pad)',
          display: 'flex', gap: 14, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--fg-4)',
        }}>
          <AsciiBlock>{`┌─────────────┐
│  build:0421 │
│  rev:cb19f  │
│  env:prod   │
└─────────────┘`}</AsciiBlock>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          <span className="tag primary"><span className="dot pm" />{t(S.tagPrimary, lang)}</span>
          <span className="tag">{t(S.tagSecondary, lang)} <span style={{ color: 'var(--fg-4)' }}>→</span> v1.0</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(48px,10vw,148px)',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          fontWeight: 600,
          margin: 0,
          maxWidth: '14ch',
          textWrap: 'balance',
        }}>
          <span style={{ color: 'var(--fg)' }}>{H.pre}</span>{' '}
          <span style={{ color: 'var(--fg-2)' }}>{H.mid}</span>{' '}
          <span className="accent" style={{
            color: 'var(--primary)',
            textShadow: '0 0 calc(var(--glow) * .9) var(--primary-glow)',
            fontStyle: 'italic',
            fontWeight: 600,
          }}>{H.tail}</span>
        </h1>

        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 32, marginTop: 48, alignItems: 'end',
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: 'clamp(17px,1.6vw,22px)', lineHeight: 1.45,
              color: 'var(--fg-2)', maxWidth: '38ch', margin: 0, textWrap: 'pretty',
            }}>
              <span style={{ color: 'var(--fg)' }}>{H.sub}</span>{' '}
              {t(S.sub, lang)}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn primary">
                {t(S.cta1, lang)} <span className="arr">↗</span>
              </a>
              <a href="#lab" className="btn">
                {t(S.cta2, lang)}
              </a>
            </div>

            <div style={{ marginTop: 36, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <LiveBadge label={t(S.badge1, lang)} value="99.98%" color="var(--ok)" />
              <LiveBadge label={t(S.badge2, lang)} value="-34%"   color="var(--cyan)" />
              <LiveBadge label={t(S.badge3, lang)} value="2.1M"   color="var(--purple)" />
            </div>
          </div>

          <HeroTerminal lines={[...t(S.terminalLines, lang)]} />
        </div>
      </div>

      <style>{`
        @media(max-width:880px){
          .hero-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </section>
  );
}

function HeroTerminal({ lines }: { lines: string[] }) {
  const linesKey = lines.join('|');
  const tlines: TyperLine[] = lines.map((text) => ({
    text,
    cls: text.startsWith('$') ? 'tl-cmd' : text.startsWith('✓') ? 'tl-ok' : 'tl-out',
  }));

  return (
    <div className="card" style={{ padding: 0, minWidth: 0 }}>
      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 18px', borderBottom: '1px solid var(--line)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot er" /><span className="dot wn" /><span className="dot" />
          <span style={{ marginLeft: 10 }}>~/primecoders — zsh</span>
        </div>
        <span>80×24</span>
      </div>

      <div style={{
        padding: '18px 20px 22px', fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.75,
        minHeight: 230,
      }}>
        <Typer key={linesKey} lines={tlines} speed={14} startDelay={400} />
      </div>

      <style>{`
        .tl-cmd{color:var(--fg);}
        .tl-out{color:var(--fg-3);}
        .tl-ok{color:var(--primary);}
      `}</style>
    </div>
  );
}
