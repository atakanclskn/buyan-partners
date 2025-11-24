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
  services: {
    title: "Uzmanlık Alanlarımız",
    subtitle: "İşletmenizin ihtiyaçlarına özel, veri odaklı çözümler sunuyoruz.",
    items: [
      {
        id: 1,
        title: "Stratejik Planlama",
        description: "Uzun vadeli hedeflerinize ulaşmanız için pazar analizi ve yol haritası oluşturuyoruz.",
        icon: "Map" // Lucide ikon ismi
      },
      {
        id: 2,
        title: "Yönetim Danışmanlığı",
        description: "Operasyonel verimliliği artırmak ve maliyetleri optimize etmek için süreçlerinizi yeniden tasarlıyoruz.",
        icon: "Briefcase"
      },
      {
        id: 3,
        title: "Dijital Dönüşüm",
        description: "Modern teknolojileri iş süreçlerinize entegre ederek rekabet avantajı sağlıyoruz.",
        icon: "Monitor"
      },
      {
        id: 4,
        title: "Marka Konumlandırma",
        description: "Markanızın değerini artıracak kurumsal kimlik ve iletişim stratejileri geliştiriyoruz.",
        icon: "Megaphone"
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
  }
};