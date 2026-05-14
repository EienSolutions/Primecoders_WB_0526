'use client';

import { I18N, t } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';

export function Nav() {
  const { lang } = useTheme();
  const items = [
    { n: '01', label: t(I18N.nav.pillars, lang), href: '#pillars' },
    { n: '02', label: t(I18N.nav.lab, lang),     href: '#lab' },
    { n: '03', label: t(I18N.nav.vault, lang),   href: '#vault' },
    { n: '04', label: t(I18N.nav.stack, lang),   href: '#stack' },
    { n: '05', label: t(I18N.nav.contact, lang), href: '#contact' },
  ];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">P</span>
          <span>primecoders<span className="brand-dot">.</span></span>
        </a>
        <div className="nav-links">
          {items.map((it) => (
            <a key={it.n} href={it.href}><span className="n">{it.n}</span>{it.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="nav-status">
            <span className="dot pulse" />
            <span>{t(I18N.nav.status, lang)}</span>
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span>v1.0.0</span>
          </div>
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}

export function LanguageSwitcher() {
  const { lang, setLang } = useTheme();
  const segStyle = (active: boolean): React.CSSProperties => ({
    appearance: 'none',
    border: 0,
    background: 'transparent',
    color: active ? 'var(--primary)' : 'var(--fg-3)',
    fontFamily: 'var(--mono)',
    fontSize: 11,
    padding: '4px 8px',
    cursor: 'pointer',
    letterSpacing: '.06em',
    fontWeight: active ? 600 : 400,
  });
  return (
    <div
      role="radiogroup"
      aria-label="Language"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--line-strong)',
        borderRadius: 999,
        overflow: 'hidden',
        background: 'rgba(255,255,255,.015)',
      }}
    >
      <button type="button" role="radio" aria-checked={lang === 'es'}
              style={segStyle(lang === 'es')} onClick={() => setLang('es')}>ES</button>
      <span style={{ width: 1, height: 14, background: 'var(--line-strong)' }} />
      <button type="button" role="radio" aria-checked={lang === 'en'}
              style={segStyle(lang === 'en')} onClick={() => setLang('en')}>EN</button>
    </div>
  );
}

export function DarkModeToggle() {
  const { dark, setDark, lang } = useTheme();
  const label = dark
    ? (lang === 'en' ? 'Switch to light mode' : 'Cambiar a modo claro')
    : (lang === 'en' ? 'Switch to dark mode' : 'Cambiar a modo oscuro');
  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      aria-label={label}
      title={label}
      style={{
        appearance: 'none',
        width: 30,
        height: 30,
        borderRadius: 999,
        border: '1px solid var(--line-strong)',
        background: 'rgba(255,255,255,.015)',
        color: 'var(--fg-2)',
        cursor: 'pointer',
        display: 'inline-grid',
        placeItems: 'center',
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      {dark ? '☀' : '◑'}
    </button>
  );
}
