import { useSite } from "./context/SiteContext";
import Navbar from "./components/Navbar"; // Yeni Header
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal"; // Hero için animasyon

function App() {
  const { config } = useSite();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300">
      {/* Yeni Akıllı Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={config.hero.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <Reveal>
            {" "}
            {/* Hero yazıları da animasyonlu gelsin */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {config.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
              {config.hero.subtitle}
            </p>
            <button className="bg-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-secondary/50 cursor-pointer">
              {config.hero.buttonText}
            </button>
          </Reveal>
        </div>
      </header>
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
