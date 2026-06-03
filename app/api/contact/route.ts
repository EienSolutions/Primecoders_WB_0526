import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, project, msg } = await req.json();

  const from = process.env.RESEND_FROM_ADDRESS ?? 'onboarding@resend.dev';

  const { error } = await resend.emails.send({
    from,
    to: 'hola@primecoders.dev',
    replyTo: email,
    subject: `[PrimeCoders] ${project} — ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nTipo: ${project}\n\n${msg}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
