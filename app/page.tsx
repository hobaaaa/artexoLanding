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

import ContactForm from "../components/contact-form";
import Reveal from "../components/reveal";
import Footer from "../components/sections/footer/default";
import Navbar from "../components/sections/navbar/default";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { LayoutLines } from "../components/ui/layout-lines";
import { Section } from "../components/ui/section";

const navigationLinks = [
  { text: "Sorun ve Çözüm", href: "#cozum" },
  { text: "Özellikler", href: "#ozellikler" },
  { text: "Kimler İçin", href: "#kimler-icin" },
  { text: "Nasıl Çalışır", href: "#nasil-calisir" },
  { text: "Demo İste", href: "#iletisim" },
];

const features = [
  {
    title: "Kurulum Yok, Cebinizde Taşınan Güç",
    description:
      "Karmaşık bilgisayar programlarıyla uğraşmanız gerekmez. artexoApp'i telefonunuza bir mobil uygulama gibi saniyeler içinde ekleyin; evde, yolda veya işletmede tüm randevuları avucunuzun içinden izleyin.",
    icon: <MonitorSmartphoneIcon className="size-6" />,
  },
  {
    title: "Akıllı Personel ve Mesai Yönetimi",
    description:
      "Hangi personeliniz hangi saatte müsait? Kim hangi hizmeti veriyor? Sistem, personel takvimlerini birbirine karıştırmadan milimetrik şekilde yönetir.",
    icon: <UsersRoundIcon className="size-6" />,
  },
  {
    title: "Müşterilerinize Özel Randevu Sayfası",
    description:
      "İşletmenize özel, modern bir randevu linki verilir. Müşteri linke tıklar, hizmeti seçer, boş saati görür ve randevusunu saniyeler içinde kapatır.",
    icon: <CalendarCheck2Icon className="size-6" />,
  },
  {
    title: "%100 Güvenli ve İzole Altyapı",
    description:
      "Müşteri kayıtlarınız, geçmiş randevularınız ve işletme ayarlarınız size özel, izole ve güvenli bir alanda saklanır.",
    icon: <ShieldCheckIcon className="size-6" />,
  },
];

const audiences = [
  {
    title: "Kuaför ve Berberler",
    text: "Yoğun saatlerde telefonu susturur, personel bazlı randevu akışını netleştirir.",
  },
  {
    title: "Güzellik Merkezleri",
    text: "Cilt bakımı, lazer, manikür ve paket hizmetlerde boş saatleri otomatik gösterir.",
  },
  {
    title: "Klinik ve Danışmanlar",
    text: "Psikolog, diyetisyen ve hekim randevularında güvenli ve düzenli takip sağlar.",
  },
  {
    title: "Büyüyen Hizmet İşletmeleri",
    text: "Defter, WhatsApp ve telefon trafiğini tek, ölçülebilir randevu akışına dönüştürür.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "artexoApp",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "artexoApp; kuaförler, güzellik merkezleri, klinikler, psikologlar ve diyetisyenler için geliştirilmiş akıllı online randevu platformudur.",
};

function ArtexoLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/artexo-logo.png"
      alt="artexoApp"
      width={220}
      height={88}
      priority
      className={className}
    />
  );
}

