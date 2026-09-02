'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage your account and application preferences.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="max-w-3xl space-y-6">
          {/* Profile Settings */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Profile Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-black dark:text-white">Email Notifications</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Receive recommendation alerts
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" disabled />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <p className="font-medium text-black dark:text-white">Dark Mode</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Use dark theme
                  </p>
                </div>
                <input type="checkbox" className="w-5 h-5" disabled />
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Support & Information
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Help Center
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Documentation
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
