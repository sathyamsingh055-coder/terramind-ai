'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';

export default function RecommendationsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Recommendations</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            View all crop recommendations from your farm analyses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Wheat', 'Rice', 'Sugarcane', 'Corn'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'All'
                  ? 'bg-green-600 text-white'
                  : 'border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {[
            {
              farm: 'Punjab Field A',
              crop: 'Wheat',
              confidence: 94,
              reason: 'Optimal NPK levels for wheat cultivation',
              date: 'Sep 1, 2024',
            },
            {
              farm: 'Punjab Field B',
              crop: 'Rice',
              confidence: 87,
              reason: 'High humidity and rainfall ideal for rice',
              date: 'Aug 25, 2024',
            },
            {
              farm: 'Karnataka Plot',
              crop: 'Sugarcane',
              confidence: 91,
              reason: 'Temperature and soil pH suit sugarcane growth',
              date: 'Aug 18, 2024',
            },
          ].map((rec, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {rec.crop}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{rec.farm}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <span className="text-sm font-medium">{rec.confidence}%</span>
                  </div>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">{rec.reason}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">{rec.date}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
