import {
  ArrowRightIcon,
  BellRingIcon,
  CalendarCheck2Icon,
  CheckCircle2Icon,
  Clock3Icon,
  LockKeyholeIcon,
  MailIcon,
  MonitorSmartphoneIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react";
import Image from "next/image";

import { siteConfig } from "../config/site";
import { getLocalizedPath,type Locale } from "../dictionaries/i18n";
import { type LandingDictionary } from "../dictionaries/landing";
import type { BlogPost } from "../sanity/fetch";
import BlogCard from "./blog-card";
import ContactForm from "./contact-form";
import LanguageSwitcher from "./language/language-switcher";
import Reveal from "./reveal";
import Footer from "./sections/footer/default";
import Navbar from "./sections/navbar/default";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LayoutLines } from "./ui/layout-lines";
import { Section } from "./ui/section";

const featureIcons = [
  <MonitorSmartphoneIcon key="mobile" className="size-6" />,
  <UsersRoundIcon key="users" className="size-6" />,
  <CalendarCheck2Icon key="calendar" className="size-6" />,
  <ShieldCheckIcon key="shield" className="size-6" />,
];

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

function getNavigationLinks(locale: Locale, t: LandingDictionary) {
  const home = getLocalizedPath(locale);

  return [
    { text: t.nav.problem, href: `${home}#cozum` },
    { text: t.nav.features, href: `${home}#ozellikler` },
    { text: t.nav.audience, href: `${home}#kimler-icin` },
    { text: t.nav.howItWorks, href: `${home}#nasil-calisir` },
    { text: t.nav.blog, href: getLocalizedPath(locale, "/blog") },
    { text: t.nav.demo, href: `${home}#iletisim` },
  ];
}

