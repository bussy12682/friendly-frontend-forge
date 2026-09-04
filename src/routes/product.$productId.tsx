import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { useState } from "react";
import { formatNaira, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard, Stars } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} ${loaderData.product.subtitle} — Cynthia_hairpire` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} ${loaderData.product.subtitle}` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

const lengths = ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'];
const densities = ["150%", "180%", "200%", "250%"];
const laceTypes = ["HD Lace", "Transparent", "Swiss Lace"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [length, setLength] = useState('22"');
  const [density, setDensity] = useState("180%");
  const [lace, setLace] = useState("HD Lace");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const wished = wishlist.includes(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const selector = (options: string[], value: string, set: (v: string) => void, cols = "flex flex-wrap") => (
    <div className={`${cols} gap-2`}>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => set(o)}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
            value === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs text-muted-foreground">
        Home › <Link to="/shop" className="hover:text-primary">Shop</Link> › {product.name} {product.subtitle}
      </p>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={`${product.name} ${product.subtitle}`}
            width={800}
            height={1000}
            className="w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product.name} {product.subtitle}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatNaira(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatNaira(product.originalPrice)}</span>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-green-600">
            ● In stock — ships within 24 hours
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <h4 className="mb-2 text-sm font-semibold">Length</h4>
              {selector(lengths, length, setLength)}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Density</h4>
              {selector(densities, density, setDensity)}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Lace Type</h4>
              {selector(laceTypes, lace, setLace)}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button
              onClick={() => { for (let i = 0; i < qty; i++) addToCart(product, length, density); }}
              className="flex-1 rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:brightness-110"
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              onClick={() => { for (let i = 0; i < qty; i++) addToCart(product, length, density); }}
              className="flex-1 rounded-md bg-foreground py-3 text-center text-xs font-bold uppercase tracking-widest text-background transition hover:opacity-90"
            >
              Buy Now
            </Link>
          </div>
          <button onClick={() => toggleWishlist(product.id)} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
            {wished ? "Saved to wishlist" : "Add to wishlist"}
          </button>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
            <div><Truck className="mx-auto h-5 w-5 text-primary" /><p className="mt-1 text-xs font-medium">Fast Delivery</p><p className="text-[11px] text-muted-foreground">2–5 business days</p></div>
            <div><RefreshCcw className="mx-auto h-5 w-5 text-primary" /><p className="mt-1 text-xs font-medium">Easy Returns</p><p className="text-[11px] text-muted-foreground">7-day return policy</p></div>
            <div><ShieldCheck className="mx-auto h-5 w-5 text-primary" /><p className="mt-1 text-xs font-medium">Secure Payment</p><p className="text-[11px] text-muted-foreground">100% safe</p></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-border text-sm font-semibold uppercase tracking-wider">
          {["description", "shipping & returns", "care guide", `reviews (${product.reviews})`].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 pb-3 ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="max-w-3xl py-6 text-sm leading-relaxed text-muted-foreground">
          {tab === "description" && (
            <ul className="list-disc space-y-1 pl-5">
              <li>100% virgin human hair</li>
              <li>Pre-plucked hairline</li>
              <li>Natural hair density</li>
              <li>Can be dyed & styled</li>
              <li>Long lasting & tangle free</li>
            </ul>
          )}
          {tab === "shipping & returns" && <p>Nationwide delivery in 2–5 business days. Free shipping on orders over ₦200,000. 7-day easy returns on unworn wigs with lace intact.</p>}
          {tab === "care guide" && <p>Wash with sulfate-free shampoo, air dry on a wig stand, and detangle gently from ends to roots. Avoid excessive heat to keep the hair silky.</p>}
          {tab.startsWith("reviews") && (
            <div className="space-y-4">
              {["Absolutely love it — melts perfectly!", "Best wig I've ever bought. True to length.", "Fast shipping and gorgeous texture."].map((r, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <Star className="inline h-4 w-4 fill-amber-400 text-amber-400" />
                  <p className="mt-1 italic">"{r}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <div className="mt-16">
        <h2 className="text-center text-2xl font-semibold tracking-wide">YOU MAY ALSO LIKE</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
