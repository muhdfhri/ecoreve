import React, { useState } from "react";
import { Navbar } from "../Components/layout/Navbar";
import { Footer } from "../Components/layout/Footer";
import { router } from "@inertiajs/react";

interface AppLayoutProps {
  activeNav?: string;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ activeNav = "Home", children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (pageName: string) => {
    switch (pageName) {
      case "Home":
        router.visit("/");
        break;
      case "Products":
        router.visit("/products");
        break;
      case "Service":
        router.visit("/service");
        break;
      case "About us":
        router.visit("/about-us");
        break;
      case "News":
        router.visit("/news");
        break;
      case "Contact":
        router.visit("/contact");
        break;
      default:
        router.visit("/");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#005883] selection:text-white">
      <Navbar
        activeNav={activeNav}
        onNavigate={handleNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
