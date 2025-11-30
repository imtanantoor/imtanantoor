import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Experience />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
