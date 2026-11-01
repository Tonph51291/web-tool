import React from "react";
import { HeroBanner } from "./components/HeroBanner";
import { SoftwareMockup } from "./components/SoftwareMockup";
import { FeaturedTools } from "./components/FeaturedTools";
import { PaymentGuideSteps } from "./components/PaymentGuideSteps";
import { FaqAccordion } from "./components/FaqAccordion";

export function HomeView() {
  return (
    <div className="w-full flex flex-col">
      <HeroBanner />
      <SoftwareMockup />
      <FeaturedTools />
      <PaymentGuideSteps />
      <FaqAccordion />
    </div>
  );
}

