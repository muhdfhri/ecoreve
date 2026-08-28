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

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [activeNav]);

  // Global IntersectionObserver to trigger smooth entrance animations on scroll
  React.useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optionally unobserve after animating in for performance
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -60px 0px", // Triggers slightly before element enters view
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".reveal, .animate-element");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [children]);

  const handleNavigate = (pageName: string) => {
    if (!pageName) return;

    const options = { preserveState: false, preserveScroll: false };

    if (pageName === "Home") {
      router.visit("/", options);
    } else if (pageName.startsWith("Products")) {
      router.visit("/products", options);
    } else if (pageName.startsWith("Service")) {
      router.visit("/service", options);
    } else if (pageName.startsWith("About") || pageName === "About us") {
      router.visit("/about-us", options);
    } else if (pageName === "News") {
      router.visit("/news", options);
    } else if (pageName === "Contact") {
      router.visit("/contact", options);
    } else {
      router.visit("/", options);
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
