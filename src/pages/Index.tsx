
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import SuggestionsSection from "@/components/sections/SuggestionsSection";
import LocationScroll from "@/components/sections/LocationScroll";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SuggestionsSection />
      <LocationScroll />
    </div>
  );
};

export default Index;
