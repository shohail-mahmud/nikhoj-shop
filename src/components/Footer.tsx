import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">Nikhoj Shop</h3>
            <p className="text-sm text-muted-foreground">
              Discover Art & Style — Hidden, but Never Lost.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms-privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms & Privacy
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/ruhama_islamm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              @ruhama_islamm
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nikhoj Shop. All rights reserved.</p>
          <p className="mt-1">Based in Bangladesh</p>
          <p className="mt-2">
            vibe code by{" "}
            <a
              href="https://shohailscorner.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://shohailscorner.lovable.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};