import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2, CreditCard, Wallet } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Cynthia_hairpire" },
      { name: "description", content: "Your order has been placed successfully." },
      { property: "og:title", content: "Order Confirmed — Cynthia_hairpire" },
      { property: "og:description", content: "Your order has been placed successfully." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
      <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
      <h1 className="mt-4 text-3xl font-semibold">Thank you, Queen!</h1>
      <p className="mt-1 text-muted-foreground">Your order has been placed successfully.</p>
      <p className="mt-6 text-sm text-muted-foreground">Order Number</p>
      <p className="text-2xl font-bold text-primary">#CHP-2026-000123</p>
      <p className="mt-2 text-sm text-muted-foreground">A confirmation email has been sent to you.</p>

      <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4 rounded-lg border border-border p-5 text-sm">
        <div><CalendarCheck className="mx-auto h-5 w-5 text-primary" /><p className="mt-1 text-xs text-muted-foreground">Order Date</p><p className="font-medium">Sep 4, 2026</p></div>
        <div><CreditCard className="mx-auto h-5 w-5 text-primary" /><p className="mt-1 text-xs text-muted-foreground">Payment</p><p className="font-medium">Card</p></div>
        <div><Wallet className="mx-auto h-5 w-5 text-primary" /><p className="mt-1 text-xs text-muted-foreground">Total Paid</p><p className="font-medium">Confirmed</p></div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/account" className="rounded-md bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110">
          Track Your Order
        </Link>
        <Link to="/shop" className="rounded-md border border-border px-7 py-3 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary">
          Continue Shopping
        </Link>
      </div>

      <h2 className="mt-20 text-2xl font-semibold tracking-wide">YOU MAY ALSO LIKE</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 text-left lg:grid-cols-4">
        {products.slice(3, 7).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
