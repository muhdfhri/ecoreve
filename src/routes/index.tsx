import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionCarousel } from "@/components/sections/SolutionCarousel";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { VideoActionSection } from "@/components/sections/VideoActionSection";
import { CleanWaterSection } from "@/components/sections/CleanWaterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ecoreve - Qingdao Topolar New Material Co.,Ltd" },
      {
        name: "description",
        content:
          "Full-lifecycle technical assistance, automation systems, and high-efficiency wastewater treatment solutions by EcoReve.",
      },
      { property: "og:title", content: "Ecoreve - Qingdao Topolar New Material Co.,Ltd" },
      {
        property: "og:description",
        content:
          "Comprehensive water & wastewater treatment solutions, automation, valves, and energy equipment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeNav, setActiveNav] = useState<string>("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavigate = (pageName: string) => {
    setActiveNav(pageName);
    if (pageName === "Home") {
      document.title = "Ecoreve - Qingdao Topolar New Material Co.,Ltd";
    } else {
      document.title = `Ecoreve - ${pageName}`;
    }
  };

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background text-foreground">
        {/* Navbar Header */}
        <Navbar
          activeNav={activeNav}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Mobile Fullscreen Drawer Menu */}
        <MobileDrawer
          isOpen={mobileMenuOpen}
          activeNav={activeNav}
          onClose={() => setMobileMenuOpen(false)}
          onNavigate={handleNavigate}
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Industrial Wastewater Problems Section */}
        <ProblemSection />

        {/* Solution Carousel Section */}
        <SolutionCarousel />

        {/* Featured Products Section */}
        <ProductsSection />

        {/* EcoReve Systems in Action (Video Demonstration & Sidebar) */}
        <VideoActionSection />

        {/* Clean Water Pioneering Section */}
        <CleanWaterSection />

        {/* Footer */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
