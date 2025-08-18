import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="m-0 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Skills />
        <Experience />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
