export const siteConfig = {
  // GENERAL SETTINGS
  general: {
    siteName: "Buyan Partners",
    logoText: "BUYAN PARTNERS", 
    footerText: "© 2025 Buyan Partners. All rights reserved.",
  },

  // THEME SETTINGS
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

  // NAVIGATION (MENU)
  navigation: [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Services", path: "#services" },
    { id: 3, title: "About Us", path: "#about" },
    { id: 4, title: "Contact", path: "#contact" },
  ],

  // HERO SECTION
  hero: {
    title: "Strategic Guidance for Market Expansion & Transformation",
    subtitle: "We design the organizational, operational, and digital foundations required for your long-term success in the global market.",
    buttonText: "Get in Touch",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
  },

  // FOUNDERS / LEADERSHIP TEAM (UPDATED TO ENGLISH)
  founders: {
    // Title is hidden in component but kept here for reference
    title: "Meet Our Leadership", 
    items: [
      {
        id: 1,
        name: "OYA BUYAN",
        title: "title",
        bio: "xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.",
        image: "https://images.freeimages.com/images/premium/previews/1648/16483065-blonde-business-woman.jpg", 
        linkedin: "#"
      },
      {
        id: 2,
        name: "TEOMAN BUYAN",
        title: "title",
        bio: "xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.",
        image: "https://media.istockphoto.com/id/515908155/photo/businessman.jpg?s=1024x1024&w=is&k=20&c=HYIpv4I5VrpSsS9dR5KF3YkV2534GsdS2JVwFL6Vpbs=",
        linkedin: "#"
      }
    ]
  },

  // BRANDS / REFERENCES
  brands: {
    title: "Trusted By Industry Leaders",
    list: [
      { id: 1, name: "TechGlobal", icon: "Box" },
      { id: 2, name: "North Systems", icon: "Hexagon" },
      { id: 3, name: "Alpha Finance", icon: "Triangle" },
      { id: 4, name: "Next Level", icon: "Circle" },
      { id: 5, name: "Blue Wave", icon: "Waves" },
      { id: 6, name: "Core Logic", icon: "Cpu" },
    ]
  },

  // SERVICES DATA
  services: {
    title: "Our Expertise",
    subtitle: "Tailored solutions for sustainable growth and enterprise transformation.",
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

  // ABOUT US
  about: {
    badge: "WHO WE ARE",
    title: "Global Vision, Local Expertise",
    description: "At BUYAN PARTNERS LLC, we guide companies through market expansion while designing the organizational, operational, and digital foundations required for long-term success. Our offerings are structured around three core advisory pillars that enable sustainable growth and enterprise transformation.",
    stats: [
      { value: "Global", label: "Market Reach" },
      { value: "End-to-End", label: "Transformation" },
      { value: "Strategic", label: "Partnerships" }
    ],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
  },

  // CONTACT DATA
  contact: {
    title: "Let's Start the Conversation",
    subtitle: "Ready to expand or transform your business? Reach out to us to discuss how we can drive value for your organization.",
    buttonText: "Send Message",
    formLabels: {
      name: "Full Name",
      email: "Email Address",
      message: "Your Message"
    },
    info: {
      email: "info@buyanpartners.com",
      phone: "+1 (000) 000-0000",
      address: "Atlanta, GA, USA",
      mapUrl: "https://maps.google.com"
    }
  },

  // FOOTER DATA
  footer: {
    description: "Your strategic partner for market entry, organizational excellence, and digital transformation.",
    labels: {
      menu: "Menu",
      legal: "Legal",
      backToTop: "Back to Top"
    },
    socials: [
      { id: 1, name: "linkedin", url: "#" },
      { id: 2, name: "x", url: "#" },
      { id: 3, name: "instagram", url: "#" },
      { id: 4, name: "facebook", url: "#" }
    ],
    links: [
      { title: "Privacy Policy", url: "#" },
      { title: "Terms of Service", url: "#" },
      { title: "Cookie Policy", url: "#" }
    ]
  }
};