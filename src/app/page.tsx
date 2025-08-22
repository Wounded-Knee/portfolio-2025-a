import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Navigation from '@/components/Navigation';
import MarioEasterEgg from '../components/MarioEasterEgg';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="m-0 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden" role="main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <About />
          <Projects />
          <Testimonials />
          <Certifications />
          <Experience />
          <Skills />
          <Contact />
        </div>
      </main>
      {/* <div className="relative">
        <MarioEasterEgg 
          animationDuration={15} 
          startDelay={0}
        />
      </div> */}
      <Footer />
    </>
  );
}
