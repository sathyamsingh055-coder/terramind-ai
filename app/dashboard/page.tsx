'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Welcome to TerraMind AI. View your farms and recent crop recommendations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Farms', value: '3' },
            { label: 'Analyses', value: '12' },
            { label: 'Recommendations', value: '8' },
            { label: 'Upcoming Season', value: 'Summer' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
            >
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
              <p className="text-2xl font-bold text-black dark:text-white mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Analyses */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Recent Analyses</h2>
          <div className="space-y-4">
            {[
              {
                farm: 'Punjab Field A',
                crop: 'Wheat',
                date: '2 days ago',
                status: 'Recommended',
              },
              {
                farm: 'Punjab Field B',
                crop: 'Rice',
                date: '1 week ago',
                status: 'Analyzing',
              },
              {
                farm: 'Karnataka Plot',
                crop: 'Sugarcane',
                date: '2 weeks ago',
                status: 'Recommended',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-4 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-black dark:text-white">{item.farm}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.crop}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.date}</p>
                  <p
                    className={`text-sm font-medium mt-1 ${
                      item.status === 'Recommended'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
