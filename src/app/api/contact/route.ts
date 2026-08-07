import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const TELEGRAM_TOKEN = '8658667496:AAHbf8jGYCKPBaPEY9pyXXzNPNtEnadiDOU';
const TELEGRAM_CHAT_ID = '-5074888487'; // Sol-Ops-Log group (routine, no DM ping) - repointed 2026-07-24; real leads still reach Forrest via morning brief + prospects table
const SUPABASE_URL = 'https://oxexnudmtjxtouckkibe.supabase.co';
// Legacy JWT — disabled account-wide 2026-08-01. Kept ONLY as a last-ditch local-dev fallback;
// production must resolve OFMH_SUPABASE_SERVICE_ROLE_KEY (new sb_secret_ key) below.
const SUPABASE_KEY_FALLBACK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXhudWRtdGp4dG91Y2traWJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5OTAyMywiZXhwIjoyMDkyMjc1MDIzfQ._20IBmfQLsyxG2YD_S4HJ4kzjiO6ejIEz_diu6zCnpA';

// IMPORTANT: on Cloudflare Pages (OpenNext), Pages secrets set via `wrangler pages secret put`
// are NOT reliably visible on `process.env` inside Functions — that polyfill can miss secrets
// added/rotated after the current deployment was built. Pull from the Cloudflare request
// context first (the source of truth for bindings/secrets) and only fall back to process.env
// for local `next dev`. Bug history: this route silently fell back to the hardcoded legacy JWT
// above in production because process.env never saw OFMH_SUPABASE_SERVICE_ROLE_KEY, and because
// the fetch below wasn't checked, that 401 was swallowed and the visitor still got a 200.
async function getSbKey(): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const fromCf = (env as Record<string, string | undefined>)?.OFMH_SUPABASE_SERVICE_ROLE_KEY;
    if (fromCf) return fromCf;
  } catch {
    // Not running inside a Cloudflare Pages Function (e.g. local `next dev`) — fall through.
  }
  return process.env.OFMH_SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_KEY_FALLBACK;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    // 1) Supabase insert — AWAITED and CHECKED. A non-2xx here must never be silently
    // swallowed: it's the system of record for this lead.
    const k = await getSbKey();
    let supabaseOk = false;
    let supabaseError = '';
    try {
      const sbRes = await fetch(`${SUPABASE_URL}/rest/v1/portal_notifications`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${k}`,
          apikey: k,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          source: '66anthony',
          title: `66 Anthony Inquiry — ${name}`,
          sender_name: name,
          sender_email: email,
          sender_phone: phone || null,
          message: message || null,
        }),
      });
      supabaseOk = sbRes.ok;
      if (!sbRes.ok) {
        supabaseError = await sbRes.text().catch(() => '');
        console.error(`[66anthony/contact] Supabase insert failed: ${sbRes.status} ${supabaseError}`);
      }
    } catch (e) {
      supabaseError = e instanceof Error ? e.message : String(e);
      console.error('[66anthony/contact] Supabase insert threw:', supabaseError);
    }

    // 2) Telegram + Resend — best-effort durable paths. If Supabase failed, flag it loudly
    // in the Telegram message so the lead is never silently lost even if the DB write is down.
    const telegramText = [
      `<b>66 Anthony — Website Inquiry</b>`,
      supabaseOk ? '' : `⚠️ <b>DB WRITE FAILED (${supabaseError.slice(0, 200) || 'unknown error'})</b> — capture this lead manually`,
      `<b>Name:</b> ${name}`,
      `<b>Email:</b> ${email}`,
      phone ? `<b>Phone:</b> ${phone}` : '',
      message ? `\n${message}` : '',
    ].filter(Boolean).join('\n');

    const [telegramResult, resendResult] = await Promise.allSettled([
      fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText, parse_mode: 'HTML' }),
      }),
      (async () => {
        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) return;
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: 'Oak Forest Modern Homes <portal@oakforest.com>',
            to: ['forrest@the247broker.com'],
            subject: `[66 Anthony] Website Inquiry — ${name}${supabaseOk ? '' : ' [DB WRITE FAILED]'}`,
            html: [
              supabaseOk ? '' : '<p style="color:red"><strong>DB WRITE FAILED — capture this lead manually.</strong></p>',
              `<p><strong>Name:</strong> ${name}</p>`,
              `<p><strong>Email:</strong> ${email}</p>`,
              phone ? `<p><strong>Phone:</strong> ${phone}</p>` : '',
              message ? `<hr/><p>${message.replace(/\n/g, '<br/>')}</p>` : '',
            ].filter(Boolean).join(''),
          }),
        });
      })(),
    ]);

    const telegramOk = telegramResult.status === 'fulfilled' && telegramResult.value.ok;
    const resendOk = resendResult.status === 'fulfilled';

    if (!supabaseOk && !telegramOk && !resendOk) {
      // Every path failed — this lead is genuinely at risk of being lost. Log loudly so it
      // surfaces in Cloudflare Pages Function logs / alerting instead of vanishing.
      console.error(`[66anthony/contact] ALL notification paths failed for lead ${email} (${name}). Supabase error: ${supabaseError}`);
    }

    return NextResponse.json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
