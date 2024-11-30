"use client";
import Home from "../components/mf/login/home";
import FormCard from "@/components/mf/login/card";

export default function HomePage() {
  return (
    <>
      <Home
        InfoText="Social Media Listing"
        logoSize="w-52"
        logoUrl="https://infringementportalcontent.mfilterit.com/images/media/logos/mfilterit-white-logo.png"
      >
        <FormCard />
      </Home>
    </>
  );
}
