import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RevalidatePayload = {
  _type?: string;
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

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  if (payload._type === "post" && payload.slug?.current) {
    revalidatePath(`/blog/${payload.slug.current}`);
  }

  return NextResponse.json({
    revalidated: true,
    now: new Date().toISOString(),
  });
}
