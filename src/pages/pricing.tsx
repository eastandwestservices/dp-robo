// pages/pricing.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PricingPage(): JSX.Element {
  // UI state
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [currency, setCurrency] = useState<string>("USD");
  const [locale, setLocale] = useState<string>("en-US");

  // Stripe Price IDs + local amounts
  const PRICES = {
    monthly: { id: "price_monthly_id", amount: 119, mode: "subscription" },
    quarterly: { id: "price_quarterly_id", amount: 299, mode: "subscription" },
    yearly: { id: "price_yearly_id", amount: 399, mode: "subscription" },
    single: { id: "price_single_id", amount: 20, mode: "payment" },
    standard: { id: "price_standard_id", amount: 120, mode: "payment" },
    premium: { id: "price_premium_id", amount: 240, mode: "payment" },
  } as const;

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  // Detect visitor location -> set currency + locale
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/get-location");
        if (!res.ok) return;
        const data = await res.json();
        if (data?.currency) setCurrency(String(data.currency));
        if (data?.locale) setLocale(String(data.locale));
      } catch {
        // fallback to USD/en-US
      }
    })();
  }, []);

  const formatPrice = (amount: number): string => {
    try {
      return new Intl.NumberFormat(locale || "en-US", {
        style: "currency",
        currency: currency || "USD",
      }).format(amount);
    } catch {
      return `${currency} ${amount}`;
    }
  };

  const handleCheckout = async (priceId: string, mode: "subscription" | "payment") => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      if (data?.sessionId) {
        window.location.href = `/success?session_id=${data.sessionId}`;
        return;
      }
      console.error("Unexpected checkout response", data);
      alert("Payment initialization failed. Please try again later.");
    } catch (err) {
      console.error("Checkout error", err);
      alert("Payment initialization failed. Please try again later.");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId, currency }}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-8">
        <h1 className="text-4xl font-bold text-center mb-12">DProbo — Banner Offers</h1>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8 space-x-4">
          {(["monthly", "quarterly", "yearly"] as const).map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBillingCycle(cycle)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                billingCycle === cycle
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-800 shadow hover:bg-gray-100"
              }`}
            >
              {cycle === "monthly" && "Monthly"}
              {cycle === "quarterly" && "3 Months"}
              {cycle === "yearly" && "Yearly"}
            </button>
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Monthly */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Monthly Plan</h2>
            <p className="text-3xl font-bold mb-4">{formatPrice(PRICES.monthly.amount)}/mo</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />50 Banners / Month</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />HTML5 + Static</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />Basic Support</li>
            </ul>
            <button
              type="button"
              onClick={() => handleCheckout(PRICES.monthly.id, PRICES.monthly.mode)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mb-4 hover:bg-blue-700 transition"
            >
              Subscribe (Stripe)
            </button>
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(_, actions) =>
                actions.order.create({
                  purchase_units: [{ amount: { value: PRICES.monthly.amount.toFixed(2), currency_code: currency } }],
                })
              }
              onApprove={(_, actions) =>
                actions.order.capture().then((details: any) =>
                  alert(`Transaction completed by ${details.payer?.name?.given_name || "customer"}`)
                )
              }
            />
          </motion.div>

          {/* Quarterly (Most Popular) */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 rounded-2xl shadow-2xl border-4 border-green-400 relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              Most Popular
            </div>
            <h2 className="text-xl font-semibold mb-2">3-Month Plan</h2>
            <p className="text-3xl font-bold mb-4">{formatPrice(PRICES.quarterly.amount)}/3mo</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="mr-2" />200 Banners / 3 Months</li>
              <li className="flex items-center"><CheckCircle className="mr-2" />HTML5 + Animated</li>
              <li className="flex items-center"><CheckCircle className="mr-2" />Priority Support</li>
            </ul>
            <button
              type="button"
              onClick={() => handleCheckout(PRICES.quarterly.id, PRICES.quarterly.mode)}
              className="w-full bg-white text-green-700 py-3 rounded-xl font-semibold mb-4 hover:bg-gray-100 transition"
            >
              Subscribe (Stripe)
            </button>
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(_, actions) =>
                actions.order.create({
                  purchase_units: [{ amount: { value: PRICES.quarterly.amount.toFixed(2), currency_code: currency } }],
                })
              }
              onApprove={(_, actions) =>
                actions.order.capture().then((details: any) =>
                  alert(`Transaction completed by ${details.payer?.name?.given_name || "customer"}`)
                )
              }
            />
          </motion.div>

          {/* Yearly */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Yearly Plan</h2>
            <p className="text-3xl font-bold mb-4">{formatPrice(PRICES.yearly.amount)}/yr</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />Unlimited Banners</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />All Formats</li>
              <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />Premium Support</li>
            </ul>
            <button
              type="button"
              onClick={() => handleCheckout(PRICES.yearly.id, PRICES.yearly.mode)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mb-4 hover:bg-blue-700 transition"
            >
              Subscribe (Stripe)
            </button>
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(_, actions) =>
                actions.order.create({
                  purchase_units: [{ amount: { value: PRICES.yearly.amount.toFixed(2), currency_code: currency } }],
                })
              }
              onApprove={(_, actions) =>
                actions.order.capture().then((details: any) =>
                  alert(`Transaction completed by ${details.payer?.name?.given_name || "customer"}`)
                )
              }
            />
          </motion.div>
        </div>

        {/* One-time Bundles */}
        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          {(["single", "standard", "premium"] as const).map((bundle) => (
            <div key={bundle} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="font-semibold capitalize">{bundle} Bundle</h3>
              <p className="text-lg font-bold mb-2">{formatPrice(PRICES[bundle].amount)} one-time</p>
              <button
                type="button"
                onClick={() => handleCheckout(PRICES[bundle].id, PRICES[bundle].mode)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 transition"
              >
                Buy Now (Stripe)
              </button>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(_, actions) =>
                  actions.order.create({
                    purchase_units: [{ amount: { value: PRICES[bundle].amount.toFixed(2), currency_code: currency } }],
                  })
                }
                onApprove={(_, actions) =>
                  actions.order.capture().then((details: any) =>
                    alert(`Transaction completed by ${details.payer?.name?.given_name || "customer"}`)
                  )
                }
              />
            </div>
          ))}
        </div>

        {/* Custom Orders */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Custom Orders</h2>
          <form action="/api/custom-order" method="POST" className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <input type="text" name="name" placeholder="Your Name" className="w-full border p-3 rounded-lg" required />
            <input type="email" name="email" placeholder="Your Email" className="w-full border p-3 rounded-lg" required />
            <textarea name="details" placeholder="Tell us your requirements..." className="w-full border p-3 rounded-lg" rows={4} required />
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
              Request Quote
            </button>
          </form>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
