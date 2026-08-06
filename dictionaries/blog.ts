import type { Locale } from "./i18n";

export const blogDictionary = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      blog: "Blog",
      demo: "Demo İste",
      contact: "Bize Ulaşın",
    },
    list: {
      badge: "artexoApp Blog",
      title: "Randevu, işletme yönetimi ve dijital büyüme rehberleri",
      description:
        "Kuaförler, güzellik merkezleri, klinikler ve danışmanlık işletmeleri için daha düzenli randevu akışı ve daha güçlü müşteri deneyimi üzerine içerikler.",
      emptyTitle: "Blog yazıları hazırlanıyor.",
      emptyText: "İlk içerikler yayına alındığında bu sayfada listelenecek.",
      read: "Yazıyı oku",
      soon: "Yakında",
      metaTitle: "Blog",
      metaDescription:
        "artexoApp blog; online randevu sistemi, işletme yönetimi, personel mesai planlama ve hizmet işletmeleri için dijitalleşme rehberleri.",
    },
    detail: {
      back: "Bloga dön",
      fallbackTitle: "Blog yazısı bulunamadı",
      fallbackBadge: "artexoApp Blog",
    },
    footer: {
      company: "artexoApp",
      businesses: "İşletmeler",
      contact: "İletişim",
      copyright: "© 2026 artexoApp. Tüm hakları saklıdır.",
      barber: "Kuaför ve Berberler",
      beauty: "Güzellik Merkezleri",
      clinic: "Klinik ve Danışmanlar",
      demo: "Demo Talebi",
    },
    logoAlt: "artexoApp online randevu sistemi blog logosu",
  },
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      demo: "Request Demo",
      contact: "Contact Us",
    },
    list: {
      badge: "artexoApp Blog",
      title: "Appointment, business management, and digital growth guides",
      description:
        "Content for salons, beauty centers, clinics, and consulting businesses that want cleaner appointment flow and stronger customer experience.",
      emptyTitle: "Blog articles are being prepared.",
      emptyText: "The first articles will appear here when they are published.",
      read: "Read article",
      soon: "Soon",
      metaTitle: "Blog",
      metaDescription:
        "The artexoApp blog covers online appointment scheduling, business management, staff planning, and digital growth for service businesses.",
    },
    detail: {
      back: "Back to blog",
      fallbackTitle: "Blog article not found",
      fallbackBadge: "artexoApp Blog",
    },
    footer: {
      company: "artexoApp",
      businesses: "Businesses",
      contact: "Contact",
      copyright: "© 2026 artexoApp. All rights reserved.",
      barber: "Barbers and Hair Salons",
      beauty: "Beauty Centers",
      clinic: "Clinics and Consultants",
      demo: "Demo Request",
    },
    logoAlt: "artexoApp online appointment scheduling blog logo",
  },
} satisfies Record<Locale, unknown>;

export type BlogDictionary = (typeof blogDictionary)[Locale];
