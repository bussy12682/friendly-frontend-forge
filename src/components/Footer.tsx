import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-script text-3xl text-primary">Cynthia_hairpire</p>
          <p className="mt-3 text-sm text-background/60">
            Enhancing confidence with elegantly crafted wigs made to suit you.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="text-background/60 hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-background/60">
            <li><Link to="/shop" className="hover:text-primary">Lace Front Wigs</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Glueless Wigs</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Bob Wigs</Link></li>
            <li><Link to="/collections" className="hover:text-primary">Bundles & Extensions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Help</h4>
          <ul className="mt-3 space-y-2 text-sm text-background/60">
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Care Guide</Link></li>
            <li><Link to="/account" className="hover:text-primary">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-background/60">
            <li>Lagos, Nigeria</li>
            <li>hello@cynthiahairpire.com</li>
            <li>+234 810 123 4567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
        © 2026 Cynthia_hairpire. All rights reserved.
      </div>
    </footer>
  );
}
