import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <header className="w-full flex justify-between items-center max-w-6xl mb-16">
        <h1 className="text-3xl font-bold text-blue-700">DProbo</h1>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">
            Pricing
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-6">Professional Banner Templates</h2>
        <p className="text-lg text-gray-600 mb-8">
          High-quality HTML5, static, and animated banners — available in affordable bundles and subscription plans.
        </p>
        <Link
          href="/pricing"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition"
        >
          View Pricing
        </Link>
      </section>
    </main>
  );
}
