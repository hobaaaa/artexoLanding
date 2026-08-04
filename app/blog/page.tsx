import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BlogCard from "../../components/blog-card";
import Footer from "../../components/sections/footer/default";
import Navbar from "../../components/sections/navbar/default";
import { Badge } from "../../components/ui/badge";
import { LayoutLines } from "../../components/ui/layout-lines";
import { Section } from "../../components/ui/section";
import { siteConfig } from "../../config/site";
import { getBlogPosts } from "../../sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "artexoApp blog; online randevu sistemi, işletme yönetimi, personel mesai planlama ve hizmet işletmeleri için dijitalleşme rehberleri.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

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

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
        <div className="mx-auto flex max-w-container flex-col gap-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-5">
              artexoApp Blog
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
              Randevu, işletme yönetimi ve dijital büyüme rehberleri
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Kuaförler, güzellik merkezleri, klinikler ve danışmanlık
              işletmeleri için daha düzenli randevu akışı ve daha güçlü müşteri
              deneyimi üzerine içerikler.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border bg-card/60 p-8 shadow-xl">
              <h2 className="text-2xl font-semibold">Blog yazıları hazırlanıyor.</h2>
              <p className="mt-3 text-muted-foreground">
                İlk içerikler yayına alındığında bu sayfada listelenecek.
              </p>
            </div>
          )}
        </div>
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
