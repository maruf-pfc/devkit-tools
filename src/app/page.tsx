import HeroSection from "@/components/pages/Home/HeroSection";
import FeaturedTools from "@/components/pages/Home/FeaturedTools";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <HeroSection />
      <FeaturedTools />
    </main>
  );
}
