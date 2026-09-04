import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { useState } from "react";
import { formatNaira } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Cynthia_hairpire" },
      { name: "description", content: "Securely complete your wig order." },
      { property: "og:title", content: "Checkout — Cynthia_hairpire" },
      { property: "og:description", content: "Securely complete your wig order." },
    ],
  }),
  component: CheckoutPage,
});

const field = "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

function CheckoutPage() {
  const { cart, subtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [pay, setPay] = useState("card");
  const [shipping, setShipping] = useState(2500);
  const total = subtotal + shipping;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate({ to: "/order-success" });
  };

  if (cart.length === 0)
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">Nothing to check out</h1>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground">
          Shop Wigs
        </Link>
      </div>
    );

  return (
    <form onSubmit={placeOrder} className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Customer Information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required type="email" placeholder="Email address" className={field} />
              <input required placeholder="Phone number" className={field} />
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Shipping Address</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="First name" className={field} />
              <input required placeholder="Last name" className={field} />
              <input required placeholder="Address" className={`${field} sm:col-span-2`} />
              <input required placeholder="City" className={field} />
              <input required placeholder="State" className={field} />
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Delivery</h3>
            <div className="space-y-2 text-sm">
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-border p-3 has-checked:border-primary">
                <span className="flex items-center gap-2"><input type="radio" name="ship" checked={shipping === 2500} onChange={() => setShipping(2500)} className="accent-[#e84393]" /> Standard Delivery (3–5 days)</span>
                <span className="font-semibold">₦2,500</span>
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-border p-3 has-checked:border-primary">
                <span className="flex items-center gap-2"><input type="radio" name="ship" checked={shipping === 6500} onChange={() => setShipping(6500)} className="accent-[#e84393]" /> Express Delivery (1–2 days)</span>
                <span className="font-semibold">₦6,500</span>
              </label>
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Payment Method</h3>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { id: "card", label: "Card", icon: CreditCard },
                { id: "transfer", label: "Transfer", icon: Landmark },
                { id: "ussd", label: "USSD", icon: Smartphone },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPay(m.id)}
                  className={`flex items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium ${pay === m.id ? "border-primary bg-accent text-primary" : "border-border"}`}
                >
                  <m.icon className="h-4 w-4" /> {m.label}
                </button>
              ))}
            </div>
            {pay === "card" && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input required placeholder="Card number" className={`${field} sm:col-span-2`} />
                <input required placeholder="MM / YY" className={field} />
                <input required placeholder="CVV" className={field} />
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-border p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider">Order Summary</h3>
          <div className="mt-4 space-y-3">
            {cart.map((i) => (
              <div key={i.product.id} className="flex items-center gap-3">
                <img src={i.product.image} alt={i.product.name} className="h-14 w-11 rounded object-cover" width={800} height={1000} />
                <div className="flex-1 text-xs">
                  <p className="font-medium">{i.product.name} {i.product.subtitle}</p>
                  <p className="text-muted-foreground">{i.length} · {i.density} · Qty {i.qty}</p>
                </div>
                <span className="text-sm font-semibold">{formatNaira(i.product.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatNaira(shipping)}</span></div>
            <div className="flex justify-between text-base font-bold"><span>Total</span><span>{formatNaira(total)}</span></div>
          </div>
          <button type="submit" className="mt-5 w-full rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110">
            Pay {formatNaira(total)}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">🔒 Secure payment · This is a demo checkout</p>
        </aside>
      </div>
    </form>
  );
}
