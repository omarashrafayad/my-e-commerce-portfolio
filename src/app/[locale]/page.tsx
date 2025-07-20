
import BenefitsBanner from "@/components/library/BenefitsBanner";
import CategorySlider from "@/components/products/CategorySlider";
import Landingpage from "@/components/heroSection/Landingpage";
import NewArrival from "@/components/products/NewArrival";
import Products from "@/components/products/Products";

export default async function Home() {
  return (
    <div >
    <Landingpage/>
    <Products/>
    <CategorySlider/>
    <NewArrival/>
    <BenefitsBanner/> 
    </div>
  );
}

