'use client';

import { useState, type ReactNode } from 'react';
import { I18N, t, type Lang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';

type ProjectType = 'Web' | 'Mobile' | 'Data' | 'AWS';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const PROJECT_TYPES: ProjectType[] = ['Web', 'Mobile', 'Data', 'AWS'];

export function Contact() {
  const { lang } = useTheme();
  const S = I18N.contact;
  const [project, setProject] = useState<ProjectType>('Web');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [msg, setMsg]         = useState('');
  const [status, setStatus]   = useState<Status>('idle');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, project, msg }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const tt = t(S.title, lang) as readonly string[];

  const stateLabel =
    status === 'sent'    ? t(S.formSent, lang)    :
    status === 'sending' ? t(S.formSending, lang) :
    status === 'error'   ? t(S.formError, lang)   :
                           t(S.formDraft, lang);

  const stateColor =
    status === 'sent'  ? 'var(--primary)' :
    status === 'error' ? 'var(--err)'     :
                         'var(--fg-3)';

  const buttonLabel =
    status === 'sent'    ? t(S.submitted, lang) :
    status === 'sending' ? t(S.sending, lang)   :
    status === 'error'   ? t(S.errored, lang)   :
                           t(S.submit, lang);

  return (
    <section id="contact" className="section" style={{ paddingBottom: 'clamp(56px,8vw,96px)' }}>
      <div className="wrap">
        <div className="contact-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px,5vw,80px)', alignItems: 'flex-start',
        }}>
          <div>
            <div className="section-tag"><span className="num">05</span> {t(S.tag, lang)}</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              {tt[0]}<em>{tt[1]}</em>{tt[2]}
            </h2>
            <p style={{ color: 'var(--fg-2)', fontSize: 17, maxWidth: '42ch', textWrap: 'pretty' }}>
              {t(S.sub, lang)}
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="https://cal.com/primecoders" target="_blank" rel="noreferrer" className="btn primary">
                {t(S.cta1, lang)} <span className="arr">↗</span>
              </a>
              <a href="mailto:hola@primecoders.dev" className="btn">
                hola@primecoders.dev
              </a>
            </div>

            <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <ContactStat label={t(S.stats.response, lang)} value={t(S.stats.respVal, lang)} />
              <ContactStat label={t(S.stats.fit,      lang)} value={t(S.stats.fitVal,  lang)} />
              <ContactStat label={t(S.stats.tz,       lang)} value={t(S.stats.tzVal,   lang)} />
              <ContactStat label={t(S.stats.nda,      lang)} value={t(S.stats.ndaVal,  lang)} />
            </div>
          </div>

          <div className="card" style={{ padding: 0, position: 'relative' }}>
            <div className="corner tl" /><div className="corner tr" />
            <div className="corner bl" /><div className="corner br" />
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>▸ {t(S.formTitle, lang)}</span>
              <span style={{ color: stateColor }}>{stateLabel}</span>
            </div>

            <form onSubmit={submit} style={{
              padding: 24, display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <Field label={t(S.fields.name, lang)}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t(S.placeholders.name, lang)} required />
              </Field>
              <Field label={t(S.fields.email, lang)}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t(S.placeholders.email, lang)} required />
              </Field>

              <Field label={t(S.fields.type, lang)}>
                <div className="proj-grid" style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6,
                }}>
                  {PROJECT_TYPES.map((p) => {
                    const active = project === p;
                    return (
                      <button
                        key={p} type="button"
                        onClick={() => setProject(p)}
                        style={{
                          appearance: 'none',
                          padding: '10px 6px',
                          border: '1px solid ' + (active ? 'var(--primary)' : 'var(--line-strong)'),
                          borderRadius: 8,
                          background: active ? 'var(--primary-dim)' : 'rgba(255,255,255,.015)',
                          color: active ? 'var(--primary)' : 'var(--fg-2)',
                          fontFamily: 'var(--mono)', fontSize: 12,
                          cursor: 'pointer',
                          transition: 'all .15s',
                          textShadow: active ? '0 0 12px var(--primary-glow)' : 'none',
                        }}>
                        {active && '▸ '}{t(S.projectTypes[p], lang)}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label={t(S.fields.msg, lang)}>
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder={t(S.placeholders.msg, lang)} required />
              </Field>

              <button
                type="submit"
                className="btn primary"
                style={{ marginTop: 6 }}
                disabled={status === 'sending'}
              >
                {buttonLabel} <span className="arr">↗</span>
              </button>

              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center' }}>
                {t(S.formNote, lang)}
              </div>
            </form>
          </div>
        </div>

        <style>{`
          .contact-grid input, .contact-grid textarea{
            width:100%; box-sizing:border-box;
            background:rgba(255,255,255,.015);
            border:1px solid var(--line-strong);
            border-radius:8px;
            padding:11px 13px;
            font-family:var(--mono); font-size:13px;
            color:var(--fg); outline:none;
            transition:border-color .15s, background .15s;
            resize:vertical;
          }
          .contact-grid input:focus, .contact-grid textarea:focus{
            border-color:var(--primary);
            background:rgba(204,255,0,.03);
          }
          .contact-grid input::placeholder, .contact-grid textarea::placeholder{ color:var(--fg-4); }
          @media(max-width:880px){
            .contact-grid{grid-template-columns:1fr !important;}
            .proj-grid{grid-template-columns:repeat(2,1fr) !important;}
          }
        `}</style>
      </div>

      <Footer lang={lang} />
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="mono" style={{
        fontSize: 10, color: 'var(--fg-3)',
        textTransform: 'uppercase', letterSpacing: '.08em',
      }}>{label}</span>
      {children}
    </label>
  );
}

function ContactStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono" style={{
        fontSize: 10, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '.08em',
      }}>{label}</div>
      <div className="mono" style={{ fontSize: 15, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
    </div>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const F = I18N.foot;
  return (
    <footer className="foot" style={{ marginTop: 96 }}>
      <div className="foot-grid">
        <div className="col col-big" style={{ marginRight: 'auto' }}>
          <div className="brand" style={{ marginBottom: 18 }}>
            <span className="brand-mark">P</span>
            <span>primecoders<span className="brand-dot">.</span></span>
          </div>
          <p style={{ color: 'var(--fg-2)', maxWidth: '42ch', margin: 0 }}>
            {t(F.tagline, lang)}
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="tag"><span className="dot" /> {t(F.online, lang)}</span>
            <span className="tag">CDMX · MX</span>
            <span className="tag">est. 2025</span>
          </div>
        </div>

        <div className="col">
          <div className="foot-col-title">{t(F.map, lang)}</div>
          <a className="foot-link" href="#pillars">▸ {t(I18N.nav.pillars, lang)}</a>
          <a className="foot-link" href="#lab">▸ {t(I18N.nav.lab, lang)}</a>
          <a className="foot-link" href="#vault">▸ {t(I18N.nav.vault, lang)}</a>
          <a className="foot-link" href="#stack">▸ {t(I18N.nav.stack, lang)}</a>
        </div>
        <div className="col">
          <div className="foot-col-title">{t(F.contact, lang)}</div>
          <a className="foot-link" href="mailto:hola@primecoders.dev">▸ hola@primecoders.dev</a>
          <a className="foot-link" href="https://cal.com/primecoders">▸ cal.com/primecoders</a>
          <a className="foot-link" href="https://linkedin.com">▸ LinkedIn</a>
          <a className="foot-link" href="https://github.com">▸ GitHub</a>
        </div>
      </div>

      <div className="foot-base">
        <span>{t(F.rights, lang)}</span>
        <span>build_0421 · rev_cb19f · <span style={{ color: 'var(--primary)' }}>● online</span></span>
      </div>
    </footer>
  );
}
