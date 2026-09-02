'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';
import { RecommendationForm } from '@/components/recommendation/RecommendationForm';
import { Sparkles, Sprout } from 'lucide-react';
import Link from 'next/link';

export default function RecommendationPage() {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Crop Matching Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Get Crop Recommendation
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Input your field soil chemistry, macro-nutrients, and environmental parameters to generate AI-tailored crop recommendations.
            </p>
          </div>

          <Link
            href="/recommendations"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Saved Recommendations</span>
          </Link>
        </div>

        {/* Form or Success State */}
        <div className="w-full">
          <RecommendationForm />
        </div>
      </div>
    </AppLayout>
  );
}

