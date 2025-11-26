export const siteConfig = {
  // GENEL AYARLAR
  general: {
    siteName: "Buyan Partners",
    logoText: "BUYAN PARTNERS", 
    footerText: "© 2025 Buyan Partners. Tüm hakları saklıdır.",
  },

  // RENK TEMALARI
  theme: {
    activeTheme: "kurumsal_mavi", 
    themes: {
      kurumsal_mavi: {
        primary: "#0f172a", 
        secondary: "#3b82f6", 
        background: "#ffffff",
        text: "#1e293b",
      },
      premium_siyah: {
        primary: "#000000",
        secondary: "#d4af37", 
        background: "#0a0a0a",
        text: "#e5e5e5",
      }
    }
  },

  // MENÜ
  navigation: [
    { id: 1, title: "Ana Sayfa", path: "/" },
    { id: 2, title: "Hizmetler", path: "#services" },
    { id: 3, title: "Hakkımızda", path: "#about" },
    { id: 4, title: "İletişim", path: "#contact" },
  ],

  // ANA SAYFA İÇERİKLERİ (HERO)
  hero: {
    title: "İşletmenizi Büyütmek İçin Stratejik Ortaklık",
    subtitle: "Buyan Partners ile geleceği bugünden planlayın, potansiyelinizi açığa çıkarın.",
    buttonText: "Bize Ulaşın",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
  },

  // REFERANSLAR / MARKALAR
  brands: {
    title: "İş Ortaklarımız",
    list: [
      { id: 1, name: "TechGlobal", icon: "Box" },
      { id: 2, name: "North Systems", icon: "Hexagon" },
      { id: 3, name: "Alpha Finance", icon: "Triangle" },
      { id: 4, name: "Next Level", icon: "Circle" },
      { id: 5, name: "Blue Wave", icon: "Waves" },
      { id: 6, name: "Core Logic", icon: "Cpu" },
    ]
  },

  // HİZMETLER VERİSİ
  services: {
    title: "Our Expertise",
    subtitle: "Tailored solutions for sustainable growth and transformation.",
    items: [
      {
        id: 1,
        title: "MARKET ENTRY & BUSINESS SETUP",
        description: "Supporting international and domestic companies entering or expanding in the U.S.",
        icon: "Globe",
        details: [
          {
            title: "Company Establishment & Compliance",
            list: ["Entity formation (LLC, Corp, Subsidiary)", "Licensing, permits, registrations"]
          },
          {
            title: "Location & Facility Strategy",
            list: ["Site selection & state comparison", "Real estate search (office, warehouse, manufacturing)", "Lease negotiation support"]
          },
          {
            title: "Incentives & Government Relations",
            list: ["Federal, state, and local incentives", "Economic development programs", "Application & documentation support"]
          },
          {
            title: "Local Partner & Ecosystem Integration",
            list: ["Banking & Financial stakeholders", "CPA & Tax advisory", "Legal counsel", "Insurance providers", "Workforce & community partners"]
          }
        ]
      },
      {
        id: 2,
        title: "PEOPLE & ORGANIZATION CONSULTING",
        description: "Building high-performing organizations through modern, strategic HR.",
        icon: "Users",
        details: [
          {
            title: "HR Strategy & Organizational Design",
            list: ["HR roadmap & workforce planning", "Org structure design", "Culture development"]
          },
          {
            title: "Talent Acquisition & Workforce Insights",
            list: ["Recruitment & selection", "Executive search coordination", "Labor market & salary benchmarking"]
          },
          {
            title: "Total Rewards & HR Operations",
            list: ["Benefits program design", "HR policies & compliance", "HRIS selection & implementation"]
          },
          {
            title: "Performance & Leadership Development",
            list: ["KPI & performance systems", "Coaching & mentoring", "Leadership capability programs"]
          }
        ]
      },
      {
        id: 3,
        title: "TECHNOLOGY, DATA & TRANSFORMATION",
        description: "Accelerating digital maturity, AI adoption, and enterprise change.",
        icon: "BrainCircuit",
        details: [
          {
            title: "AI, Data & Digital Readiness",
            list: ["Data → intelligence assessments", "AI readiness across people, process, platform", "Workforce transformation planning"]
          },
          {
            title: "Enterprise AI & Automation",
            list: ["Responsible AI governance", "Process automation", "Tools adoption & training", "Change management for AI integration"]
          },
          {
            title: "Workforce Digital Capability",
            list: ["Skills gap analysis", "AI & digital skills training", "Upskilling and reskilling programs"]
          },
          {
            title: "ERP & Digital Systems Foundation",
            list: ["Tech stack alignment (Cloud, Data, Cybersecurity)", "ERP / CRM / MRP / Finance / Logistics optimization", "Supply chain integration", "Operational efficiency & ROI improvement"]
          }
        ]
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
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
  },

  // İLETİŞİM VERİSİ
  contact: {
    title: "Bir Kahve İçelim?",
    subtitle: "Projeleriniz hakkında konuşmak ve size nasıl değer katabileceğimizi tartışmak için sabırsızlanıyoruz.",
    buttonText: "Mesaj Gönder",
    info: {
      email: "info@buyanpartners.com",
      phone: "+90 (212) 555 00 00",
      address: "Levent Mah. Büyükdere Cad. No:199, Şişli/İstanbul",
      mapUrl: "https://maps.google.com"
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