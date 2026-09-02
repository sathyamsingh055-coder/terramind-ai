'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-4 md:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 dark:bg-green-700">
                  <span className="text-sm font-bold text-white">TM</span>
                </div>
                <span className="font-bold text-black dark:text-white">
                  TerraMind
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                AI-powered crop recommendations for smarter farming.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">
                Product
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              © {currentYear} TerraMind AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
