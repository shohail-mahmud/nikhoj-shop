import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Nikhoj Shop</h1>
        <div className="max-w-3xl mx-auto space-y-6 text-lg">
          <p>Nikhoj Shop started as a vision to blend creativity, fashion, and individuality. Each piece is inspired by art that's hidden but never lost — a story expressed through color and fabric.</p>
          <p>We believe in creating unique pieces that speak to the soul, combining artistic expression with modern style. Our paintings and T-shirts are more than products — they're wearable art and collectible masterpieces.</p>
          <p>Every item in our collection is carefully curated to bring you the perfect blend of sophistication and creativity.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;