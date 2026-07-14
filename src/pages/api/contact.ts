import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const TO_EMAIL = import.meta.env.CONTACT_TO_EMAIL ?? 'business@eskewselectrical.com';
// Must be a verified domain sender in Resend (see README "Resend setup")
const FROM_EMAIL =
  import.meta.env.CONTACT_FROM_EMAIL ?? "Eskew's Website <quotes@eskewselectrical.com>";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });
  const data = await res.json();
  return data.success === true;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  );

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const name = String(form.get('name') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const city = String(form.get('city') ?? '').trim();
  const service = String(form.get('service') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();
  const token = String(form.get('cf-turnstile-response') ?? '');

  if (!name || !phone || !message) {
    return json({ error: 'Please fill in your name, phone, and message.' }, 400);
  }
  if (name.length > 200 || phone.length > 50 || message.length > 5000) {
    return json({ error: 'One of the fields is too long.' }, 400);
  }

  if (!(await verifyTurnstile(token, clientAddress ?? null))) {
    return json({ error: 'Verification failed. Please try again.' }, 400);
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const rows = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '—'],
    ['City', city || '—'],
    ['Service', service || '—'],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;">${k}</td><td style="padding:6px 0;font-weight:600;">${esc(v)}</td></tr>`
    )
    .join('');

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email || undefined,
    subject: `New quote request — ${name}${city ? ` (${city})` : ''}`,
    html: `
      <h2 style="font-family:Georgia,serif;">New quote request from eskewselectrical.com</h2>
      <table style="font-family:sans-serif;font-size:15px;">${rows}</table>
      <p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;border-left:3px solid #019be0;padding-left:12px;">${esc(message)}</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return json({ error: 'Could not send your request. Please call us instead.' }, 502);
  }

  return json({ ok: true });
};
