'use client';

import Link from 'next/link';
import { CropRecommendationInput } from '@/types/recommendation';

interface ApiResponse {
  success: boolean;
  farmId: string;
  analysisId: string;
  data: {
    farm: {
      id: string;
      name: string;
      location: string;
      created_at: string;
    };
    analysis: {
      id: string;
      farm_id: string;
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      temperature: number;
      humidity: number;
      soil_ph: number;
      rainfall: number;
      season: string;
      created_at: string;
    };
  };
}

interface SuccessStateProps {
  data: CropRecommendationInput;
  apiResponse: ApiResponse;
  onReset: () => void;
}

export function SuccessState({ data, apiResponse, onReset }: SuccessStateProps) {
  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              Farm Data Saved Successfully!
            </h3>
            <p className="mt-2 text-sm text-green-800 dark:text-green-200">
              Your farm and environmental data has been saved to the database. Soon, we&apos;ll provide AI-powered crop recommendations.
            </p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-300 font-mono">
              Analysis ID: {apiResponse.analysisId}
            </p>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Soil Section */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h4 className="font-semibold text-black dark:text-white mb-4">
            Soil Nutrients (ppm)
          </h4>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Nitrogen (N)</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.soil.nitrogen}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Phosphorus (P)</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.soil.phosphorus}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Potassium (K)</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.soil.potassium}
              </dd>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-3">
              <dt className="text-zinc-600 dark:text-zinc-400">Soil pH</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.soilProperties.ph}
              </dd>
            </div>
          </dl>
        </div>

        {/* Environment Section */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h4 className="font-semibold text-black dark:text-white mb-4">
            Environmental Conditions
          </h4>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Temperature</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.environment.temperature}°C
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Humidity</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.environment.humidity}%
              </dd>
            </div>
            <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-3">
              <dt className="text-zinc-600 dark:text-zinc-400">Rainfall</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.environment.rainfall} mm
              </dd>
            </div>
          </dl>
        </div>

        {/* Farm Context Section */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:col-span-2">
          <h4 className="font-semibold text-black dark:text-white mb-4">
            Farm Context
          </h4>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Location</dt>
              <dd className="font-medium text-black dark:text-white">
                {data.farm.location}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600 dark:text-zinc-400">Season</dt>
              <dd className="font-medium text-black dark:text-white capitalize">
                {data.farm.season}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 px-6 py-3 text-center font-semibold text-white transition-colors"
        >
          Analyze Another Farm
        </button>
        <Link
          href="/"
          className="flex-1 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 py-3 text-center font-semibold text-black dark:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
