import React from "react";
import { AppLayout } from "../../Layouts/AppLayout";
import { SEOHead } from "@/Components/common/SEOHead";
import { HeroSection } from "../../Components/sections/HeroSection";
import { VideoActionSection } from "../../Components/sections/VideoActionSection";
import { ProblemSection } from "../../Components/sections/ProblemSection";
import { SolutionCarousel } from "../../Components/sections/SolutionCarousel";
import { ProductsSection } from "../../Components/sections/ProductsSection";
import { LatestNewsSection } from "../../Components/sections/LatestNewsSection";
import { CleanWaterSection } from "../../Components/sections/CleanWaterSection";

interface HomeIndexProps {
  featuredProducts?: any[];
  latestNews?: any[];
}

export default function HomeIndex({ featuredProducts = [], latestNews = [] }: HomeIndexProps) {
  return (
    <AppLayout activeNav="Home">
      <SEOHead
        title="EcoReve — Sustainable Industrial Water & Environmental Engineering"
        description="EcoReve provides advanced wastewater treatment, MBR membranes, zero liquid discharge (ZLD), and green environmental engineering solutions across Southeast Asia."
        url="https://ecoreve.com"
      />
      <HeroSection />
      <VideoActionSection />
      <ProblemSection />
      <SolutionCarousel featuredProducts={featuredProducts} />
      <ProductsSection featuredProducts={featuredProducts} />
      <LatestNewsSection latestNews={latestNews} />
      <CleanWaterSection />
    </AppLayout>
  );
}
