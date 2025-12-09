import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Instagram } from "lucide-react";
const ProductDetail = () => {
  const {
    id
  } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [countryInfo, setCountryInfo] = useState("");
  useEffect(() => {
    fetchProduct();
    fetchCountryInfo();
  }, [id]);
  const fetchProduct = async () => {
    const {
      data
    } = await supabase.from("products").select("*").eq("id", id).single();
    if (data) {
      setProduct(data);
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
    }
  };
  const fetchCountryInfo = async () => {
    const {
      data
    } = await supabase.from("site_settings").select("value").eq("key", "country_info").single();
    if (data) setCountryInfo(data.value);
  };
  const handleOrder = () => {
    let message = `Hi! I'd like to order:\n\n${product.name}\n`;
    if (selectedSize) {
      message += `Size: ${selectedSize}\n`;
    }
    if (product.allow_quantity && quantity > 1) {
      message += `Quantity: ${quantity}\n`;
    }
    message += `\nPrice: ৳${product.price.toFixed(2)}`;
    if (product.allow_quantity && quantity > 1) {
      message += ` × ${quantity} = ৳${(product.price * quantity).toFixed(2)}`;
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://instagram.com/ruhama_islamm`, "_blank");
  };
  if (!product) {
    return <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-start">
          {/* Product Image */}
          <div className="md:sticky md:top-24">
            <div className="aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl md:shadow-2xl hover-lift border border-primary/10">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" onError={e => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop';
            }} />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4 md:gap-6 animate-fade-in">
            <div className="space-y-2 md:space-y-3">
              <span className="inline-block px-2.5 py-0.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                {product.name}
              </h1>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    ৳{product.price.toFixed(2)}
                  </p>
                  
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Price without delivery charge. Delivery fee varies by location.
                </p>
              </div>
            </div>

            <div className="p-3 md:p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg md:rounded-xl border border-border/50">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            {/* Size Selection for T-Shirts */}
            {product.sizes && product.sizes.length > 0 && <div className="space-y-2.5 md:space-y-3 p-3 md:p-4 bg-card rounded-lg md:rounded-xl border border-border/50">
                <Label className="text-sm md:text-base font-semibold">Select Size</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => <div key={size} className="flex items-center">
                        <RadioGroupItem value={size} id={size} className="peer sr-only" />
                        <Label htmlFor={size} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-lg border-2 border-border bg-background text-xs md:text-sm font-semibold transition-all hover:border-primary hover:bg-primary/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground">
                          {size}
                        </Label>
                      </div>)}
                  </div>
                </RadioGroup>
                {selectedSize && !product.sizes.includes(selectedSize) && <p className="text-sm text-destructive font-medium">
                    Sorry, size {selectedSize} is currently out of stock
                  </p>}
              </div>}

            {/* Quantity Selection */}
            {product.allow_quantity && <div className="space-y-2.5 md:space-y-3 p-3 md:p-4 bg-card rounded-lg md:rounded-xl border border-border/50">
                <Label htmlFor="quantity" className="text-sm md:text-base font-semibold">
                  Quantity
                </Label>
                <Input id="quantity" type="number" min="1" max={product.stock || 99} value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 md:w-24 text-sm" />
                {product.stock > 0 && <p className="text-xs md:text-sm text-muted-foreground">
                    {product.stock} items in stock
                  </p>}
                {quantity > product.stock && <p className="text-xs md:text-sm text-destructive font-medium">
                    Only {product.stock} items available in stock
                  </p>}
              </div>}

            {/* Total Price */}
            {product.allow_quantity && quantity > 1 && <div className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg md:rounded-xl border-2 border-primary/20 shadow-lg">
                <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  ৳{(product.price * quantity).toFixed(2)}
                </p>
              </div>}

            {/* Order Button */}
            <Button size="lg" onClick={handleOrder} className="w-full gap-2 h-12 md:h-14 text-sm md:text-base font-semibold shadow-xl hover:shadow-2xl transition-all" disabled={product.sizes && product.sizes.length > 0 && !product.sizes.includes(selectedSize) || product.allow_quantity && quantity > product.stock}>
              <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              {product.sizes && product.sizes.length > 0 && !product.sizes.includes(selectedSize) ? "Out of Stock" : product.allow_quantity && quantity > product.stock ? "Not Enough Stock" : "Order on Instagram"}
            </Button>

            {/* Location Info */}
            <div className="p-3 md:p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg md:rounded-xl border border-accent/20">
              <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-base md:text-lg">📍</span>
                {countryInfo}
              </p>
            </div>

            {/* Policy Notice */}
            <div className="text-[10px] md:text-xs text-muted-foreground space-y-1.5 md:space-y-2 p-3 md:p-4 bg-muted/30 rounded-lg border border-border/30">
              <p className="flex items-start gap-2">
                <span className="font-semibold text-foreground">⚠️ Non-refundable:</span> 
                <span>All sales are final. Contact us immediately if there's an issue with your product.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-sm md:text-lg">✨</span>
                <span>Orders are processed manually via Instagram for personalized service.</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default ProductDetail;