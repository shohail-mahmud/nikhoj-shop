import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { TeamSection } from "@/components/TeamSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}
const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  const fetchFeaturedProducts = async () => {
    const {
      data
    } = await supabase.from("products").select("*").limit(4);
    if (data) setFeaturedProducts(data);
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <section id="featured-products" className="py-16 container mx-auto px-4 md:px-[100px]">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {featuredProducts.map(product => <ProductCard key={product.id} {...product} />)}
          </div>
        </section>

        <ReviewMarquee />
        <TeamSection />
      </main>
      <Footer />
    </div>;
};
export default Index;