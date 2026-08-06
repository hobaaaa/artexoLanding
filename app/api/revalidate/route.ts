import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isLocale, type Locale,locales } from "../../../dictionaries/i18n";

type RevalidatePayload = {
  _type?: string;
  language?: string;
  slug?: {
    current?: string;
  };
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const providedSecret = request.headers.get("x-revalidate-secret");

  if (!secret || providedSecret !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  let payload: RevalidatePayload = {};

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    payload = {};
  }

  const targetLocales: Locale[] = isLocale(payload.language || "")
    ? [payload.language as Locale]
    : [...locales];

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  for (const locale of targetLocales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/blog`);

    if (payload._type === "post" && payload.slug?.current) {
      revalidatePath(`/${locale}/blog/${payload.slug.current}`);
    }
  }

  return NextResponse.json({
    revalidated: true,
    now: new Date().toISOString(),
  });
}
