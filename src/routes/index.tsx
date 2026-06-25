import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { LiveUpdates, Leadership, NewsSection, Gallery, Services, Directorate, DistrictFinder, Downloads } from "@/components/home/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sports & Youth Services Department — Government of Maharashtra" },
      { name: "description", content: "Empowering Maharashtra through sports excellence — infrastructure, schemes, athletes and tournaments." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroCarousel />
      <LiveUpdates />
      <Leadership />
      <NewsSection />
      <Gallery />
      <Services />
      <Directorate />
      <DistrictFinder />
      <Downloads />
    </>
  );
}
