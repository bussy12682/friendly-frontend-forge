import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatNaira, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < Math.round(rating)
              ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
              : "h-3.5 w-3.5 text-border"
          }
        />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group relative">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="block overflow-hidden rounded-lg bg-muted"
      >
        <img
          src={product.image}
          alt={`${product.name} ${product.subtitle}`}
          loading="lazy"
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      {product.badge && (
        <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
          {product.badge}
        </span>
      )}
      <button
        aria-label="Toggle wishlist"
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 rounded-full bg-background/90 p-1.5 shadow-sm transition hover:text-primary"
      >
        <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
      </button>
      <div className="pt-3 text-center">
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="text-sm font-medium leading-tight hover:text-primary"
        >
          {product.name}
          <br />
          <span className="text-muted-foreground">{product.subtitle}</span>
        </Link>
        <div className="mt-1 flex items-center justify-center gap-1">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <p className="mt-1 text-sm font-bold">{formatNaira(product.price)}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-2 w-full rounded-md bg-foreground py-2 text-xs font-semibold uppercase tracking-wider text-background opacity-0 transition group-hover:opacity-100 hover:bg-primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
