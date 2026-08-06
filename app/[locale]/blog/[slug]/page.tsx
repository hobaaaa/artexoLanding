import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import LanguageSwitcher from "../../../../components/language/language-switcher";
import PortableText from "../../../../components/portable-text";
import Footer from "../../../../components/sections/footer/default";
import Navbar from "../../../../components/sections/navbar/default";
import { Badge } from "../../../../components/ui/badge";
import { LayoutLines } from "../../../../components/ui/layout-lines";
import { Section } from "../../../../components/ui/section";
import { siteConfig } from "../../../../config/site";
import { blogDictionary } from "../../../../dictionaries/blog";
import { getAlternateLanguages, getLocalizedPath, isLocale, type Locale,locales } from "../../../../dictionaries/i18n";
import { getBlogPost, getBlogSlugs } from "../../../../sanity/fetch";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
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

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getBlogSlugs(locale);
      return slugs.map((item) => ({ locale, slug: item.slug }));
    }),
  );

  return params.flat();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = blogDictionary[locale];
  const post = await getBlogPost(locale, slug);

  if (!post) {
    return {
      title: t.detail.fallbackTitle,
    };
  }

  const path = getLocalizedPath(locale, `/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: path,
      languages: getAlternateLanguages(`/blog/${post.slug}`),
    },
    openGraph: {
      type: "article",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `${siteConfig.url}${path}`,
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.asset?.url
        ? [
            {
              url: post.coverImage.asset.url,
              alt:
                post.coverImage.alt ||
                `${post.title} artexoApp online appointment scheduling blog image`,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = blogDictionary[locale];
  const post = await getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

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
        <article className="mx-auto max-w-4xl">
          <Link href={blogPath} className="mb-8 inline-flex text-sm font-medium text-brand">
            {t.detail.back}
          </Link>
          <Badge variant="outline" className="mb-5">
            {formatDate(post.publishedAt, locale) || t.detail.fallbackBadge}
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-xl leading-8 text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          {post.coverImage?.asset?.url && (
            <Image
              src={post.coverImage.asset.url}
              alt={
                post.coverImage.alt ||
                `${post.title} artexoApp online appointment scheduling blog cover image`
              }
              width={post.coverImage.asset.metadata?.dimensions?.width || 1536}
              height={post.coverImage.asset.metadata?.dimensions?.height || 1024}
              className="my-10 aspect-[3/2] w-full rounded-md bg-muted/20 object-contain shadow-2xl"
            />
          )}
          <PortableText value={post.body} />
        </article>
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
