export const siteConfig = {
  // GENEL AYARLAR
  general: {
    siteName: "Buyan Partners",
    logoText: "BUYAN PARTNERS", 
    footerText: "© 2025 Buyan Partners. Tüm hakları saklıdır.",
  },

  // RENK TEMALARI (Admin buradan tema seçebilecek)
  theme: {
    activeTheme: "kurumsal_mavi", // Şu an aktif olan tema
    themes: {
      kurumsal_mavi: {
        primary: "#0f172a", // Koyu Lacivert (Slate-900)
        secondary: "#3b82f6", // Canlı Mavi
        background: "#ffffff",
        text: "#1e293b",
      },
      premium_siyah: {
        primary: "#000000",
        secondary: "#d4af37", // Altın Sarısı
        background: "#0a0a0a",
        text: "#e5e5e5",
      }
    }
  },

  // MENÜ (Admin sırasını değiştirebilir)
  navigation: [
    { id: 1, title: "Ana Sayfa", path: "/" },
    { id: 2, title: "Hizmetler", path: "#services" },
    { id: 3, title: "Hakkımızda", path: "#about" },
    { id: 4, title: "İletişim", path: "#contact" },
  ],

  // ANA SAYFA İÇERİKLERİ
  hero: {
    title: "İşletmenizi Büyütmek İçin Stratejik Ortaklık",
    subtitle: "Buyan Partners ile geleceği bugünden planlayın, potansiyelinizi açığa çıkarın.",
    buttonText: "Bize Ulaşın",
    // Geçici olarak internetten rastgele kurumsal bir resim:
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
  },
  // HİZMETLER VERİSİ (GÜNCELLENDİ)
  services: {
    title: "Our Expertise", // Başlığı İngilizce içeriğe uygun güncelledik
    subtitle: "Tailored solutions for sustainable growth and transformation.",
    items: [
      {
        id: 1,
        title: "MARKET ENTRY & BUSINESS SETUP",
        description: "Supporting international and domestic companies entering or expanding in the U.S.",
        icon: "Globe" // Küresel genişleme ikonu
      },
      {
        id: 2,
        title: "PEOPLE & ORGANIZATION CONSULTING",
        description: "Building high-performing organizations through modern, strategic HR.",
        icon: "Users" // İnsan ve ekip ikonu
      },
      {
        id: 3,
        title: "TECHNOLOGY, DATA & TRANSFORMATION",
        description: "Accelerating digital maturity, AI adoption, and enterprise change.",
        icon: "BrainCircuit" // Teknoloji ve AI ikonu
      }
    ]
  },
  // HAKKIMIZDA VERİSİ
  about: {
    badge: "HAKKIMIZDA",
    title: "Global Vizyon, Yerel Tecrübe",
    description: "Buyan Partners olarak, işletmelerin karmaşık pazar dinamiklerinde yollarını bulmalarına yardımcı oluyoruz. Sadece tavsiye vermiyoruz; stratejilerinizi hayata geçirirken yanınızda oluyoruz.",
    stats: [
      { value: "15+", label: "Yıllık Tecrübe" },
      { value: "200+", label: "Başarılı Proje" },
      { value: "50M$", label: "Yönetilen Portföy" }
    ],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" // Toplantı yapan insanlar
  },
  // İLETİŞİM VERİSİ
  contact: {
    title: "Bir Kahve İçelim?",
    subtitle: "Projeleriniz hakkında konuşmak ve size nasıl değer katabileceğimizi tartışmak için sabırsızlanıyoruz.",
    buttonText: "E-Mail Gönder",
    info: {
      email: "info@buyanpartners.com",
      phone: "+90 (212) 555 00 00",
      address: "Levent Mah. Büyükdere Cad. No:199, Şişli/İstanbul",
      mapUrl: "https://maps.google.com" // İleride harita linki için
    }
  },
  // FOOTER VERİSİ
  footer: {
    description: "İşletmeler için stratejik büyüme ve dijital dönüşüm ortağınız.",
    socials: [
      { id: 1, name: "linkedin", url: "#" },
      { id: 2, name: "twitter", url: "#" },
      { id: 3, name: "instagram", url: "#" }
    ],
    links: [
      { title: "Gizlilik Politikası", url: "#" },
      { title: "Kullanım Şartları", url: "#" },
      { title: "Çerez Politikası", url: "#" }
    ]
  }
};