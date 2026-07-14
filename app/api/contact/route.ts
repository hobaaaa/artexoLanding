import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = "info@artexo.app";
const FROM_EMAIL = "artexoApp <info@artexo.app>";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Form gönderimi şu anda yapılandırılmamış." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { message: "Geçersiz form verisi." },
      { status: 400 },
    );
  }

  const honeypot = clean((body as Record<string, unknown>).company);

  if (honeypot) {
    return NextResponse.json({ message: "Talebiniz alındı." });
  }

  const name = clean((body as Record<string, unknown>).name);
  const phone = clean((body as Record<string, unknown>).phone);
  const businessType = clean((body as Record<string, unknown>).businessType);
  const businessName = clean((body as Record<string, unknown>).businessName);
  const note = clean((body as Record<string, unknown>).note);
  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeBusinessType = escapeHtml(businessType);
  const safeBusinessName = escapeHtml(businessName || "-");
  const safeNote = escapeHtml(note || "-");

  if (!name || !phone || !businessType) {
    return NextResponse.json(
      { message: "Lütfen ad soyad, telefon ve işletme türünü doldurun." },
      { status: 400 },
    );
  }

  const html = `
    <h2>Yeni artexoApp demo talebi</h2>
    <p><strong>Ad Soyad:</strong> ${safeName}</p>
    <p><strong>Telefon:</strong> ${safePhone}</p>
    <p><strong>İşletme Türü:</strong> ${safeBusinessType}</p>
    <p><strong>İşletme Adı:</strong> ${safeBusinessName}</p>
    <p><strong>Not:</strong></p>
    <p>${safeNote}</p>
  `;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: TO_EMAIL,
      subject: `artexoApp demo talebi - ${name}`,
      html,
      text: [
        "Yeni artexoApp demo talebi",
        `Ad Soyad: ${name}`,
        `Telefon: ${phone}`,
        `İşletme Türü: ${businessType}`,
        `İşletme Adı: ${businessName || "-"}`,
        `Not: ${note || "-"}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Form gönderilemedi. Lütfen tekrar deneyin." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Demo talebiniz alındı. En kısa sürede size dönüş yapacağız.",
  });
}
