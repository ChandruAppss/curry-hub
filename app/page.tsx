import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignatureDishes from "@/components/SignatureDishes";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Reservation from "@/components/Reservation";
import Reviews from "@/components/Reviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SignatureDishes />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Reviews />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <MobileCTA />
    </main>
  );
}