function AppointmentPreview() {
  return (
    <div className="w-full rounded-xl border bg-card p-4 text-card-foreground shadow-2xl sm:p-5">
      <div className="mb-5 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/artexo-icon.png"
            alt="artexoApp ikon"
            width={44}
            height={44}
            className="rounded-md"
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Güneş Güzellik Merkezi
            </p>
            <h2 className="text-xl font-semibold">Bugünün randevuları</h2>
          </div>
        </div>
        <Badge variant="outline" className="hidden sm:inline-flex">
          7/24 açık
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          {[
            ["10:30", "Saç kesim", "Ayşe K.", "Onaylandı"],
            ["12:00", "Cilt bakımı", "Merve T.", "Yeni talep"],
            ["15:30", "Diyetisyen görüşmesi", "Emre A.", "Hatırlatıldı"],
          ].map(([time, service, customer, status]) => (
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
                  <div className="text-sm text-muted-foreground">
                    {customer}
                  </div>
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
              <div className="font-medium">Müsait saatler</div>
              <div className="text-sm text-muted-foreground">
                Müşteri tarafından görülür
              </div>
            </div>
            <Clock3Icon className="size-5 text-brand" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["09:30", "11:00", "13:30", "16:00", "17:30", "18:00"].map(
              (slot) => (
                <div
                  key={slot}
                  className="rounded-md border bg-card px-3 py-3 text-center text-sm font-medium"
                >
                  {slot}
                </div>
              ),
            )}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Telefon açmadan, defter karıştırmadan, boş saatler otomatik
            güncellenir.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LayoutLines />
      <Navbar
        logo={<ArtexoLogo className="h-16 w-auto md:h-20" />}
        name=""
        homeUrl="/"
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
            text: "Bize Ulaşın",
            href: "#iletisim",
            isButton: true,
            variant: "default",
          },
        ]}
      />

      <Section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
        <Reveal className="mx-auto flex max-w-container flex-col items-center gap-10 pt-10 text-center sm:gap-12">
          <Badge variant="outline" className="animate-appear">
            <PhoneCallIcon className="size-4 text-brand" />
            Telefon trafiğini azaltan akıllı randevu platformu
          </Badge>
          <div className="flex max-w-5xl flex-col items-center gap-5">
            <Image
              src="/artexo-logo.png"
              alt="artexoApp"
              width={300}
              height={120}
              priority
              className="h-auto w-72 sm:w-96"
            />
            <h1 className="animate-appear bg-linear-to-r from-foreground to-foreground bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl dark:to-muted-foreground sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight">
              Telefon Trafiğine Son Verin. Randevularınız Kendi Kendini
              Yönetsin!
            </h1>
            <p className="max-w-4xl text-lg leading-8 font-medium text-balance text-muted-foreground sm:text-xl">
              Salonunuzda, kliniğinizde veya merkezinizde müşterilerle
              ilgilenirken sürekli çalan telefonlardan yorulmadınız mı?
              artexoApp; kuaförler, güzellik merkezleri, hekimler ve
              diyetisyenler için geliştirilmiş yeni nesil bir akıllı randevu
              platformudur. Müşterileriniz müsait saatlerinizi görsün,
              randevusunu saniyeler içinde alsın, siz sadece işinize odaklanın.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#iletisim">
                  İşletmem İçin Hemen Satın Al / Demo İste
                  <ArrowRightIcon className="ml-1 size-4" />
                </a>
              </Button>
              <Button variant="glow" size="lg" asChild>
                <a href="#ozellikler">Nasıl Çalışır?</a>
              </Button>
            </div>
          </div>
          <div className="float-panel relative w-full pt-5">
            <AppointmentPreview />
          </div>
        </Reveal>
      </Section>

      <section id="cozum">
        <Section>
          <Reveal className="mx-auto grid max-w-container gap-5 lg:grid-cols-2">
            <article className="flow-card shine-border rounded-md border bg-card/60 p-7 shadow-xl">
              <div className="mb-4 flex items-center gap-2 font-semibold text-destructive">
                <BellRingIcon className="size-5" />
                Sorun ne?
              </div>
              <h2 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl">
                Kaçırdığınız her telefon, kaybedilen müşteri ve ciro demektir.
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Gün içinde randevu almak için arayan müşteriye dönemediğinizde
                o müşteri çoğu zaman başka işletmeye gider. Deftere yazılan
                randevuların karışması, çakışan saatler ve personel mesai
                takibi ise işletmenin bütün düzenini bozar.
              </p>
            </article>
            <article className="flow-card shine-border rounded-md border bg-card/60 p-7 shadow-xl">
              <div className="mb-4 flex items-center gap-2 font-semibold text-brand">
                <SparklesIcon className="size-5" />
                Çözüm artexoApp
              </div>
              <h2 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl">
                İşletmeniz 7/24 randevu alan dijital bir sekretere kavuşur.
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Siz müşterinizle ilgilenirken, mesai dışındayken veya uyurken
                bile artexoApp sizin yerinize müsait saatleri gösterir,
                randevuları toplar, onay sürecini düzenler ve takviminizi
                organize eder.
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
                İşletme sahibinin ihtiyacı olan net özellikler
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                Randevu, personel ve müşteri akışınızı tek sistemde toplayın.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="flow-card shine-border rounded-md border bg-card/60 p-7 shadow-xl"
                >
                  <div className="mb-5 text-brand">{feature.icon}</div>
                  <h3 className="mb-3 text-2xl font-semibold">
                    {feature.title}
                  </h3>
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
                Kimler için uygun?
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                Randevuyla çalışan her işletme için daha sakin bir operasyon.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                artexoApp, telefonla randevu alan ve personel saatlerini manuel
                takip eden işletmelerin günlük karmaşasını azaltmak için
                tasarlandı.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {audiences.map((audience) => (
                <article
                  key={audience.title}
                  className="flow-card rounded-md border bg-card/60 p-6 shadow-xl"
                >
                  <div className="mb-5 flex items-center gap-2">
                    <span className="pulse-dot size-2 rounded-full bg-brand" />
                    <span className="text-sm font-medium text-brand">
                      artexoApp
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {audience.title}
                  </h3>
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
                Nasıl çalışır?
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                Müşteri randevuyu alır, sistem takvimi düzenler, siz işinizi
                yaparsınız.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                artexoApp, küçük işletmeler için karmaşık bir yazılım değil;
                telefon trafiğini azaltan, randevu karmaşasını bitiren ve
                personel planını görünür yapan pratik bir satış aracıdır.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                "İşletmenize özel randevu sayfası hazırlanır.",
                "Hizmetleriniz, süreleriniz ve personel mesaileri tanımlanır.",
                "Müşteriler boş saatleri görerek kendi randevusunu oluşturur.",
                "Siz tüm randevuları panelden ve telefonunuzdan takip edersiniz.",
              ].map((step, index) => (
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

      <section id="iletisim">
        <Section className="group relative overflow-hidden">
          <Reveal className="relative z-10 mx-auto grid max-w-container gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-4">
                Demo ve satın alma
              </Badge>
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                İşletmenizi Dijital Çağa Taşımaya Hazır mısınız?
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Sınırlı sayıdaki öncelikli işletme arasında yerinizi alın.
                Formu doldurun veya bizimle doğrudan iletişime geçin,
                sisteminizi aynı gün içinde teslim edelim.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="mailto:info@artexo.app?subject=artexoApp%20demo%20talebi"
                  className="flex items-center gap-3 font-medium text-foreground"
                >
                  <MailIcon className="size-5 text-brand" />
                  info@artexo.app
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LockKeyholeIcon className="size-5 text-brand" />
                  Bilgileriniz yalnızca demo talebiniz için kullanılır.
                </div>
              </div>
            </div>

            <ContactForm />
          </Reveal>
        </Section>
      </section>

      <Footer
        logo={<ArtexoLogo className="h-24 w-auto lg:h-28" />}
        name=""
        columns={[
          {
            title: "artexoApp",
            links: [
              { text: "Sorun ve Çözüm", href: "#cozum" },
              { text: "Özellikler", href: "#ozellikler" },
              { text: "Nasıl Çalışır", href: "#nasil-calisir" },
            ],
          },
          {
            title: "İşletmeler",
            links: [
              { text: "Kuaför ve Berberler", href: "#ozellikler" },
              { text: "Güzellik Merkezleri", href: "#ozellikler" },
              { text: "Klinik ve Danışmanlar", href: "#ozellikler" },
            ],
          },
          {
            title: "İletişim",
            links: [
              { text: "Demo Talebi", href: "#iletisim" },
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
