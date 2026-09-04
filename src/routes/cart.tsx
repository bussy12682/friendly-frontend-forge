import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { formatNaira } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Cynthia_hairpire" },
      { name: "description", content: "Review the wigs in your cart and proceed to checkout." },
      { property: "og:title", content: "Your Cart — Cynthia_hairpire" },
      { property: "og:description", content: "Review the wigs in your cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, subtotal } = useStore();

  if (cart.length === 0)
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our collections and find your perfect wig.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">Your Cart ({cart.length})</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-border pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:grid">
            <span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Total</span>
          </div>
          {cart.map((item) => (
            <div key={item.product.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-border py-5">
              <div className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.name} className="h-20 w-16 rounded-md object-cover" width={800} height={1000} />
                <div>
                  <Link to="/product/$productId" params={{ productId: item.product.id }} className="text-sm font-medium hover:text-primary">
                    {item.product.name} {item.product.subtitle}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.length} · {item.density}</p>
                </div>
              </div>
              <span className="text-sm">{formatNaira(item.product.price)}</span>
              <div className="flex items-center gap-2">
                <button className="h-7 w-7 rounded border border-border" onClick={() => updateQty(item.product.id, item.qty - 1)}>−</button>
                <span className="w-6 text-center text-sm">{item.qty}</span>
                <button className="h-7 w-7 rounded border border-border" onClick={() => updateQty(item.product.id, item.qty + 1)}>+</button>
              </div>
              <div className="flex items-center justify-end gap-3">
                <span className="text-sm font-semibold">{formatNaira(item.product.price * item.qty)}</span>
                <button aria-label="Remove" onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-primary">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            ← Continue Shopping
          </Link>
        </div>

        <aside className="h-fit rounded-lg border border-border p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider">Cart Totals</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-muted-foreground">Calculated at checkout</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold"><span>Total</span><span>{formatNaira(subtotal)}</span></div>
          </div>
          <Link to="/checkout" className="mt-5 block rounded-md bg-primary py-3 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110">
            Proceed to Checkout
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">♡ You earn 348 Hairpire points with this order</p>
        </aside>
      </div>
    </div>
  );
}
