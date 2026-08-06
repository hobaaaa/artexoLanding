import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { isLocale } from "../dictionaries/i18n";

function detectLocale(acceptLanguage: string | null) {
  return acceptLanguage?.toLowerCase().startsWith("tr") ? "tr" : "en";
}

export default async function RootPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("artexo-locale")?.value;
  const locale = isLocale(localeCookie || "")
    ? localeCookie
    : detectLocale(headerList.get("accept-language"));

  redirect(`/${locale}`);
}
