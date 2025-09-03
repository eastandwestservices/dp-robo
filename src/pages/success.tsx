// /pages/success.tsx
import { GetServerSideProps } from "next";
import Stripe from "stripe";
import { useRouter } from "next/router";

interface SessionData {
  id?: string;
  customer_email?: string;
  customer_details?: {
    name?: string;
    email?: string;
  };
  amount_total?: number;
  currency?: string;
  payment_status?: string;
}

interface SuccessPageProps {
  session: SessionData | null;
}

export default function SuccessPage({ session }: SuccessPageProps) {
  const router = useRouter();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">
            ⚠️ Could not fetch order details
          </h1>
          <p className="mb-4">
            Please check your email for confirmation of your payment.
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-lg mb-6">
          Thank you for your purchase,{" "}
          {session.customer_details?.name || "Customer"}!
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 text-left space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            {session.customer_details?.email || session.customer_email}
          </p>
          <p>
            <strong>Amount Paid:</strong>{" "}
            {session.amount_total
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: session.currency?.toUpperCase() || "USD",
                }).format(session.amount_total / 100)
              : "—"}
          </p>
          <p>
            <strong>Status:</strong> {session.payment_status}
          </p>
        </div>

        <button
          onClick={() => router.push("/pricing")}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Back to Pricing
        </button>
      </div>
    </div>
  );
}

// ✅ Server-Side Fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { session_id } = context.query;

  if (!session_id || typeof session_id !== "string") {
    return { props: { session: null } };
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-08-16",
    });

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer", "payment_intent"],
    });

    return { props: { session: JSON.parse(JSON.stringify(session)) } };
  } catch (err) {
    console.error("❌ Error fetching Stripe session:", err);
    return { props: { session: null } };
  }
};
