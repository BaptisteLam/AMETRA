import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import BusinessUnits from "@/components/home/BusinessUnits";
import GroupeOrg from "@/components/home/GroupeOrg";
import Industries from "@/components/home/Industries";
import ReferencesMarquee from "@/components/home/ReferencesMarquee";
import BlogPreview from "@/components/home/BlogPreview";
import CareersCTA from "@/components/home/CareersCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <BusinessUnits />
      <GroupeOrg />
      <Industries />
      <ReferencesMarquee />
      <BlogPreview />
      <CareersCTA />
    </>
  );
}
