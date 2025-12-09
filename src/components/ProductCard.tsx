import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
}

export const ProductCard = ({ id, name, price, image_url, category }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover-lift h-full flex flex-col">
      <CardContent className="p-0">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 p-2 flex-1">
        <div className="w-full flex-1">
          <p className="text-[8px] text-muted-foreground uppercase tracking-wider mb-0.5">
            {category}
          </p>
          <h3 className="font-semibold text-[11px] line-clamp-2 mb-0.5">{name}</h3>
          <p className="text-primary font-bold text-xs">৳{price.toFixed(2)}</p>
        </div>
        <Link to={`/product/${id}`} className="w-full">
          <Button variant="outline" className="w-full h-6 text-[10px] py-0">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};