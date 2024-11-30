"use client";
import Home from "../components/mf/login/home";
import FormCard from "@/components/mf/login/card";

export default function HomePage() {
  return (
    <>
      <Home
        InfoText="Real-Time Competitor Price and Discount Monitoring: Track competitor pricing, identify discounts, and receive actionable insights with predictive analytics to optimize your pricing strategies and stay competitive."
        logoSize="w-52"
        logoUrl="https://infringementportalcontent.mfilterit.com/images/media/logos/mfilterit-white-logo.png"
      >
        <FormCard />
      </Home>
    </>
  );
}
