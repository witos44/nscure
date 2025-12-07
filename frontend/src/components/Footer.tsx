import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold mb-3">SecureRemote</h2>
          <p className="text-sm text-gray-600">
            Security tools, remote job guides, and trusted reviews for working safely from anywhere.
          </p>
        </div>

        {/* Security Tools */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Security Tools
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/vpn">Best VPNs</FooterLink>
            <FooterLink href="/password-managers">Password Managers</FooterLink>
            <FooterLink href="/antivirus">Antivirus</FooterLink>
            <FooterLink href="/secure-cloud">Secure Cloud Storage</FooterLink>
            <FooterLink href="/hardware-keys">2FA Keys</FooterLink>
          </ul>
        </div>

        {/* Remote Work */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Work From Anywhere
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/remote-jobs">Remote Job Boards</FooterLink>
            <FooterLink href="/remote-tools">Remote Tools</FooterLink>
            <FooterLink href="/best-laptops">Best Laptops</FooterLink>
            <FooterLink href="/best-headsets">Headsets & Webcams</FooterLink>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/resources">Resources</FooterLink>
          </ul>
        </div>
      </div>

      <div className="border-t mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Net Secure. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/affiliate-disclosure" className="hover:underline">
            Affiliate Disclosure
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="hover:text-gray-900 transition">
        {children}
      </Link>
    </li>
  );
}
