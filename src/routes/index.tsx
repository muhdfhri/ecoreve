import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionCarousel } from "@/components/sections/SolutionCarousel";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { VideoActionSection } from "@/components/sections/VideoActionSection";
import { CleanWaterSection } from "@/components/sections/CleanWaterSection";
import { LatestNewsSection } from "@/components/sections/LatestNewsSection";
import { ContactPage } from "@/pages/ContactPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { NewsPage } from "@/pages/NewsPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ServicesPage } from "@/pages/ServicesPage";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";

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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  const handleNavigate = (pageName: string) => {
    setActiveNav(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (pageName === "Home") {
      document.title = "Ecoreve - Qingdao Topolar New Material Co.,Ltd";
    } else {
      document.title = `Ecoreve - ${pageName}`;
    }
  };

  const isAdminPage = activeNav.toLowerCase().includes("admin");
  const isContactPage = activeNav.startsWith("Contact");
  const isAboutUsPage = activeNav.toLowerCase().includes("about");
  const isNewsPage = activeNav.toLowerCase().includes("news") || activeNav.toLowerCase().includes("update");
  const isProductsPage = activeNav.toLowerCase().includes("product");
  const isServicesPage = activeNav.toLowerCase().includes("service");

  if (isAdminPage) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />;
    }
    return <AdminDashboard />;
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen w-full bg-background text-foreground">
        {/* Navbar Header (Handles both desktop mega-menu and expanding mobile toggle menu) */}
        <Navbar
          activeNav={activeNav}
          onNavigate={handleNavigate}
          isMobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Render Dedicated Pages or Full Landing Page */}
        {isContactPage ? (
          <ContactPage />
        ) : isAboutUsPage ? (
          <AboutUsPage />
        ) : isNewsPage ? (
          <NewsPage />
        ) : isProductsPage ? (
          <ProductsPage />
        ) : isServicesPage ? (
          <ServicesPage />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection />

            {/* Solution Carousel Section */}
            <SolutionCarousel />

            {/* Industrial Wastewater Problems Section */}
            <ProblemSection />

            {/* Featured Products Section */}
            <ProductsSection />

            {/* EcoReve Systems in Action (Video Demonstration & Sidebar) */}
            <VideoActionSection />

            {/* Latest News Carousel Section */}
            <LatestNewsSection />

            {/* Clean Water Pioneering Section */}
            <CleanWaterSection />
          </>
        )}

        {/* Footer */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
