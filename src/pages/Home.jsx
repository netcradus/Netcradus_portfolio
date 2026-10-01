import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Work from '../sections/Work';
import WhyUs from '../sections/WhyUs';
import Technology from '../sections/Technology';
import Process from '../sections/Process';
import Solutions from '../sections/Solutions';
import Testimonials from '../sections/Testimonials';
import SecurityServices from '../sections/SecurityServices';
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
      <About />
      <Services />
      <Work />
      <WhyUs />
      <Technology />
      <Process />
      <Solutions />
      <Testimonials />
      <SecurityServices />
      <BigCTA />
      <Contact />
    </main>
  );
}
