import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogCard from "../../../components/blog-card";
import LanguageSwitcher from "../../../components/language/language-switcher";
import Footer from "../../../components/sections/footer/default";
import Navbar from "../../../components/sections/navbar/default";
import { Badge } from "../../../components/ui/badge";
import { LayoutLines } from "../../../components/ui/layout-lines";
import { Section } from "../../../components/ui/section";
import { siteConfig } from "../../../config/site";
import { blogDictionary } from "../../../dictionaries/blog";
import { getAlternateLanguages, getLocalizedPath, isLocale, type Locale } from "../../../dictionaries/i18n";
import { getBlogPosts } from "../../../sanity/fetch";

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

function ArtexoLogo({ className = "", alt }: { className?: string; alt: string }) {
  return (
    <Image
      src="/artexo-logo.png"
      alt={alt}
      width={220}
      height={88}
      priority
      className={className}
    />
  );
}

function getFooterColumns(locale: Locale, t: (typeof blogDictionary)[Locale]) {
  return [
    {
      title: t.footer.company,
      links: [
        { text: t.nav.home, href: getLocalizedPath(locale) },
        { text: t.nav.blog, href: getLocalizedPath(locale, "/blog") },
        { text: t.footer.demo, href: `${getLocalizedPath(locale)}#iletisim` },
      ],
    },
    {
      title: t.footer.businesses,
      links: [
        { text: t.footer.barber, href: `${getLocalizedPath(locale)}#ozellikler` },
        { text: t.footer.beauty, href: `${getLocalizedPath(locale)}#ozellikler` },
        { text: t.footer.clinic, href: `${getLocalizedPath(locale)}#ozellikler` },
      ],
    },
    {
      title: t.footer.contact,
      links: [{ text: "info@artexo.app", href: "mailto:info@artexo.app" }],
    },
  ];
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = blogDictionary[locale];
  const path = getLocalizedPath(locale, "/blog");

  return {
    title: t.list.metaTitle,
    description: t.list.metaDescription,
    alternates: {
      canonical: path,
      languages: getAlternateLanguages("/blog"),
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `${siteConfig.url}${path}`,
      title: t.list.metaTitle,
      description: t.list.metaDescription,
      siteName: siteConfig.name,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = blogDictionary[locale];
  const posts = await getBlogPosts(locale);
  const homePath = getLocalizedPath(locale);
  const blogPath = getLocalizedPath(locale, "/blog");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <LayoutLines />
      <Navbar
        logo={<ArtexoLogo className="h-16 w-auto md:h-20" alt={t.logoAlt} />}
        name=""
        homeUrl={homePath}
        mobileLinks={[
          { text: t.nav.home, href: homePath },
          { text: t.nav.blog, href: blogPath },
          { text: t.nav.demo, href: `${homePath}#iletisim` },
        ]}
        customNavigation={
          <nav className="hidden items-center gap-6 md:flex">
            <Link href={homePath} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {t.nav.home}
            </Link>
            <Link href={blogPath} className="text-sm font-medium text-foreground">
              {t.nav.blog}
            </Link>
            <Link href={`${homePath}#iletisim`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {t.nav.demo}
            </Link>
          </nav>
        }
        actions={[
          {
            text: t.nav.contact,
            href: `${homePath}#iletisim`,
            isButton: true,
            variant: "default",
          },
        ]}
        rightSlot={<LanguageSwitcher locale={locale} />}
      />

      <Section>
        <div className="mx-auto flex max-w-container flex-col gap-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-5">
              {t.list.badge}
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
              {t.list.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {t.list.description}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} locale={locale} text={t.list} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border bg-card/60 p-8 shadow-xl">
              <h2 className="text-2xl font-semibold">{t.list.emptyTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.list.emptyText}</p>
            </div>
          )}
        </div>
      </Section>

      <Footer
        logo={<ArtexoLogo className="h-24 w-auto lg:h-28" alt={t.logoAlt} />}
        name=""
        columns={getFooterColumns(locale, t)}
        copyright={t.footer.copyright}
        policies={[]}
        showModeToggle
      />
    </main>
  );
}
