import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { SmoothScroll } from "@/components/SmoothScroll";
import { UnderTheHood } from "@/components/UnderTheHood";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <UnderTheHood />
        <About />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
