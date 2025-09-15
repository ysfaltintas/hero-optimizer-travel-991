
import HeroSection from "@/components/sections/HeroSection";
import HotelsSection from "@/components/sections/HotelsSection";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <TopBar />
      <HeroSection />
      <HotelsSection />
      <Footer />
    </div>
  );
};

export default Index;
