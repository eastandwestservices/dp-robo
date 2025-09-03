import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const linkClasses = (path: string) =>
    router.pathname === path
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "hover:text-blue-600 transition";

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          DProbo
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link href="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link href="/services" className={linkClasses("/services")}>
            Services
          </Link>
          <Link href="/pricing" className={linkClasses("/pricing")}>
            Pricing
          </Link>
          <Link href="/contact" className={linkClasses("/contact")}>
            Contact
          </Link>

          {/* Get Started Button */}
          <Link
            href="/pricing"
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
