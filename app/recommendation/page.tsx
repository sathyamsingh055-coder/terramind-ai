'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';
import { RecommendationForm } from '@/components/recommendation/RecommendationForm';

export default function RecommendationPage() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Get Crop Recommendation
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Enter your farm details to get AI-powered crop recommendations.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl">
          <RecommendationForm />
        </div>
      </div>
    </AppLayout>
  );
}
