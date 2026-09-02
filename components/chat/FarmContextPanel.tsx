'use client';

import React from 'react';
import {
  MapPin,
  FlaskConical,
  Sprout,
  Calendar,
  CloudSun,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import Link from 'next/link';

interface FarmContextPanelProps {
  onInjectContextPrompt?: (contextPrompt: string) => void;
}

export function FarmContextPanel({ onInjectContextPrompt }: FarmContextPanelProps) {
  const farmDemo = {
    name: 'Punjab Field A',
    type: 'Wheat & Rice Paddy',
    location: 'Ludhiana, Punjab',
    soilPh: '6.8 pH (Optimal)',
    nitrogen: '88 ppm',
    phosphorus: '52 ppm',
    potassium: '210 ppm',
    temperature: '24.5 °C',
    humidity: '62%',
    rainfall: '145 mm',
    season: 'Rabi (Winter)',
  };

  const handleAskAboutContext = () => {
    if (onInjectContextPrompt) {
      const prompt = `Based on my current farm telemetry for ${farmDemo.name} in ${farmDemo.location} (Soil pH ${farmDemo.soilPh}, N: ${farmDemo.nitrogen}, P: ${farmDemo.phosphorus}, K: ${farmDemo.potassium}, Season: ${farmDemo.season}), what specific agronomic adjustments and fertilizer regime should I apply?`;
      onInjectContextPrompt(prompt);
    }
  };

  return (
    <div className="w-full lg:w-72 shrink-0 border-l border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-4 flex flex-col justify-between overflow-y-auto">
      <div className="space-y-4">
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Farm Context</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
            Demo
          </span>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] text-emerald-800 dark:text-emerald-300">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <span>Active telemetry preview for contextual AI responses.</span>
        </div>

        {/* Primary Farm Card */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-2xs space-y-2.5">
          <div>
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Active Field
            </span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
              <span>{farmDemo.name}</span>
              <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400 font-mono">
                50.0 Ha
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-zinc-400" />
              <span>{farmDemo.location}</span>
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-zinc-400 block">Season</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-500" />
                {farmDemo.season}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block">Soil pH</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                <FlaskConical className="w-3 h-3 text-emerald-500" />
                {farmDemo.soilPh}
              </span>
            </div>
          </div>
        </div>

        {/* Macronutrients */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-2xs space-y-2">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Nutrient Profile
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/60">
              <span className="text-[10px] text-zinc-400 block font-bold">N</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{farmDemo.nitrogen}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/60">
              <span className="text-[10px] text-zinc-400 block font-bold">P</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{farmDemo.phosphorus}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/60">
              <span className="text-[10px] text-zinc-400 block font-bold">K</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{farmDemo.potassium}</span>
            </div>
          </div>
        </div>

        {/* Climate Context */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-2xs space-y-1.5">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Environmental Telemetry
          </span>
          <div className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
            <span className="text-zinc-400 flex items-center gap-1">
              <CloudSun className="w-3 h-3" /> Temp / Humidity
            </span>
            <span className="font-semibold">{farmDemo.temperature} • {farmDemo.humidity}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 space-y-2 border-t border-zinc-200 dark:border-zinc-800 mt-4">
        {onInjectContextPrompt && (
          <button
            type="button"
            onClick={handleAskAboutContext}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Ask AI About This Field</span>
          </button>
        )}

        <Link
          href="/recommendation"
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
        >
          <span>Run New Soil Analysis</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
