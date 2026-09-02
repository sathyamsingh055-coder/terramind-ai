'use client';

import React from 'react';
import {
  Sprout,
  FlaskConical,
  ShieldAlert,
  CalendarCheck,
  Sparkles,
  ArrowUpRight,
  Bot,
} from 'lucide-react';

interface WelcomeEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

interface PromptCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  prompts: string[];
}

const CATEGORIES: PromptCategory[] = [
  {
    title: 'Crop Planning',
    icon: Sprout,
    accentColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
    prompts: [
      'Which crop is best for my soil?',
      'What is the ideal pH for wheat?',
    ],
  },
  {
    title: 'Soil & Nutrients',
    icon: FlaskConical,
    accentColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60',
    prompts: [
      'How can I improve nitrogen levels?',
      'What does low potassium mean?',
    ],
  },
  {
    title: 'Crop Health',
    icon: ShieldAlert,
    accentColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
    prompts: [
      'How do I identify nutrient deficiency?',
      'How can I prevent common crop diseases?',
    ],
  },
  {
    title: 'Farm Management',
    icon: CalendarCheck,
    accentColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60',
    prompts: [
      'When should I irrigate?',
      'Help me plan my next planting cycle.',
    ],
  },
];

export function WelcomeEmptyState({ onSelectPrompt }: WelcomeEmptyStateProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 flex flex-col items-center justify-center text-center">
      {/* Intro Icon & Title */}
      <div className="relative mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
        <Bot className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
        How can I help your farm today?
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
        TerraMind AI combines agronomic sciences, soil chemistry intelligence, and climate benchmarks to provide expert guidance on sowing, crop protection, and yield maximization.
      </p>

      {/* Categorized Prompt Chips Grid */}
      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
        {CATEGORIES.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <div
              key={catIdx}
              className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg border ${cat.accentColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {cat.title}
                </span>
              </div>

              <div className="space-y-2">
                {cat.prompts.map((promptText, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => onSelectPrompt(promptText)}
                    className="w-full group flex items-center justify-between gap-2 p-2.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-900 dark:hover:text-emerald-200 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all text-left cursor-pointer"
                  >
                    <span className="truncate">{promptText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
