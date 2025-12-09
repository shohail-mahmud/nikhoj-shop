import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "painting" | "tshirt">("all");

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    let query = supabase.from("products").select("*");
    if (filter !== "all") query = query.eq("category", filter);
    const { data } = await query;
    if (data) setProducts(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>
        
        <div className="flex gap-4 mb-8">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
          <Button variant={filter === "painting" ? "default" : "outline"} onClick={() => setFilter("painting")}>Paintings</Button>
          <Button variant={filter === "tshirt" ? "default" : "outline"} onClick={() => setFilter("tshirt")}>T-Shirts</Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;