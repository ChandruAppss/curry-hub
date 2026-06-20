import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SignatureDishes from "@/components/SignatureDishes";
import Menu from "@/components/Menu";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Reservation from "@/components/Reservation";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <SignatureDishes />
      <Menu />
      <WhyChooseUs />
      <Gallery />
      <Reservation />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
