import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <p className="text-lg">Have questions? Want to place an order? Reach out to us on Instagram!</p>
          
          <div className="flex flex-col gap-4 items-center">
            <a href="https://instagram.com/ruhama_islamm" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <Instagram className="h-5 w-5" />
                Message us on Instagram
              </Button>
            </a>
            <p className="text-muted-foreground">@ruhama_islamm</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;