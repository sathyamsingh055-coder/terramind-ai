'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';

export default function FarmsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">My Farms</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Manage your farm locations and view soil analysis history.
            </p>
          </div>
          <button className="rounded-lg bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-medium transition-colors">
            Add Farm
          </button>
        </div>

        {/* Farms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Punjab Field A',
              location: 'Punjab, India',
              size: '50 acres',
              analyses: 5,
            },
            {
              name: 'Punjab Field B',
              location: 'Punjab, India',
              size: '35 acres',
              analyses: 3,
            },
            {
              name: 'Karnataka Plot',
              location: 'Karnataka, India',
              size: '25 acres',
              analyses: 4,
            },
          ].map((farm, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-lg dark:hover:shadow-lg/20 transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {farm.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {farm.location}
                  </p>
                </div>
                <button className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Size: <span className="font-medium text-black dark:text-white">{farm.size}</span>
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Analyses: <span className="font-medium text-black dark:text-white">{farm.analyses}</span>
                </p>
              </div>
              <button className="w-full rounded-lg border border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 px-3 py-2 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
