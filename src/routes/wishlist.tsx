import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Cynthia_hairpire" },
      { name: "description", content: "Your saved wigs, ready when you are." },
      { property: "og:title", content: "My Wishlist — Cynthia_hairpire" },
      { property: "og:description", content: "Your saved wigs, ready when you are." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, addToCart } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Wishlist ({saved.length})</h1>
        {saved.length > 0 && (
          <button
            onClick={() => saved.forEach((p) => addToCart(p))}
            className="rounded-md border border-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Move all to cart
          </button>
        )}
      </div>
      {saved.length === 0 ? (
        <div className="py-24 text-center">
          <Heart className="mx-auto h-12 w-12 text-border" />
          <p className="mt-4 text-muted-foreground">Your wishlist is empty. Tap the heart on any wig to save it here.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            Shop Wigs
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
