import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Wigs — Cynthia_hairpire" },
      { name: "description", content: "Browse lace front, glueless, bob and headband wigs in every texture and length." },
      { property: "og:title", content: "Shop All Wigs — Cynthia_hairpire" },
      { property: "og:description", content: "Browse lace front, glueless, bob and headband wigs in every texture and length." },
    ],
  }),
  component: ShopPage,
});

const categoryOptions = ["Lace Front Wigs", "Glueless Wigs", "Bob Wigs", "Headband Wigs"];
const textureOptions = ["Straight", "Body Wave", "Deep Wave", "Kinky Curly", "Water Wave", "Loose Wave", "Curly"];

function ShopPage() {
  const [cats, setCats] = useState<string[]>([]);
  const [textures, setTextures] = useState<string[]>([]);
  const [sort, setSort] = useState("best");

  const toggle = (list: string[], v: string, set: (v: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (textures.length === 0 || textures.includes(p.texture)),
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cats, textures, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs text-muted-foreground">Home › Shop</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold">Shop All Wigs</h1>
        <p className="text-sm text-muted-foreground">Showing 1–{filtered.length} of {filtered.length} products</p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Filters</h3>
            <input
              placeholder="Search products…"
              className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {categoryOptions.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-2 hover:text-primary">
                    <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, c, setCats)} className="accent-[#e84393]" />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Texture</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {textureOptions.map((t) => (
                <li key={t}>
                  <label className="flex cursor-pointer items-center gap-2 hover:text-primary">
                    <input type="checkbox" checked={textures.includes(t)} onChange={() => toggle(textures, t, setTextures)} className="accent-[#e84393]" />
                    {t}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-6 flex justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
            >
              <option value="best">Sort by: Best Selling</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No wigs match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
