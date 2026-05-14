import { Resend } from 'resend';

interface ContactBody {
  name?:    string;
  email?:   string;
  project?: string;
  msg?:     string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO_ADDRESS   = 'hola@primecoders.dev';
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? 'PrimeCoders <onboarding@resend.dev>';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name    = (body.name    ?? '').trim();
  const email   = (body.email   ?? '').trim();
  const project = (body.project ?? '').trim();
  const msg     = (body.msg     ?? '').trim();

  if (!name || !email || !msg) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return Response.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (name.length > 200 || project.length > 100 || msg.length > 5000) {
    return Response.json({ error: 'field_too_long' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'email_not_configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New alliance request — ${name} (${project || 'n/a'})`,
      html: `
        <h2>New alliance request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(project || '—')}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(msg)}</pre>
      `,
    });
    if (result.error) {
      return Response.json({ error: 'send_failed' }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'send_failed' }, { status: 500 });
  }
}
