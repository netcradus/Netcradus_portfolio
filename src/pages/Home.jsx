import Hero from '../sections/Hero';
import Statement from '../sections/Statement';
import About from '../sections/About';
import Services from '../sections/Services';
import Work from '../sections/Work';
import WhyUs from '../sections/WhyUs';
import Technology from '../sections/Technology';
import Process from '../sections/Process';
import Solutions from '../sections/Solutions';
import Stats from '../sections/Stats';
import Testimonials from '../sections/Testimonials';
import BigCTA from '../sections/BigCTA';
import Contact from '../sections/Contact';

/**
 * Single-page composition. Each section owns its own markup + animation so
 * App.jsx stays a thin assembler.
 */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Statement />
      <About />
      <Services />
      <Work />
      <WhyUs />
      <Technology />
      <Process />
      <Solutions />
      <Stats />
      <Testimonials />
      <BigCTA />
      <Contact />
    </main>
  );
}
