import { createFileRoute } from "@tanstack/react-router";
import { Heart, LayoutDashboard, LogOut, MapPin, Package, Settings, Truck } from "lucide-react";
import { useState } from "react";
import { formatNaira, products } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Cynthia_hairpire" },
      { name: "description", content: "Track orders, manage addresses and view your Hairpire points." },
      { property: "og:title", content: "My Account — Cynthia_hairpire" },
      { property: "og:description", content: "Track orders, manage addresses and view your Hairpire points." },
    ],
  }),
  component: AccountPage,
});

const orders = [
  { id: "#CHP-2026-000123", date: "Sep 4, 2026", total: 315700, status: "Processing" },
  { id: "#CHP-2026-000118", date: "Aug 21, 2026", total: 108000, status: "Delivered" },
  { id: "#CHP-2026-000102", date: "Jul 30, 2026", total: 125000, status: "Delivered" },
];

const statusColor: Record<string, string> = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

const steps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

function AccountPage() {
  const [tab, setTab] = useState("Dashboard");

  const nav = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Package, label: "My Orders" },
    { icon: Truck, label: "Order Tracking" },
    { icon: Heart, label: "Wishlist" },
    { icon: MapPin, label: "Saved Addresses" },
    { icon: Settings, label: "Account Settings" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">Welcome back, Amaka Johnson</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {nav.map((n) => (
            <button
              key={n.label}
              onClick={() => setTab(n.label)}
              className={`flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                tab === n.label ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
          <button className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </aside>

        <div>
          {tab === "Dashboard" && (
            <>
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { label: "Total Orders", value: "12" },
                  { label: "Total Spent", value: "₦1,245,000" },
                  { label: "Wishlist Items", value: "8" },
                  { label: "Loyalty Points", value: "348" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-border p-5 text-center">
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-10 text-lg font-semibold">Recent Orders</h3>
              <div className="mt-4 space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <img src={products[0].image} alt="" className="h-12 w-10 rounded object-cover" width={800} height={1000} />
                      <div>
                        <p className="font-medium">{o.id}</p>
                        <p className="text-xs text-muted-foreground">{o.date}</p>
                      </div>
                    </div>
                    <span className="font-semibold">{formatNaira(o.total)}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "Order Tracking" && (
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold">Track Your Order <span className="text-primary">#CHP-2026-000123</span></h3>
              <div className="mt-8 flex items-center">
                {steps.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold ${i <= 2 ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                        {i + 1}
                      </div>
                      <p className={`mt-2 whitespace-nowrap text-[11px] ${i <= 2 ? "font-semibold text-primary" : "text-muted-foreground"}`}>{s}</p>
                    </div>
                    {i < steps.length - 1 && <div className={`mx-1 h-0.5 flex-1 ${i < 2 ? "bg-primary" : "bg-border"}`} />}
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
                <div><p className="text-xs text-muted-foreground">Carrier</p><p className="font-medium">DHL Express</p></div>
                <div><p className="text-xs text-muted-foreground">Tracking Number</p><p className="font-medium">1234567890</p></div>
                <div><p className="text-xs text-muted-foreground">Estimated Delivery</p><p className="font-medium">Sep 8 – Sep 10, 2026</p></div>
              </div>
            </div>
          )}

          {tab === "My Orders" && (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4 text-sm">
                  <p className="font-medium">{o.id}</p>
                  <p className="text-muted-foreground">{o.date}</p>
                  <span className="font-semibold">{formatNaira(o.total)}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "Saved Addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Home", addr: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria" },
                { label: "Work", addr: "88 Freedom Way, Ikoyi, Lagos, Nigeria" },
              ].map((a) => (
                <div key={a.label} className="rounded-lg border border-border p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4 text-primary" /> {a.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{a.addr}</p>
                </div>
              ))}
            </div>
          )}

          {(tab === "Wishlist" || tab === "Account Settings") && (
            <p className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
              {tab === "Wishlist" ? "View your saved wigs on the Wishlist page (heart icon in the header)." : "Profile editing coming soon — this is a demo account."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
