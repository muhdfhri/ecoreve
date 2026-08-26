import React from "react";
import { AppLayout } from "../../Layouts/AppLayout";
import { HeroSection } from "../../Components/sections/HeroSection";
import { VideoActionSection } from "../../Components/sections/VideoActionSection";
import { ProblemSection } from "../../Components/sections/ProblemSection";
import { SolutionCarousel } from "../../Components/sections/SolutionCarousel";
import { ProductsSection } from "../../Components/sections/ProductsSection";
import { LatestNewsSection } from "../../Components/sections/LatestNewsSection";
import { CleanWaterSection } from "../../Components/sections/CleanWaterSection";

export default function HomeIndex() {
  return (
    <AppLayout activeNav="Home">
      <HeroSection />
      <VideoActionSection />
      <ProblemSection />
      <SolutionCarousel />
      <ProductsSection />
      <LatestNewsSection />
      <CleanWaterSection />
    </AppLayout>
  );
}
