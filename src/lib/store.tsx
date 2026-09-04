import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { product: Product; qty: number; length: string; density: string };

type Store = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p: Product, length?: string, density?: string) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  subtotal: number;
};

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("chp-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("chp-wishlist", []));

  useEffect(() => {
    window.localStorage.setItem("chp-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    window.localStorage.setItem("chp-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const store: Store = {
    cart,
    wishlist,
    addToCart: (p, length = '22"', density = "180%") =>
      setCart((c) => {
        const found = c.find((i) => i.product.id === p.id && i.length === length);
        if (found)
          return c.map((i) => (i === found ? { ...i, qty: i.qty + 1 } : i));
        return [...c, { product: p, qty: 1, length, density }];
      }),
    removeFromCart: (id) => setCart((c) => c.filter((i) => i.product.id !== id)),
    updateQty: (id, qty) =>
      setCart((c) =>
        qty <= 0
          ? c.filter((i) => i.product.id !== id)
          : c.map((i) => (i.product.id === id ? { ...i, qty } : i)),
      ),
    clearCart: () => setCart([]),
    toggleWishlist: (id) =>
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    subtotal: cart.reduce((s, i) => s + i.qty * i.product.price, 0),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}

export { products };
