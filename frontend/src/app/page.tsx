import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* === Floating colored shapes (your original style) === */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400 rounded-full opacity-70"></div>
      <div className="absolute top-40 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-70"></div>
      <div className="absolute bottom-10 right-20 w-8 h-8 bg-green-400 rounded-full"></div>
      <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-lg rotate-45"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-300 rounded-full opacity-60"></div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Column */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Secure Your Remote Work,
              <br />
              <span className="text-blue-600">Without Compromise.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              We test, compare, and recommend the best security tools, hardware, and software so you can work from anywhere — safely, efficiently, and confidently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/guides/remote-work-starter"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition inline-block text-center"
              >
                Start Your Secure Setup
              </Link>
              <Link
                href="/reviews/software"
                className="border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-3 px-6 rounded-lg transition inline-block text-center"
              >
                See Top Reviews
              </Link>
            </div>
          </div>

          {/* Right Column - Decorative (simplified to match your aesthetic) */}
          <div className="md:w-1/2 relative">
            <div className="aspect-video bg-gray-50 rounded-xl p-6 flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 6a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Trusted by 50K+ Remote Workers</h3>
                <p className="text-sm text-gray-500 mt-2">Real users. Real results. Zero fluff.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Work Safely & Productively
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Security Tools",
                desc: "Top-rated VPNs, password managers, antivirus, and 2FA keys — tested for privacy, speed, and ease of use.",
                link: "/security-tools",
              },
              {
                title: "Remote Work Gear",
                desc: "Best laptops, headsets, webcams, and ergonomic setups — curated for performance and comfort.",
                link: "/work-from-anywhere",
              },
              {
                title: "Deals & Discounts",
                desc: "Exclusive savings on software, hardware, and cloud services — updated weekly.",
                link: "/deals",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-sm transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <Link
                  href={item.link}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-blue-600 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Secure Remote Workspace?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get our free checklist + exclusive tool discounts sent to your inbox.
          </p>
          <Link
            href="/guides/secure-setup"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Download Free Guide
          </Link>
        </div>
      </section>

      {/* Footer Callout */}
      <section className="py-12 px-4 md:px-8 text-center border-t relative z-10">
        <p className="text-gray-600">
          Trusted by professionals at <strong>Google, Shopify, and Buffer</strong> — and thousands like you.
        </p>
      </section>
    </main>
  );
}