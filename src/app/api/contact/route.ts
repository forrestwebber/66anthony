import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = '8658667496:AAHbf8jGYCKPBaPEY9pyXXzNPNtEnadiDOU';
const TELEGRAM_CHAT_ID = '8569056081';
const SUPABASE_URL = 'https://oxexnudmtjxtouckkibe.supabase.co';
const SUPABASE_KEY_FALLBACK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXhudWRtdGp4dG91Y2traWJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5OTAyMywiZXhwIjoyMDkyMjc1MDIzfQ._20IBmfQLsyxG2YD_S4HJ4kzjiO6ejIEz_diu6zCnpA';

function getSbKey() {
  return process.env.OFMH_SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_KEY_FALLBACK;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    const telegramText = [
      `<b>66 Anthony — Website Inquiry</b>`,
      `<b>Name:</b> ${name}`,
      `<b>Email:</b> ${email}`,
      phone ? `<b>Phone:</b> ${phone}` : '',
      message ? `\n${message}` : '',
    ].filter(Boolean).join('\n');

    const k = getSbKey();
    await Promise.allSettled([
      fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText, parse_mode: 'HTML' }),
      }),
      fetch(`${SUPABASE_URL}/rest/v1/portal_notifications`, {
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
      }),
      (async () => {
        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) return;
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: 'Oak Forest Modern Homes <portal@oakforest.com>',
            to: ['forrest@oakforest.com'],
            subject: `[66 Anthony] Website Inquiry — ${name}`,
            html: [
              `<p><strong>Name:</strong> ${name}</p>`,
              `<p><strong>Email:</strong> ${email}</p>`,
              phone ? `<p><strong>Phone:</strong> ${phone}</p>` : '',
              message ? `<hr/><p>${message.replace(/\n/g, '<br/>')}</p>` : '',
            ].filter(Boolean).join(''),
          }),
        });
      })(),
    ]);

    return NextResponse.json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
