import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Heart, RefreshCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cynthia_hairpire — Luxury Human Hair Wigs" },
      { name: "description", content: "Enhancing confidence with elegantly crafted wigs made to suit you. Shop lace front, glueless and bob wigs." },
      { property: "og:title", content: "Cynthia_hairpire — Luxury Human Hair Wigs" },
      { property: "og:description", content: "Enhancing confidence with elegantly crafted wigs made to suit you." },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: BadgeCheck, label: "100% Human Hair" },
  { icon: Sparkles, label: "Premium Quality" },
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: Truck, label: "Fast & Reliable Delivery" },
  { icon: RefreshCcw, label: "Easy Returns" },
];

const testimonials = [
  { quote: "The quality is out of this world! The wig is soft, bouncy and so natural.", name: "Amaka P." },
  { quote: "Fast delivery and amazing customer service. I'll always shop here!", name: "Beverly O." },
  { quote: "Cynthia_hairpire never disappoints. My favorite hair, every time.", name: "Tolu M." },
];

function Index() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground">
        <img
          src={hero}
          alt="Model wearing a luxury straight lace front wig"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6">
          <h1 className="max-w-md text-4xl font-light leading-tight text-background sm:text-5xl">
            Enhancing confidence with{" "}
            <span className="text-primary">elegantly crafted wigs</span> made to suit you…..
          </h1>
          <p className="mt-4 text-sm tracking-[0.25em] text-background/70">LUXURY. QUALITY. YOU.</p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/shop"
              className="rounded-md bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:brightness-110"
            >
              Shop Wigs
            </Link>
            <Link
              to="/collections"
              className="rounded-md border border-background/60 px-7 py-3 text-xs font-bold uppercase tracking-widest text-background transition hover:border-primary hover:text-primary"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4 py-10 sm:px-6">
          {perks.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-2 text-center">
              <p.icon className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-wide">SHOP BY CATEGORY</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.name} to="/shop" className="group text-center">
              <div className="overflow-hidden rounded-full">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="aspect-square w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm font-medium group-hover:text-primary">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured wigs */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-wide">FEATURED WIGS</h2>
          <Link to="/shop" className="text-sm font-medium text-primary hover:underline">
            Shop All Wigs →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
          {[
            { icon: Sparkles, title: "Premium Human Hair", text: "Long-lasting & durable" },
            { icon: BadgeCheck, title: "Expertly Crafted", text: "By professionals" },
            { icon: ShieldCheck, title: "Transparent Pricing", text: "No hidden fees" },
            { icon: Heart, title: "Loved By Thousands", text: "Across Nigeria & beyond" },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <f.icon className="mx-auto h-7 w-7 text-primary" />
              <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-wide">WHAT OUR CLIENTS SAY</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-lg border border-border bg-card p-6">
              <div className="text-primary">★★★★★</div>
              <blockquote className="mt-3 text-sm italic text-muted-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram strip */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-wide">FOLLOW US @CYNTHIA_HAIRPIRE</h2>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="overflow-hidden rounded-md">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-square w-full object-cover object-top transition hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-wide">JOIN OUR HAIRPIRE FAMILY</h2>
          <p className="mt-2 text-sm text-muted-foreground">Get exclusive offers, new arrivals and hair care tips.</p>
          <form className="mx-auto mt-6 flex max-w-md overflow-hidden rounded-md border border-border bg-background" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            />
            <button className="bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
