import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  name: string;
  instagram: string;
  body: string;
  image_url: string;
}

export const ReviewMarquee = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <Card className="w-80 flex-shrink-0 mx-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={review.image_url} alt={review.name} />
            <AvatarFallback>{review.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{review.name}</p>
            <p className="text-sm text-muted-foreground">{review.instagram}</p>
          </div>
        </div>
        <p className="text-sm">{review.body}</p>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What Our Customers Say
        </h2>
      </div>

      {/* Forward Marquee */}
      <div className="flex mb-4 overflow-hidden">
        <div className="flex animate-marquee">
          {reviews.map((review) => (
            <ReviewCard key={`forward-${review.id}`} review={review} />
          ))}
          {reviews.map((review) => (
            <ReviewCard key={`forward-dup-${review.id}`} review={review} />
          ))}
        </div>
      </div>

      {/* Reverse Marquee */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {reviews.map((review) => (
            <ReviewCard key={`reverse-${review.id}`} review={review} />
          ))}
          {reviews.map((review) => (
            <ReviewCard key={`reverse-dup-${review.id}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};