'use client';

import React from 'react';
import { Bot, RotateCcw, LayoutPanelLeft } from 'lucide-react';

interface AssistantHeaderProps {
  messageCount: number;
  onReset: () => void;
  showContextPanel: boolean;
  onToggleContextPanel: () => void;
}

export function AssistantHeader({
  messageCount,
  onReset,
  showContextPanel,
  onToggleContextPanel,
}: AssistantHeaderProps) {
  return (
    <header className="shrink-0 px-4 sm:px-6 py-3.5 border-b border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs flex items-center justify-between gap-3 z-10">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white shadow-xs">
          <Bot className="w-5 h-5" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-900" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-50 truncate tracking-tight">
              TerraMind AI Agronomist
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online & Ready
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            Specialized crop intelligence, nutrient management & agronomic advisory
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onToggleContextPanel}
          title={showContextPanel ? 'Hide Farm Telemetry Context' : 'Show Farm Telemetry Context'}
          className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            showContextPanel
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
          }`}
        >
          <LayoutPanelLeft className="w-3.5 h-3.5" />
          <span>{showContextPanel ? 'Context Active' : 'Farm Context'}</span>
        </button>

        {messageCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-red-600 dark:hover:text-red-400 transition-colors shadow-2xs cursor-pointer"
            title="Start a new conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        )}
      </div>
    </header>
  );
}
