import IntroAnimation from "@/components/IntroAnimation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WhoWeServe from "@/components/WhoWeServe";
import ServicesSection from "@/components/ServicesSection";
import MethodSection from "@/components/MethodSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff" }}>
      <IntroAnimation />
      <Header />
      <Hero />
      <LogoMarquee />
      <WhoWeServe />
      <ServicesSection />
      <MethodSection />
      <SuccessStoriesSection />
      <SelectedWorkSection />
      <TestimonialSection />
      <ContactSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