function AppointmentPreview({ t }: { t: LandingDictionary }) {
  return (
    <div className="w-full rounded-xl border bg-card p-4 text-card-foreground shadow-2xl sm:p-5">
      <div className="mb-5 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/artexo-icon.png"
            alt={t.preview.logoAlt}
            width={44}
            height={44}
            className="rounded-md"
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t.preview.business}
            </p>
            <h2 className="text-xl font-semibold">{t.preview.title}</h2>
          </div>
        </div>
        <Badge variant="outline" className="hidden sm:inline-flex">
          {t.preview.badge}
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          {t.preview.appointments.map(([time, service, customer, status]) => (
            <div
              key={`${time}-${customer}`}
              className="flex items-center justify-between gap-3 rounded-md border bg-background/60 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-brand/10 px-3 py-2 text-sm font-semibold text-brand">
                  {time}
                </div>
                <div>
                  <div className="font-medium">{service}</div>
                  <div className="text-sm text-muted-foreground">{customer}</div>
                </div>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {status}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-md border bg-background/60 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{t.preview.availableTitle}</div>
              <div className="text-sm text-muted-foreground">
                {t.preview.availableSubtitle}
              </div>
            </div>
            <Clock3Icon className="size-5 text-brand" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {t.preview.slots.map((slot) => (
              <div
                key={slot}
                className="rounded-md border bg-card px-3 py-3 text-center text-sm font-medium"
              >
                {slot}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t.preview.note}</p>
        </div>
      </div>
    </div>
  );
}

function StructuredData({ locale, t }: { locale: Locale; t: LandingDictionary }) {
  const url = `${siteConfig.url}${getLocalizedPath(locale)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "artexoApp",
        url: siteConfig.url,
        logo: `${siteConfig.url}/artexo-logo.png`,
        email: "info@artexo.app",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: "artexoApp",
        url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: t.seo.inLanguage,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: "artexoApp",
        url,
        image: `${siteConfig.url}/artexo-logo.png`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "OnlineAppointmentScheduling",
        operatingSystem: "Web, iOS, Android",
        description: t.seo.description,
        provider: { "@id": `${siteConfig.url}/#organization` },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: `${url}#iletisim`,
        },
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#service`,
        name: "artexoApp B2B Online Appointment Service",
        serviceType: "B2B online appointment and staff schedule management software",
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: { "@type": "Place", name: t.seo.areaServed },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Appointment-based service businesses",
        },
        url: `${url}#iletisim`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function LandingPage({
  locale,
  t,
  latestPosts,
}: {
  locale: Locale;
  t: LandingDictionary;
  latestPosts: BlogPost[];
}) {
  const homePath = getLocalizedPath(locale);
  const blogPath = getLocalizedPath(locale, "/blog");
  const navigationLinks = getNavigationLinks(locale, t);

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <StructuredData locale={locale} t={t} />
      <LayoutLines />
      <Navbar
        logo={<ArtexoLogo className="h-16 w-auto md:h-20" alt={t.hero.logoAlt} />}
        name=""
        homeUrl={homePath}
        mobileLinks={navigationLinks}
        customNavigation={
          <nav className="hidden items-center gap-6 md:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.text}
              </a>
            ))}
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

      <Section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
        <Reveal className="mx-auto flex max-w-container flex-col items-center gap-10 pt-10 text-center sm:gap-12">
          <Badge variant="outline" className="animate-appear">
            <PhoneCallIcon className="size-4 text-brand" />
            {t.hero.badge}
          </Badge>
          <div className="flex max-w-5xl flex-col items-center gap-5">
            <Image
              src="/artexo-logo.png"
              alt={t.hero.logoAlt}
              width={300}
              height={120}
              priority
              className="h-auto w-72 sm:w-96"
            />
            <h1 className="animate-appear bg-linear-to-r from-foreground to-foreground bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl dark:to-muted-foreground sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight">
              {t.hero.title}
            </h1>
            <p className="max-w-4xl text-lg leading-8 font-medium text-balance text-muted-foreground sm:text-xl">
              {t.hero.description}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#iletisim">
                  {t.hero.primaryCta}
                  <ArrowRightIcon className="ml-1 size-4" />
                </a>
              </Button>
              <Button variant="glow" size="lg" asChild>
                <a href="#ozellikler">{t.hero.secondaryCta}</a>
              </Button>
            </div>
          </div>
          <div className="float-panel relative w-full pt-5">
            <AppointmentPreview t={t} />
          </div>
        </Reveal>
      </Section>

      <section id="cozum">
        <Section>
          <Reveal className="mx-auto grid max-w-container gap-5 lg:grid-cols-2">
            <article className="flow-card shine-border rounded-md border bg-card/60 p-7 shadow-xl">
              <div className="mb-4 flex items-center gap-2 font-semibold text-destructive">
                <BellRingIcon className="size-5" />
                {t.problem.label}
              </div>
              <h2 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl">
                {t.problem.title}
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                {t.problem.text}
              </p>
            </article>
            <article className="flow-card shine-border rounded-md border bg-card/60 p-7 shadow-xl">
              <div className="mb-4 flex items-center gap-2 font-semibold text-brand">
                <SparklesIcon className="size-5" />
                {t.solution.label}
              </div>
              <h2 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl">
                {t.solution.title}
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                {t.solution.text}
              </p>
            </article>
          </Reveal>
        </Section>
      </section>

      <section id="ozellikler">
        <Section>
          <Reveal className="mx-auto flex max-w-container flex-col gap-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-4">
                {t.features.label}
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {t.features.title}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.features.items.map((feature, index) => (
                <article
                  key={feature.title}
                  className="flow-card shine-border rounded-md border bg-card/60 p-7 shadow-xl"
                >
                  <div className="mb-5 text-brand">{featureIcons[index]}</div>
                  <h3 className="mb-3 text-2xl font-semibold">{feature.title}</h3>
                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </Section>
      </section>

      <section id="kimler-icin">
        <Section>
          <Reveal className="mx-auto flex max-w-container flex-col gap-9">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-4">
                {t.audience.label}
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {t.audience.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {t.audience.text}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {t.audience.items.map((audience) => (
                <article
                  key={audience.title}
                  className="flow-card rounded-md border bg-card/60 p-6 shadow-xl"
                >
                  <div className="mb-5 flex items-center gap-2">
                    <span className="pulse-dot size-2 rounded-full bg-brand" />
                    <span className="text-sm font-medium text-brand">artexoApp</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{audience.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {audience.text}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </Section>
      </section>

      <section id="nasil-calisir">
        <Section>
          <Reveal className="mx-auto grid max-w-container gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-4">
                {t.howItWorks.label}
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {t.howItWorks.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {t.howItWorks.text}
              </p>
            </div>
            <div className="grid gap-3">
              {t.howItWorks.steps.map((step, index) => (
                <div
                  key={step}
                  className="flow-card flex gap-4 rounded-md border bg-card/60 p-5 shadow-xl"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand/10 font-semibold text-brand">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2Icon className="size-5 shrink-0 text-brand" />
                    <p className="font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      </section>

      {latestPosts.length > 0 && (
        <section id="blog">
          <Section>
            <Reveal className="mx-auto flex max-w-container flex-col gap-9">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="outline" className="mb-4">
                  {t.blog.label}
                </Badge>
                <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                  {t.blog.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  {t.blog.text}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <BlogCard key={post._id} post={post} locale={locale} text={t.blog} />
                ))}
              </div>
            </Reveal>
          </Section>
        </section>
      )}

      <section id="iletisim">
        <Section className="group relative overflow-hidden">
          <Reveal className="relative z-10 mx-auto grid max-w-container gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-4">
                {t.contact.label}
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {t.contact.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {t.contact.text}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="mailto:info@artexo.app?subject=artexoApp%20demo%20request"
                  className="flex items-center gap-3 font-medium text-foreground"
                >
                  <MailIcon className="size-5 text-brand" />
                  info@artexo.app
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LockKeyholeIcon className="size-5 text-brand" />
                  {t.contact.privacy}
                </div>
              </div>
            </div>

            <ContactForm text={t.form} />
          </Reveal>
        </Section>
      </section>

      <Footer
        logo={<ArtexoLogo className="h-24 w-auto lg:h-28" alt={t.hero.logoAlt} />}
        name=""
        columns={[
          {
            title: t.footer.company,
            links: [
              { text: t.nav.problem, href: `${homePath}#cozum` },
              { text: t.nav.features, href: `${homePath}#ozellikler` },
              { text: t.nav.blog, href: blogPath },
              { text: t.nav.howItWorks, href: `${homePath}#nasil-calisir` },
            ],
          },
          {
            title: t.footer.businesses,
            links: t.audience.items.slice(0, 3).map((item) => ({
              text: item.title,
              href: `${homePath}#ozellikler`,
            })),
          },
          {
            title: t.footer.contact,
            links: [
              { text: t.nav.demo, href: `${homePath}#iletisim` },
              { text: "info@artexo.app", href: "mailto:info@artexo.app" },
            ],
          },
        ]}
        copyright={t.footer.copyright}
        policies={[]}
        showModeToggle
      />
    </main>
  );
}
