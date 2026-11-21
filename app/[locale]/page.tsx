import Motion from "@/components/Motion";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Certifications from "@/components/Certifications";
import Philosophy from "@/components/Philosophy";
import Land from "@/components/Land";
import People from "@/components/People";
import Wines from "@/components/Wines";
import News from "@/components/News";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <>
      <Motion />
      <AgeGate />
      <Header />
      <main>
        <Hero />
        <Certifications />
        <Philosophy />
        <Land />
        <People />
        <Wines />
        <News />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
