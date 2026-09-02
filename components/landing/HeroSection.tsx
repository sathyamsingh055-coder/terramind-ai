'use client';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-block rounded-full bg-green-100 dark:bg-green-900 px-4 py-2">
            <span className="text-sm font-medium text-green-800 dark:text-green-100">
              AI-Powered Crop Intelligence
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold leading-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
            Smart Farming Starts Here
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            TerraMind AI analyzes soil nutrients, climate conditions, and farm
            data to recommend the best crops for your land. Maximize yield,
            reduce waste, and farm smarter.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/recommendation"
              className="rounded-lg bg-green-600 hover:bg-green-700 px-8 py-3 text-center font-semibold text-white transition-colors"
            >
              Get Crop Recommendation
            </a>
            <a
              href="/assistant"
              className="rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 px-8 py-3 text-center font-semibold text-black dark:text-white transition-colors"
            >
              Chat with AI Assistant
            </a>
          </div>

          {/* Decorative element */}
          <div className="mt-16 flex justify-center">
            <div className="h-64 w-64 rounded-full bg-gradient-to-br from-green-100 to-transparent dark:from-green-900/30 blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
