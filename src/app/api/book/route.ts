import { NextResponse } from "next/server";
import { Resend } from "resend";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

interface BookingPayload {
  name: string;
  email: string;
  startup: string;
  challenge: string;
  revenue: string;
  resource: string;
  slot: string;          // e.g. "10:00 AM"
  date: { day: number; month: number; year: number };
}

function buildDateLabel(date: BookingPayload["date"], slot: string) {
  const { day, month, year } = date;
  const dayName = DAY_NAMES[new Date(year, month, day).getDay()];
  return `${dayName}, ${MONTHS[month]} ${day}, ${year} · ${slot}`;
}

// Simple Google Calendar link so the user can add it themselves
function buildGCalLink(date: BookingPayload["date"], slot: string) {
  const { day, month, year } = date;
  const [time, ampm] = slot.split(" ");
  const [rawH, rawM] = time.split(":").map(Number);
  let h = rawH;
  if (ampm === "PM" && rawH !== 12) h += 12;
  if (ampm === "AM" && rawH === 12) h = 0;

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const mm   = pad2(month + 1);
  const dd   = pad2(day);
  const hh   = pad2(h);
  const min  = pad2(rawM);

  const endH = h + (rawM + 30 >= 60 ? 1 : 0);
  const endMin = (rawM + 30) % 60;

  const start = `${year}${mm}${dd}T${hh}${min}00`;
  const end   = `${year}${mm}${dd}T${pad2(endH)}${pad2(endMin)}00`;

  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=UX+Strategy+Call+%E2%80%94+Contrast+Studio` +
    `&dates=${start}%2F${end}` +
    `&details=Your+30-minute+UX+Growth+Strategy+call+with+Contrast+Studio.`
  );
}

function notificationHtml(data: BookingPayload) {
  const label  = buildDateLabel(data.date, data.slot);
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;max-width:560px;margin:40px auto;color:#111;line-height:1.6">
  <h2 style="margin:0 0 4px">📅 New Strategy Call Booking</h2>
  <p style="margin:0 0 24px;color:#666;font-size:14px">${label} · 30 min · Video call</p>
  <hr style="border:none;border-top:1px solid #eee;margin-bottom:24px">

  <table style="width:100%;border-collapse:collapse;font-size:15px">
    <tr><td style="padding:8px 0;color:#888;width:140px;vertical-align:top">Name</td>
        <td style="padding:8px 0;font-weight:600">${data.name}</td></tr>
    <tr><td style="padding:8px 0;color:#888;vertical-align:top">Email</td>
        <td style="padding:8px 0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
    <tr><td style="padding:8px 0;color:#888;vertical-align:top">Startup</td>
        <td style="padding:8px 0">${data.startup}</td></tr>
    <tr><td style="padding:8px 0;color:#888;vertical-align:top">UX Challenge</td>
        <td style="padding:8px 0">${data.challenge}</td></tr>
    <tr><td style="padding:8px 0;color:#888;vertical-align:top">Revenue / Funding</td>
        <td style="padding:8px 0">${data.revenue}</td></tr>
    ${data.resource ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top">Resource</td>
        <td style="padding:8px 0">${data.resource}</td></tr>` : ""}
  </table>
</body>
</html>`;
}

function confirmationHtml(data: BookingPayload) {
  const label   = buildDateLabel(data.date, data.slot);
  const gcalUrl = buildGCalLink(data.date, data.slot);
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;max-width:560px;margin:40px auto;color:#111;line-height:1.6">
  <h2 style="margin:0 0 4px">You're booked! 🎉</h2>
  <p style="margin:0 0 24px;color:#666;font-size:14px">UX Growth Strategy Call · ${label} · 30 min</p>
  <hr style="border:none;border-top:1px solid #eee;margin-bottom:24px">

  <p>Hi ${data.name},</p>
  <p>Thanks for reaching out. We've received your booking request and Sagi will confirm your slot shortly with a calendar invite.</p>
  <p>In the meantime you can add a placeholder to your calendar:</p>

  <a href="${gcalUrl}"
     style="display:inline-block;margin:16px 0;padding:12px 24px;background:#d90cb7;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">
    + Add to Google Calendar
  </a>

  <p style="color:#888;font-size:13px">See you soon!<br>Contrast Studio</p>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const data: BookingPayload = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.startup || !data.challenge || !data.revenue) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Dev fallback, log and succeed so the UI can be tested without email setup
      console.log("[book] No RESEND_API_KEY. Booking payload:", data);
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(apiKey);
    const from   = process.env.FROM_EMAIL || "Contrast Studio <onboarding@resend.dev>";
    const notify = process.env.NOTIFY_EMAIL || "tonigalliano8@gmail.com";

    // Fire both emails concurrently
    await Promise.all([
      resend.emails.send({
        from,
        to: notify,
        subject: `New booking: ${data.name} · ${data.slot} · ${MONTHS[data.date.month]} ${data.date.day}`,
        html: notificationHtml(data),
      }),
      resend.emails.send({
        from,
        to: data.email,
        subject: "Your UX Strategy Call is confirmed!",
        html: confirmationHtml(data),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[book] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
