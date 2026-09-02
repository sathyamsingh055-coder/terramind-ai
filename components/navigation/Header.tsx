'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 dark:bg-green-700">
              <span className="text-sm font-bold text-white">TM</span>
            </div>
            <span className="text-xl font-bold text-black dark:text-white">
              TerraMind
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden gap-6 md:flex items-center">
            <a
              href="/dashboard"
              className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/recommendation"
              className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Recommendations
            </a>
            <a
              href="/assistant"
              className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              AI Assistant
            </a>
            <a
              href="/dashboard"
              className="rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors ml-2"
            >
              Launch App
            </a>
          </nav>

          {/* Mobile Menu Placeholder */}
          <button className="md:hidden p-2 text-zinc-700 dark:text-zinc-300">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
