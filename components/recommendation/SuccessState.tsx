'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  Sprout,
  Sparkles,
  Bot,
  RotateCcw,
  ListFilter,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  CloudRain,
  FlaskConical,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
  Clock,
} from 'lucide-react';
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
  const [showTelemetryDetails, setShowTelemetryDetails] = useState(false);

  // Date formatting
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const locationName = data.farm.location || apiResponse.data.farm.location || 'Regional Plot';
  const seasonName =
    data.farm.season.charAt(0).toUpperCase() + data.farm.season.slice(1);

  // Determine primary recommendation details based on telemetry
  const isHighMoisture = data.environment.rainfall > 200 || data.environment.humidity > 70;
  const primaryCrop = isHighMoisture
    ? {
        name: 'Basmati Rice',
        variety: 'Pusa Basmati 1121',
        category: 'Cereals',
        confidence: 94,
        status: 'Highly Recommended',
        sowingWindow: 'Jun 15 – Jul 10',
        expectedYield: '3.8 – 4.5 Ton/ha',
        growthDuration: '140 – 145 Days',
        waterRequirement: 'High (Irrigated/Puddled)',
        summary:
          'High ambient humidity and adequate rainfall profile provide ideal physiological conditions for rapid tillering and superior panicle development.',
      }
    : {
        name: 'Wheat',
        variety: 'HD 2967 (Kalyan Lineage)',
        category: 'Cereals',
        confidence: 93,
        status: 'Highly Recommended',
        sowingWindow: 'Oct 20 – Nov 15',
        expectedYield: '4.8 – 5.4 Ton/ha',
        growthDuration: '135 – 145 Days',
        waterRequirement: 'Medium (4–5 Critical Irrigations)',
        summary:
          'Balanced soil pH and favorable temperature gradients create optimal conditions for crown root initiation and grain filling.',
      };

  const alternativeCrops = [
    {
      name: 'Sugarcane',
      variety: 'Co 86032 (Nayana)',
      category: 'Cash Crop',
      confidence: 89,
      status: 'Viable with Amendments',
      sowingWindow: 'Jan 15 – Mar 01',
      yield: '110 – 125 Ton/ha',
      reason: 'Favorable thermal degree days; requires drip lateral calibration.',
      suitability: 89,
    },
    {
      name: 'Hybrid Maize (Corn)',
      variety: 'DKC 9108 Hybrid',
      category: 'Cereals & Fodder',
      confidence: 86,
      status: 'Secondary Alternative',
      sowingWindow: 'Jun 20 – Jul 15',
      yield: '6.5 – 7.2 Ton/ha',
      reason: 'Fast 100-day harvest turnaround; top-dress with split nitrogen.',
      suitability: 86,
    },
    {
      name: 'Soybean',
      variety: 'JS 335',
      category: 'Oilseeds & Legumes',
      confidence: 83,
      status: 'Secondary Alternative',
      sowingWindow: 'Jun 15 – Jul 05',
      yield: '2.2 – 2.5 Ton/ha',
      reason: 'Fixes biological nitrogen into soil; benefits subsequent crop rotation.',
      suitability: 83,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Result Header */}
      <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Crop Recommendation Dossier</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80">
                <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Demonstration UI Result</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Agronomic Matching Analysis
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
              <span className="flex items-center gap-1 font-medium text-zinc-800 dark:text-zinc-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {locationName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {seasonName} Season
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                Analyzed on {formattedDate}
              </span>
              <span>•</span>
              <span className="font-mono text-[11px] text-zinc-400">
                ID: {apiResponse.analysisId.slice(0, 12)}...
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <Link
              href={`/assistant?query=${encodeURIComponent(
                `Can you provide an actionable crop management plan for planting ${primaryCrop.name} (${primaryCrop.variety}) in ${locationName} during the ${seasonName} season?`
              )}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask TerraMind AI</span>
            </Link>

            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="mt-4 pt-4 border-t border-emerald-200/40 dark:border-emerald-900/40 flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Demonstration Preview:</strong> The recommendation metrics, confidence ratings, and agronomic insights below demonstrate the TerraMind AI presentation layer using standard agronomic benchmarks. Live machine learning model inference will be integrated in Phase 3.
          </span>
        </div>
      </div>

      {/* 2. Primary Recommendation Hero Card */}
      <div className="rounded-2xl border-2 border-emerald-500/30 dark:border-emerald-500/30 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Primary Recommendation
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {primaryCrop.category}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {primaryCrop.name}
              </h2>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                Cultivar: {primaryCrop.variety}
              </p>
            </div>

            {/* Confidence Score Pill */}
            <div className="flex flex-col items-start md:items-end gap-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-lg font-black">{primaryCrop.confidence}%</span>
                  <span className="text-xs font-medium ml-1.5">Confidence Match</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {primaryCrop.status}
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mb-6">
            {primaryCrop.summary}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Optimal Sowing
              </span>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                {primaryCrop.sowingWindow}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Projected Yield
              </span>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                {primaryCrop.expectedYield}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Growth Cycle
              </span>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                {primaryCrop.growthDuration}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Water Regime
              </span>
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm truncate">
                {primaryCrop.waterRequirement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Confidence Visualization & 4. Crop Suitability Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Overall Compatibility Breakdown */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Compatibility Breakdown
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Overall: {primaryCrop.confidence}%
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Multi-factor agronomic alignment evaluated across physical soil chemistry, macronutrients, and microclimate.
            </p>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Soil Physical & Chemical Fit
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">96%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    Microclimate & Temperature Match
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">92%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    NPK Nutrient Availability
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">95%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    Moisture & Precipitation Index
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">91%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '91%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300">
            <strong>Optimal Agronomic Window:</strong> Soil pH of {data.soilProperties.ph} creates low micronutrient fixation risk.
          </div>
        </div>

        {/* Right: Telemetry Specific Fit Indicators (2 columns on desktop) */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Environmental & Soil Parameter Fit
            </h3>
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Parameter Assessment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Soil pH */}
            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Soil pH Reaction
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.soilProperties.ph} pH</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>Target: 6.0 – 7.5</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Optimal</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            {/* Temperature */}
            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Temperature
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.environment.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>Target: 20 – 32°C</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Favorable</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            {/* Humidity */}
            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Relative Humidity
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.environment.humidity}%</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>Target: 60 – 85%</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Well Suited</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>

            {/* Rainfall */}
            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Rainfall / Water Depth
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.environment.rainfall} mm</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>Baseline: &gt;100 mm</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Adequate</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* NPK Summary */}
            <div className="sm:col-span-2 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Nutrient Reserve Balance (N - P - K)
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Balanced Macronutrient Base
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-medium">Nitrogen (N)</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.soil.nitrogen} ppm</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-medium">Phosphorus (P)</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.soil.phosphorus} ppm</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block font-medium">Potassium (K)</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.soil.potassium} ppm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Alternative Crop Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Alternative Crop Recommendations
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Viable secondary crop alternatives evaluated against your field conditions.
            </p>
          </div>
          <span className="text-xs font-medium text-zinc-400">
            {alternativeCrops.length} Viable Options
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternativeCrops.map((alt, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      {alt.category}
                    </span>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {alt.name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {alt.variety}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {alt.confidence}%
                  </span>
                </div>

                <div className="space-y-1.5 my-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Sowing Window:</span>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{alt.sowingWindow}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Expected Yield:</span>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{alt.yield}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {alt.reason}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Link
                  href={`/assistant?query=${encodeURIComponent(
                    `How can I grow ${alt.name} (${alt.variety}) as an alternative on my farm in ${locationName}?`
                  )}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  <span>Explore with AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Agronomic Guidance & Action Plan */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Agronomic Guidance & Action Plan
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Actionable cultivation recommendations customized to your field telemetry profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Key Advantages */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Key Crop Advantages
            </h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
              <li className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                Optimal pH balance ({data.soilProperties.ph}) minimizes micronutrient fixation and optimizes root nutrient uptake.
              </li>
              <li className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                Climate temperature ({data.environment.temperature}°C) aligns with the vegetative initiation phase.
              </li>
              <li className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                High commercial market demand and established export supply-chain for this cultivar.
              </li>
            </ul>
          </div>

          {/* Considerations & Interventions */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Agronomic Considerations
            </h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
              <li className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                Apply basal NPK at sowing and plan split urea top-dressing at crown root initiation stage (day 21–25).
              </li>
              <li className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                Monitor field drainage to prevent localized water stagnation during early root establishment.
              </li>
              <li className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                Implement alternate wetting & drying (AWD) to save up to 25% irrigation water.
              </li>
            </ul>
          </div>

          {/* Suggested Next Steps */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Suggested Next Steps
            </h4>
            <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  1
                </span>
                <span>Procure certified foundation seeds ({primaryCrop.variety}) from an authorized agricultural station.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  2
                </span>
                <span>Perform deep tillage and laser land levelling prior to pre-sowing irrigation.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  3
                </span>
                <span>Consult TerraMind AI Agronomist to generate a weekly fertigation and crop protection schedule.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Submitted Telemetry Summary (Expandable Accordion) */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
        <button
          onClick={() => setShowTelemetryDetails(!showTelemetryDetails)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Submitted Field Telemetry Inputs
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                View the exact soil chemistry and climatic parameters submitted for this analysis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span>{showTelemetryDetails ? 'Hide Details' : 'View Inputs'}</span>
            {showTelemetryDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showTelemetryDetails && (
          <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Nitrogen (N)</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.soil.nitrogen} ppm</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Phosphorus (P)</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.soil.phosphorus} ppm</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Potassium (K)</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.soil.potassium} ppm</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Soil pH Reaction</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.soilProperties.ph} pH</span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Ambient Temperature</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.environment.temperature}°C</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Relative Humidity</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.environment.humidity}%</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Estimated Rainfall</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.environment.rainfall} mm</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-400 block font-medium">Location & Season</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                  {locationName} ({seasonName})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/assistant?query=${encodeURIComponent(
              `I received a recommendation for ${primaryCrop.name} (${primaryCrop.variety}) on my farm in ${locationName}. What fertilizers and water schedule should I prepare?`
            )}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask TerraMind AI Agronomist</span>
          </Link>

          <Link
            href="/recommendations"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-semibold transition-colors cursor-pointer"
          >
            <ListFilter className="w-4 h-4" />
            <span>View All Recommendations</span>
          </Link>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Run Another Analysis</span>
        </button>
      </div>
    </div>
  );
}
