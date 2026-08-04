import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableText from "../../../components/portable-text";
import Footer from "../../../components/sections/footer/default";
import Navbar from "../../../components/sections/navbar/default";
import { Badge } from "../../../components/ui/badge";
import { LayoutLines } from "../../../components/ui/layout-lines";
import { Section } from "../../../components/ui/section";
import { siteConfig } from "../../../config/site";
import { getBlogPost, getBlogSlugs } from "../../../sanity/fetch";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(value?: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function ArtexoLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/artexo-logo.png"
      alt="artexoApp online randevu sistemi blog logosu"
      width={220}
      height={88}
      priority
      className={className}
    />
  );
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog yazısı bulunamadı",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.asset?.url
        ? [
            {
              url: post.coverImage.asset.url,
              alt:
                post.coverImage.alt ||
                `${post.title} artexoApp online randevu sistemi blog görseli`,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <LayoutLines />
      <Navbar
        logo={<ArtexoLogo className="h-16 w-auto md:h-20" />}
        name=""
        homeUrl="/"
        mobileLinks={[
          { text: "Ana Sayfa", href: "/" },
          { text: "Blog", href: "/blog" },
          { text: "Demo İste", href: "/#iletisim" },
        ]}
        customNavigation={
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/#iletisim"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Demo İste
            </Link>
          </nav>
        }
        actions={[
          {
            text: "Bize Ulaşın",
            href: "/#iletisim",
            isButton: true,
            variant: "default",
          },
        ]}
      />

      <Section>
        <article className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex text-sm font-medium text-brand"
          >
            Bloga dön
          </Link>
          <Badge variant="outline" className="mb-5">
            {formatDate(post.publishedAt) || "artexoApp Blog"}
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
                `${post.title} artexoApp online randevu sistemi blog kapak görseli`
              }
              width={post.coverImage.asset.metadata?.dimensions?.width || 1200}
              height={post.coverImage.asset.metadata?.dimensions?.height || 675}
              className="my-10 aspect-[16/9] w-full rounded-md object-cover shadow-2xl"
            />
          )}
          <PortableText value={post.body} />
        </article>
      </Section>

      <Footer
        logo={<ArtexoLogo className="h-24 w-auto lg:h-28" />}
        name=""
        columns={[
          {
            title: "artexoApp",
            links: [
              { text: "Ana Sayfa", href: "/" },
              { text: "Blog", href: "/blog" },
              { text: "Demo Talebi", href: "/#iletisim" },
            ],
          },
          {
            title: "İşletmeler",
            links: [
              { text: "Kuaför ve Berberler", href: "/#ozellikler" },
              { text: "Güzellik Merkezleri", href: "/#ozellikler" },
              { text: "Klinik ve Danışmanlar", href: "/#ozellikler" },
            ],
          },
          {
            title: "İletişim",
            links: [
              { text: "info@artexo.app", href: "mailto:info@artexo.app" },
            ],
          },
        ]}
        copyright="© 2026 artexoApp. Tüm hakları saklıdır."
        policies={[]}
        showModeToggle
      />
    </main>
  );
}
