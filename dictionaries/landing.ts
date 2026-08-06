import type { Locale } from "./i18n";

export const landingDictionary = {
  tr: {
    localeName: "Türkçe",
    shortLocale: "TR",
    nav: {
      problem: "Sorun ve Çözüm",
      features: "Özellikler",
      audience: "Kimler İçin",
      howItWorks: "Nasıl Çalışır",
      blog: "Blog",
      demo: "Demo İste",
      contact: "Bize Ulaşın",
    },
    hero: {
      badge: "Telefon trafiğini azaltan akıllı randevu platformu",
      title: "Telefon Trafiğine Son Verin. Randevularınız Kendi Kendini Yönetsin!",
      description:
        "Salonunuzda, kliniğinizde veya merkezinizde müşterilerle ilgilenirken sürekli çalan telefonlardan yorulmadınız mı? artexoApp; kuaförler, güzellik merkezleri, hekimler ve diyetisyenler için geliştirilmiş yeni nesil bir akıllı randevu platformudur. Müşterileriniz müsait saatlerinizi görsün, randevusunu saniyeler içinde alsın, siz sadece işinize odaklanın.",
      primaryCta: "İşletmem İçin Hemen Satın Al / Demo İste",
      secondaryCta: "Nasıl Çalışır?",
      logoAlt: "artexoApp kuaför ve güzellik merkezi randevu sistemi logosu",
    },
    preview: {
      logoAlt: "artexoApp Güzellik Merkezi Randevu Paneli Önizlemesi",
      business: "Güneş Güzellik Merkezi",
      title: "Bugünün randevuları",
      badge: "7/24 açık",
      availableTitle: "Müsait saatler",
      availableSubtitle: "Müşteri tarafından görülür",
      note: "Telefon açmadan, defter karıştırmadan, boş saatler otomatik güncellenir.",
      appointments: [
        ["10:30", "Saç kesim", "Ayşe K.", "Onaylandı"],
        ["12:00", "Cilt bakımı", "Merve T.", "Yeni talep"],
        ["15:30", "Diyetisyen görüşmesi", "Emre A.", "Hatırlatıldı"],
      ],
      slots: ["09:30", "11:00", "13:30", "16:00", "17:30", "18:00"],
    },
    problem: {
      label: "Sorun ne?",
      title: "Kaçırdığınız her telefon, kaybedilen müşteri ve ciro demektir.",
      text: "Gün içinde randevu almak için arayan müşteriye dönemediğinizde o müşteri çoğu zaman başka işletmeye gider. Deftere yazılan randevuların karışması, çakışan saatler ve personel mesai takibi ise işletmenin bütün düzenini bozar.",
    },
    solution: {
      label: "Çözüm artexoApp",
      title: "İşletmeniz 7/24 randevu alan dijital bir sekretere kavuşur.",
      text: "Siz müşterinizle ilgilenirken, mesai dışındayken veya uyurken bile artexoApp sizin yerinize müsait saatleri gösterir, randevuları toplar, onay sürecini düzenler ve takviminizi organize eder.",
    },
    features: {
      label: "İşletme sahibinin ihtiyacı olan net özellikler",
      title: "Randevu, personel ve müşteri akışınızı tek sistemde toplayın.",
      items: [
        {
          title: "Kurulum Yok, Cebinizde Taşınan Güç",
          description:
            "Karmaşık bilgisayar programlarıyla uğraşmanız gerekmez. artexoApp'i telefonunuza bir mobil uygulama gibi saniyeler içinde ekleyin; evde, yolda veya işletmede tüm randevuları avucunuzun içinden izleyin.",
        },
        {
          title: "Akıllı Personel ve Mesai Yönetimi",
          description:
            "Hangi personeliniz hangi saatte müsait? Kim hangi hizmeti veriyor? Sistem, personel takvimlerini birbirine karıştırmadan milimetrik şekilde yönetir.",
        },
        {
          title: "Müşterilerinize Özel Randevu Sayfası",
          description:
            "İşletmenize özel, modern bir randevu linki verilir. Müşteri linke tıklar, hizmeti seçer, boş saati görür ve randevusunu saniyeler içinde kapatır.",
        },
        {
          title: "%100 Güvenli ve İzole Altyapı",
          description:
            "Müşteri kayıtlarınız, geçmiş randevularınız ve işletme ayarlarınız size özel, izole ve güvenli bir alanda saklanır.",
        },
      ],
    },
    audience: {
      label: "Kimler için uygun?",
      title: "Randevuyla çalışan her işletme için daha sakin bir operasyon.",
      text: "artexoApp, telefonla randevu alan ve personel saatlerini manuel takip eden işletmelerin günlük karmaşasını azaltmak için tasarlandı.",
      items: [
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
      ],
    },
    howItWorks: {
      label: "Nasıl çalışır?",
      title: "Müşteri randevuyu alır, sistem takvimi düzenler, siz işinizi yaparsınız.",
      text: "artexoApp, küçük işletmeler için karmaşık bir yazılım değil; telefon trafiğini azaltan, randevu karmaşasını bitiren ve personel planını görünür yapan pratik bir satış aracıdır.",
      steps: [
        "İşletmenize özel randevu sayfası hazırlanır.",
        "Hizmetleriniz, süreleriniz ve personel mesaileri tanımlanır.",
        "Müşteriler boş saatleri görerek kendi randevusunu oluşturur.",
        "Siz tüm randevuları panelden ve telefonunuzdan takip edersiniz.",
      ],
    },
    blog: {
      label: "artexoApp Blog",
      title: "Randevu ve işletme yönetimi için pratik büyüme rehberleri.",
      text: "Yeni yazılar yayınlandıkça burada öne çıkar; artexoApp ile dijital randevu akışını büyütmek isteyen işletmeler için uygulanabilir içerikler sunar.",
      read: "Yazıyı oku",
      soon: "Yakında",
    },
    contact: {
      label: "Demo ve satın alma",
      title: "İşletmenizi Dijital Çağa Taşımaya Hazır mısınız?",
      text: "Sınırlı sayıdaki öncelikli işletme arasında yerinizi alın. Formu doldurun veya bizimle doğrudan iletişime geçin, sisteminizi aynı gün içinde teslim edelim.",
      privacy: "Bilgileriniz yalnızca demo talebiniz için kullanılır.",
    },
    form: {
      name: "Ad Soyad",
      namePlaceholder: "Adınız Soyadınız",
      phone: "Telefon",
      phonePlaceholder: "05xx xxx xx xx",
      businessType: "İşletme Türü",
      businessTypePlaceholder: "Seçiniz",
      businessOptions: [
        "Berber / Kuaför",
        "Güzellik Merkezi",
        "Psikolog / Klinik",
        "Diyetisyen",
        "Diğer",
      ],
      businessName: "İşletme Adı",
      businessNamePlaceholder: "İşletmenizin adı",
      note: "Kısa Not",
      notePlaceholder: "Kaç personeliniz var, hangi hizmetleri veriyorsunuz?",
      submit: "Demo Talebi Gönder",
      sending: "Gönderiliyor",
      success: "Talep Alındı",
      successMessage: "Demo talebiniz alındı.",
      errorMessage: "Form gönderilemedi. Tekrar deneyin.",
    },
    footer: {
      company: "artexoApp",
      businesses: "İşletmeler",
      contact: "İletişim",
      copyright: "© 2026 artexoApp. Tüm hakları saklıdır.",
    },
    seo: {
      title: "artexoApp | Akıllı randevu ve işletme yönetimi platformu",
      description:
        "artexoApp; kuaförler, güzellik merkezleri, klinikler, psikologlar ve diyetisyenler için geliştirilmiş akıllı online randevu platformudur.",
      keywords: [
        "artexoApp",
        "online randevu sistemi",
        "kuaför randevu sistemi",
        "güzellik merkezi randevu",
        "klinik randevu programı",
        "personel mesai yönetimi",
      ],
      inLanguage: "tr-TR",
      areaServed: "Türkiye",
    },
  },
  en: {
    localeName: "English",
    shortLocale: "EN",
    nav: {
      problem: "Problem & Solution",
      features: "Features",
      audience: "Who It Helps",
      howItWorks: "How It Works",
      blog: "Blog",
      demo: "Request Demo",
      contact: "Contact Us",
    },
    hero: {
      badge: "Smart appointment platform that reduces phone traffic",
      title: "Stop Chasing Calls. Let Your Appointments Manage Themselves.",
      description:
        "Tired of constant phone calls while serving customers in your salon, clinic, or wellness center? artexoApp is a next-generation smart appointment platform built for barbers, salons, beauty centers, clinics, doctors, psychologists, and dietitians. Let customers see your available times, book in seconds, and let your team focus on the work.",
      primaryCta: "Buy / Request a Demo for My Business",
      secondaryCta: "How It Works",
      logoAlt: "artexoApp appointment scheduling platform logo for salons and clinics",
    },
    preview: {
      logoAlt: "artexoApp beauty center appointment dashboard preview",
      business: "Luna Beauty Center",
      title: "Today's appointments",
      badge: "Open 24/7",
      availableTitle: "Available slots",
      availableSubtitle: "Visible to customers",
      note: "Available times update automatically without phone calls, paper notebooks, or manual confusion.",
      appointments: [
        ["10:30", "Haircut", "Ava K.", "Confirmed"],
        ["12:00", "Skin care", "Mia T.", "New request"],
        ["15:30", "Dietitian session", "Leo A.", "Reminded"],
      ],
      slots: ["09:30", "11:00", "13:30", "16:00", "17:30", "18:00"],
    },
    problem: {
      label: "What is the problem?",
      title: "Every missed call can mean a lost customer and lost revenue.",
      text: "When you cannot answer customers calling to book an appointment, they often move to another business. Paper schedules, overlapping bookings, and manual staff planning create daily operational chaos.",
    },
    solution: {
      label: "The artexoApp solution",
      title: "Your business gets a digital receptionist that takes appointments 24/7.",
      text: "While you serve customers, after hours, or even while you sleep, artexoApp shows available times, collects appointment requests, supports confirmation flow, and keeps your calendar organized.",
    },
    features: {
      label: "Clear features business owners actually need",
      title: "Bring appointments, staff, and customer flow into one system.",
      items: [
        {
          title: "No Installation, Mobile-First Power",
          description:
            "Forget complicated desktop software. Add artexoApp to your phone like a mobile app in seconds and track appointments, staff schedules, and daily flow from anywhere.",
        },
        {
          title: "Smart Staff and Shift Management",
          description:
            "Which team member is available? Who provides which service? artexoApp keeps staff calendars separated and accurate so bookings stay clean.",
        },
        {
          title: "Your Branded Appointment Page",
          description:
            "Your business gets a modern appointment link with your own branding. Customers choose a service, find an open time, and complete the booking in seconds.",
        },
        {
          title: "Secure and Isolated Infrastructure",
          description:
            "Customer records, appointment history, and business settings are stored in a dedicated, secure environment designed for service businesses.",
        },
      ],
    },
    audience: {
      label: "Who is it for?",
      title: "A calmer operation for every appointment-based business.",
      text: "artexoApp is designed for businesses that still rely on phone calls, messages, and manual staff planning to manage appointments.",
      items: [
        {
          title: "Barbers and Hair Salons",
          text: "Reduce phone traffic during busy hours and keep staff-based bookings clear.",
        },
        {
          title: "Beauty Centers",
          text: "Show available times automatically for skin care, laser, manicure, packages, and recurring services.",
        },
        {
          title: "Clinics and Consultants",
          text: "Support psychologists, dietitians, doctors, and consultants with organized, secure appointment flow.",
        },
        {
          title: "Growing Service Businesses",
          text: "Turn phone, WhatsApp, and paper scheduling into one measurable booking flow.",
        },
      ],
    },
    howItWorks: {
      label: "How it works",
      title: "Customers book, the system organizes, your team keeps working.",
      text: "artexoApp is not complicated software for small businesses. It is a practical sales and operations tool that reduces calls, prevents scheduling confusion, and makes staff planning visible.",
      steps: [
        "A dedicated appointment page is prepared for your business.",
        "Your services, durations, and staff working hours are configured.",
        "Customers see open times and create their own appointments.",
        "You track all appointments from the panel and your phone.",
      ],
    },
    blog: {
      label: "artexoApp Blog",
      title: "Practical growth guides for appointment and business management.",
      text: "New articles appear here as they are published, with actionable content for businesses that want to grow their digital appointment flow with artexoApp.",
      read: "Read article",
      soon: "Soon",
    },
    contact: {
      label: "Demo and purchase",
      title: "Ready to Bring Your Business Into the Digital Age?",
      text: "Take your place among a limited number of priority businesses. Fill out the form or contact us directly and we can prepare your system within the same day.",
      privacy: "Your information is used only for your demo request.",
    },
    form: {
      name: "Full Name",
      namePlaceholder: "Your full name",
      phone: "Phone",
      phonePlaceholder: "+1 555 000 0000",
      businessType: "Business Type",
      businessTypePlaceholder: "Select",
      businessOptions: [
        "Barber / Hair Salon",
        "Beauty Center",
        "Psychologist / Clinic",
        "Dietitian",
        "Other",
      ],
      businessName: "Business Name",
      businessNamePlaceholder: "Your business name",
      note: "Short Note",
      notePlaceholder: "How many staff members do you have and which services do you offer?",
      submit: "Send Demo Request",
      sending: "Sending",
      success: "Request Received",
      successMessage: "Your demo request has been received.",
      errorMessage: "The form could not be sent. Please try again.",
    },
    footer: {
      company: "artexoApp",
      businesses: "Businesses",
      contact: "Contact",
      copyright: "© 2026 artexoApp. All rights reserved.",
    },
    seo: {
      title: "artexoApp | Smart appointment and business management platform",
      description:
        "artexoApp is a smart online appointment platform for barbers, salons, beauty centers, clinics, psychologists, and dietitians.",
      keywords: [
        "artexoApp",
        "online appointment scheduling software",
        "salon booking system",
        "beauty center appointment software",
        "clinic appointment platform",
        "staff scheduling software",
      ],
      inLanguage: "en-US",
      areaServed: "Global",
    },
  },
} satisfies Record<Locale, unknown>;

export type LandingDictionary = (typeof landingDictionary)[Locale];

