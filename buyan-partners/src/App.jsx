import { useSite } from './context/SiteContext';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const { config } = useSite(); // Verileri çekiyoruz

  return (
    // Ana kapsayıcı: Arka plan ve yazı rengi dinamik
    <div className="min-h-screen bg-bg text-txt font-sans">
      
      {/* Geçici Navbar */}
      <nav className="flex justify-between items-center p-6 container mx-auto absolute top-0 left-0 right-0 z-20">
        <div className="text-2xl font-bold text-white">
          {config.general.logoText}
        </div>
        <div className="space-x-6 text-white/90">
          {config.navigation.map((item) => (
            <a key={item.id} href={item.path} className="hover:text-secondary transition-colors">
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section (Giriş) */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Arka Plan Resmi + Karanlık Filtre */}
        <div className="absolute inset-0 z-0">
          <img 
            src={config.hero.backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          {/* Resmin üzerine attığımız koyu perde (lacivert tonda) */}
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {config.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
            {config.hero.subtitle}
          </p>
          <button className="bg-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-secondary/50 cursor-pointer">
            {config.hero.buttonText}
          </button>
        </div>
      </header>
      <Services />
      <About />
      <Contact />
    </div>

  )
}

export default App