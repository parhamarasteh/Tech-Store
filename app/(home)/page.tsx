import SaleProducts from "../../components/home/SaleProducts";
import Brands from "../../components/home/Brands";
import Categories from "../../components/home/Categories";
import CinematicHero from "../../components/home/CinematicHero";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import Hero from "../../components/home/Hero";
import PromoBanner from "../../components/home/PromoBanner";


export default function HomePage() {
  return (
    <>
    <CinematicHero/>
      <Hero />
      <Categories />
      <Brands />
      <FeaturedProducts />
      <SaleProducts/>
      <PromoBanner />
    </>
  );
} 