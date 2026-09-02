'use client';

import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/app-shell/AppLayout';
import Link from 'next/link';
import {
  Sprout,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  X,
  Bot,
  RotateCcw,
  ShieldCheck,
  Wheat,
  SlidersHorizontal,
} from 'lucide-react';

export interface CropRecommendation {
  id: string;
  crop: string;
  variety: string;
  category: 'Cereals' | 'Cash Crops' | 'Oilseeds' | 'Legumes' | 'Pulses';
  farm: string;
  location: string;
  date: string;
  confidence: number;
  status: 'Highly Recommended' | 'Viable with Amendments' | 'Secondary Alternative';
  sowingWindow: string;
  expectedYield: string;
  growthDuration: string;
  suitability: {
    soil: number;
    climate: number;
    npk: number;
    ph: number;
  };
  telemetryInput: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    temperature: number;
    humidity: number;
    rainfall: number;
    season: string;
  };
  advantages: string[];
  considerations: string[];
  recommendedAction: string;
}

const MOCK_RECOMMENDATIONS: CropRecommendation[] = [
  {
    id: 'rec-1',
    crop: 'Wheat',
    variety: 'HD 2967 (Kalyan Sona lineage)',
    category: 'Cereals',
    farm: 'Punjab Field A',
    location: 'Ludhiana, Punjab',
    date: 'Sep 1, 2024',
    confidence: 94,
    status: 'Highly Recommended',
    sowingWindow: 'Oct 20 – Nov 15',
    expectedYield: '4.8 – 5.4 Ton/ha',
    growthDuration: '135 – 145 days',
    suitability: {
      soil: 96,
      climate: 92,
      npk: 94,
      ph: 95,
    },
    telemetryInput: {
      nitrogen: 88,
      phosphorus: 52,
      potassium: 210,
      ph: 6.8,
      temperature: 24.5,
      humidity: 62,
      rainfall: 110,
      season: 'Rabi (Winter)',
    },
    advantages: [
      'Optimal soil pH (6.8) maximizes phosphorus uptake without micronutrient lockup.',
      'Canal irrigation access aligns with critical tillering and crown root initiation stages.',
      'High genetic resistance to yellow rust in Ludhiana climate zone.',
    ],
    considerations: [
      'Apply basal NPK at sowing; monitor nitrogen reserve at 45 days for secondary urea top-up.',
      'Ensure field drainage prior to initial pre-sowing irrigation to prevent seedling rot.',
    ],
    recommendedAction: 'Proceed with certified seed procurement (100 kg/ha) and schedule pre-sowing tillage.',
  },
  {
    id: 'rec-2',
    crop: 'Basmati Rice',
    variety: 'Pusa Basmati 1121',
    category: 'Cereals',
    farm: 'Punjab Field B',
    location: 'Amritsar, Punjab',
    date: 'Aug 25, 2024',
    confidence: 89,
    status: 'Highly Recommended',
    sowingWindow: 'Jun 15 – Jul 10',
    expectedYield: '3.8 – 4.4 Ton/ha',
    growthDuration: '140 – 145 days',
    suitability: {
      soil: 90,
      climate: 94,
      npk: 86,
      ph: 88,
    },
    telemetryInput: {
      nitrogen: 74,
      phosphorus: 44,
      potassium: 185,
      ph: 7.1,
      temperature: 31.0,
      humidity: 78,
      rainfall: 420,
      season: 'Kharif (Monsoon)',
    },
    advantages: [
      'High ambient humidity (78%) promotes healthy panicle development.',
      'Clayey loam substrate provides superior standing water retention.',
      'Premium market realization value for export-grade grain length.',
    ],
    considerations: [
      'Potassium supplementation recommended during panicle initiation to prevent lodging.',
      'Implement alternate wetting and drying (AWD) water management to save 25% canal water.',
    ],
    recommendedAction: 'Prepare nursery bed with organic compost and organize laser land levelling.',
  },
  {
    id: 'rec-3',
    crop: 'Sugarcane',
    variety: 'Co 86032 (Nayana)',
    category: 'Cash Crops',
    farm: 'Karnataka Plot',
    location: 'Mandya, Karnataka',
    date: 'Aug 18, 2024',
    confidence: 91,
    status: 'Highly Recommended',
    sowingWindow: 'Jan 15 – Mar 01',
    expectedYield: '110 – 130 Ton/ha',
    growthDuration: '330 – 360 days',
    suitability: {
      soil: 88,
      climate: 95,
      npk: 89,
      ph: 92,
    },
    telemetryInput: {
      nitrogen: 78,
      phosphorus: 48,
      potassium: 195,
      ph: 6.6,
      temperature: 28.5,
      humidity: 68,
      rainfall: 850,
      season: 'Suru / Annual',
    },
    advantages: [
      'Abundant solar radiation index in Mandya belt accelerates sucrose synthesis.',
      'Co 86032 cultivar exhibits superior drought recovery and high tillering capacity.',
      'Deep root system exploits subsoil moisture reservoirs effectively.',
    ],
    considerations: [
      'Install drip fertigation emitters to optimize nitrogen delivery during formative phase.',
      'Monitor for early shoot borer during the initial 60 days post-sett planting.',
    ],
    recommendedAction: 'Order two-budded certified setts and calibrate subsurface drip lateral lines.',
  },
  {
    id: 'rec-4',
    crop: 'Mustard',
    variety: 'Pusa Bold (RH 30)',
    category: 'Oilseeds',
    farm: 'Haryana North Farm',
    location: 'Karnal, Haryana',
    date: 'Aug 10, 2024',
    confidence: 92,
    status: 'Highly Recommended',
    sowingWindow: 'Sep 25 – Oct 15',
    expectedYield: '2.0 – 2.5 Ton/ha',
    growthDuration: '110 – 125 days',
    suitability: {
      soil: 93,
      climate: 90,
      npk: 92,
      ph: 94,
    },
    telemetryInput: {
      nitrogen: 82,
      phosphorus: 49,
      potassium: 202,
      ph: 6.7,
      temperature: 22.0,
      humidity: 58,
      rainfall: 80,
      season: 'Rabi (Winter)',
    },
    advantages: [
      'High oil content (~40%) with bold uniform seed characteristics.',
      'Low irrigation requirement (only 2 critical irrigations needed post-germination).',
      'Short growing cycle allows efficient land turnaround for early spring pulses.',
    ],
    considerations: [
      'Sow when average day temperature falls below 28°C to prevent seedling blight.',
      'Apply elemental sulphur (20 kg/ha) at soil preparation to increase oil percentage.',
    ],
    recommendedAction: 'Incorporate single superphosphate (SSP) during primary tillage before October sowing.',
  },
  {
    id: 'rec-5',
    crop: 'Corn (Maize)',
    variety: 'DKC 9108 Hybrid',
    category: 'Cereals',
    farm: 'Haryana North Farm',
    location: 'Karnal, Haryana',
    date: 'Jul 28, 2024',
    confidence: 88,
    status: 'Viable with Amendments',
    sowingWindow: 'Jun 20 – Jul 15',
    expectedYield: '6.5 – 7.2 Ton/ha',
    growthDuration: '95 – 105 days',
    suitability: {
      soil: 85,
      climate: 88,
      npk: 84,
      ph: 92,
    },
    telemetryInput: {
      nitrogen: 65,
      phosphorus: 42,
      potassium: 175,
      ph: 6.9,
      temperature: 30.5,
      humidity: 70,
      rainfall: 320,
      season: 'Kharif',
    },
    advantages: [
      'High responsiveness to nitrogen top-dressing with strong cob girth.',
      'Excellent dual-purpose suitability (grain yield + cattle fodder residue).',
    ],
    considerations: [
      'Nitrogen level (65 mg/kg) is slightly below ideal hybrid threshold (80 mg/kg).',
      'Requires raised bed planting if heavy monsoon showers occur to prevent water-logging.',
    ],
    recommendedAction: 'Incorporate 25 kg/ha basal DAP and plan split nitrogen top-dressing at knee-high stage.',
  },
  {
    id: 'rec-6',
    crop: 'Chickpea (Gram)',
    variety: 'Pusa 372 (Desi Gram)',
    category: 'Pulses',
    farm: 'Punjab Field A',
    location: 'Ludhiana, Punjab',
    date: 'Jul 15, 2024',
    confidence: 86,
    status: 'Secondary Alternative',
    sowingWindow: 'Oct 10 – Nov 05',
    expectedYield: '1.8 – 2.2 Ton/ha',
    growthDuration: '130 – 140 days',
    suitability: {
      soil: 86,
      climate: 89,
      npk: 84,
      ph: 90,
    },
    telemetryInput: {
      nitrogen: 55,
      phosphorus: 40,
      potassium: 170,
      ph: 7.0,
      temperature: 20.0,
      humidity: 55,
      rainfall: 90,
      season: 'Rabi',
    },
    advantages: [
      'Symbiotic Rhizobium nodules replenish biological soil nitrogen for future cereals.',
      'Extremely drought-tolerant deep taproot architecture.',
    ],
    considerations: [
      'Avoid plots with water retention tendency; chickpea is sensitive to root rot in heavy soil.',
      'Seed inoculation with Rhizobium and PSB bio-fertilizers is mandatory.',
    ],
    recommendedAction: 'Treat seeds with Trichoderma viride before broadcast or seed drill sowing.',
  },
  {
    id: 'rec-7',
    crop: 'Soybean',
    variety: 'JS 335 / JS 95-60',
    category: 'Oilseeds',
    farm: 'Karnataka Plot',
    location: 'Mandya, Karnataka',
    date: 'Jun 30, 2024',
    confidence: 84,
    status: 'Viable with Amendments',
    sowingWindow: 'Jun 15 – Jul 05',
    expectedYield: '2.2 – 2.6 Ton/ha',
    growthDuration: '90 – 100 days',
    suitability: {
      soil: 82,
      climate: 86,
      npk: 80,
      ph: 88,
    },
    telemetryInput: {
      nitrogen: 50,
      phosphorus: 36,
      potassium: 160,
      ph: 6.4,
      temperature: 29.0,
      humidity: 74,
      rainfall: 550,
      season: 'Kharif',
    },
    advantages: [
      'Short duration crop offering fast liquidity and crop-rotation nitrogen replenishment.',
      'Stable demand from domestic oilseed processing facilities.',
    ],
    considerations: [
      'Soil phosphorus is lower than optimal for nodule formation; apply single superphosphate.',
      'Ensure well-drained red loam soil to avoid collar rot during early germination.',
    ],
    recommendedAction: 'Apply 50 kg/ha Single Super Phosphate (SSP) at soil preparation stage.',
  },
  {
    id: 'rec-8',
    crop: 'Cotton',
    variety: 'Bt Cotton (Bollgard II)',
    category: 'Cash Crops',
    farm: 'Punjab Field B',
    location: 'Amritsar, Punjab',
    date: 'Jun 10, 2024',
    confidence: 90,
    status: 'Highly Recommended',
    sowingWindow: 'Apr 15 – May 15',
    expectedYield: '2.4 – 2.9 Ton/ha (Seed Cotton)',
    growthDuration: '160 – 175 days',
    suitability: {
      soil: 91,
      climate: 92,
      npk: 88,
      ph: 90,
    },
    telemetryInput: {
      nitrogen: 80,
      phosphorus: 46,
      potassium: 200,
      ph: 7.2,
      temperature: 34.0,
      humidity: 60,
      rainfall: 380,
      season: 'Summer / Kharif',
    },
    advantages: [
      'High thermal degree days in northern plains maximize boll size and lint maturation.',
      'Deep rooting pattern utilizes deep nutrient reserves in alluvial soil.',
    ],
    considerations: [
      'Maintain strict whitefly monitoring protocol in early vegetative phase.',
      'Avoid excessive vegetative nitrogen flushing during flowering stage.',
    ],
    recommendedAction: 'Install yellow sticky traps and schedule balanced potassium nitrate foliar spray at peak flowering.',
  },
];

export default function RecommendationsPage() {
  const [recommendations] = useState<CropRecommendation[]>(MOCK_RECOMMENDATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConfidence, setSelectedConfidence] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'confidence' | 'date' | 'yield'>('confidence');

  // Drawer / Modal state
  const [selectedRecDetails, setSelectedRecDetails] = useState<CropRecommendation | null>(null);

  const categories = ['All', 'Cereals', 'Cash Crops', 'Oilseeds', 'Pulses'];

  // Summary Metrics calculations
  const totalRecommendations = recommendations.length;
  const highConfidenceCount = recommendations.filter((r) => r.confidence >= 90).length;
  const avgConfidence = (
    recommendations.reduce((acc, r) => acc + r.confidence, 0) / totalRecommendations
  ).toFixed(1);
  const uniqueFarmsCount = new Set(recommendations.map((r) => r.farm)).size;

  // Filtering and Sorting
  const filteredRecommendations = useMemo(() => {
    return recommendations
      .filter((rec) => {
        const matchesSearch =
          rec.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.variety.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All' || rec.category === selectedCategory;

        const matchesConfidence =
          selectedConfidence === 'All' ||
          (selectedConfidence === 'high' && rec.confidence >= 90) ||
          (selectedConfidence === 'moderate' && rec.confidence < 90 && rec.confidence >= 80);

        const matchesStatus =
          selectedStatus === 'All' ||
          (selectedStatus === 'highly' && rec.status === 'Highly Recommended') ||
          (selectedStatus === 'amendments' && rec.status === 'Viable with Amendments') ||
          (selectedStatus === 'alternative' && rec.status === 'Secondary Alternative');

        return matchesSearch && matchesCategory && matchesConfidence && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'confidence') return b.confidence - a.confidence;
        if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return b.crop.localeCompare(a.crop);
      });
  }, [recommendations, searchQuery, selectedCategory, selectedConfidence, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedConfidence('All');
    setSelectedStatus('All');
    setSortBy('confidence');
  };

  const getStatusBadge = (status: CropRecommendation['status'], confidence: number) => {
    if (status === 'Highly Recommended') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{confidence}% Match</span>
        </span>
      );
    }
    if (status === 'Viable with Amendments') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/50">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{confidence}% (Amendments)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>{confidence}% (Secondary)</span>
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* 1. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Crop Matching Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Crop Recommendations
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              TerraMind helps farmers evaluate suitable crops by matching historical soil telemetry, regional climate profiles, and seasonal sowing windows.
            </p>
          </div>

          <Link
            href="/recommendation"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Sprout className="w-4 h-4" />
            <span>New Crop Analysis</span>
          </Link>
        </div>

        {/* 2. Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total Recommendations
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Wheat className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {totalRecommendations}
              </p>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Generated suggestions
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                High Confidence (≥90%)
              </span>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {highConfidenceCount}
              </p>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Optimal compatibility
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Average Confidence
              </span>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {avgConfidence}%
              </p>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                Aggregate model score
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Farms Analyzed
              </span>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {uniqueFarmsCount}
              </p>
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                Active farm plots
              </span>
            </div>
          </div>
        </div>

        {/* 3. Search and Filtering Toolbar */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by crop, cultivar, farm name, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Sorting */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Crop:</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Crop Categories' : cat}
                  </option>
                ))}
              </select>

              {/* Confidence Filter */}
              <select
                value={selectedConfidence}
                onChange={(e) => setSelectedConfidence(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="All">All Confidence Levels</option>
                <option value="high">High Match (≥ 90%)</option>
                <option value="moderate">Moderate Match (80 - 89%)</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="highly">Highly Recommended</option>
                <option value="amendments">Viable with Amendments</option>
                <option value="alternative">Secondary Alternative</option>
              </select>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 ml-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'confidence' | 'date' | 'yield')}
                className="text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="confidence">Highest Confidence</option>
                <option value="date">Most Recent Analysis</option>
                <option value="yield">Crop Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="flex items-center gap-1.5 italic">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Showing agronomic prediction profiles based on demonstration soil telemetry inputs.
            </span>
            <span className="text-[11px] font-semibold text-zinc-400">
              {filteredRecommendations.length} of {totalRecommendations} matching records
            </span>
          </div>
        </div>

        {/* 4. Recommendation Cards Grid */}
        {filteredRecommendations.length === 0 ? (
          /* 6. Empty State */
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400 mb-4">
              <Wheat className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              No recommendations found matching your filters
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              We couldn&rsquo;t find any crop recommendations matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try resetting your filters.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <Link
                href="/recommendation"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>New Crop Analysis</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="group relative rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Crop & Farm */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {rec.category}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          {rec.growthDuration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {rec.crop}
                      </h3>
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {rec.variety}
                      </p>
                    </div>

                    {getStatusBadge(rec.status, rec.confidence)}
                  </div>

                  {/* Farm Location & Date */}
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="flex items-center gap-1 font-medium text-zinc-800 dark:text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {rec.farm} ({rec.location})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {rec.date}
                    </span>
                  </div>

                  {/* 3-Point Suitability Indicators */}
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 mb-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium block">
                        Soil Health
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          {rec.suitability.soil}%
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Optimal
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${rec.suitability.soil}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium block">
                        Microclimate
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          {rec.suitability.climate}%
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Favorable
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${rec.suitability.climate}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium block">
                        NPK Balance
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          {rec.suitability.npk}%
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Suited
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${rec.suitability.npk}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sowing Window & Yield */}
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div className="p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">
                        Recommended Sowing
                      </span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{rec.sowingWindow}</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">
                        Expected Yield (Est.)
                      </span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{rec.expectedYield}</span>
                      </p>
                    </div>
                  </div>

                  {/* Key Agronomic Summary */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-2">
                    {rec.advantages[0]}
                  </p>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRecDetails(rec)}
                    className="flex-1 py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Crop Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/assistant?query=${encodeURIComponent(
                      `What are the best agronomic practices and fertilizer schedule for planting ${rec.crop} (${rec.variety}) on ${rec.farm}?`
                    )}`}
                    className="py-2.5 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/40 transition-colors flex items-center justify-center gap-1.5"
                    title="Consult AI Agronomist on this crop"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. Recommendation Detail Drawer / Modal */}
        {selectedRecDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {selectedRecDetails.category}
                    </span>
                    {getStatusBadge(selectedRecDetails.status, selectedRecDetails.confidence)}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {selectedRecDetails.crop}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {selectedRecDetails.variety}
                    </span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedRecDetails.farm} ({selectedRecDetails.location})</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedRecDetails(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                {/* Agronomic Snapshot */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      Sowing Window
                    </span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {selectedRecDetails.sowingWindow}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      Expected Yield (Est.)
                    </span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {selectedRecDetails.expectedYield}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      Growth Duration
                    </span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {selectedRecDetails.growthDuration}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      Season
                    </span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                      {selectedRecDetails.telemetryInput.season}
                    </p>
                  </div>
                </div>

                {/* Compatibility Breakdown */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                    Suitability & Compatibility Breakdown
                  </h3>
                  <div className="space-y-3 p-4 rounded-xl bg-zinc-50/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          Soil Physical Profile & Texture Match
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {selectedRecDetails.suitability.soil}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${selectedRecDetails.suitability.soil}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          Temperature & Microclimate Compatibility ({selectedRecDetails.telemetryInput.temperature}°C, {selectedRecDetails.telemetryInput.humidity}% Humidity)
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {selectedRecDetails.suitability.climate}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${selectedRecDetails.suitability.climate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          Nutrient Baseline Suitability (N: {selectedRecDetails.telemetryInput.nitrogen}, P: {selectedRecDetails.telemetryInput.phosphorus}, K: {selectedRecDetails.telemetryInput.potassium})
                        </span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {selectedRecDetails.suitability.npk}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${selectedRecDetails.suitability.npk}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Advantages */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Key Agronomic Advantages
                  </h3>
                  <div className="space-y-2">
                    {selectedRecDetails.advantages.map((adv, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Considerations & Potential Risks */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Agronomic Considerations & Interventions
                  </h3>
                  <div className="space-y-2">
                    {selectedRecDetails.considerations.map((cons, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-xs text-zinc-800 dark:text-zinc-200"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{cons}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Action Plan */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Suggested Next Action
                  </h3>
                  <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 text-xs leading-relaxed flex items-start gap-3">
                    <Sprout className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-zinc-100">{selectedRecDetails.recommendedAction}</p>
                      <p className="text-zinc-400 text-[11px] mt-1">
                        Analysis logged on {selectedRecDetails.date}. Recalculate if soil moisture or precipitation swings significantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                  Agronomic recommendation dossier
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRecDetails(null)}
                    className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    href={`/assistant?query=${encodeURIComponent(
                      `Give me a complete planting schedule and pest protection roadmap for ${selectedRecDetails.crop} on ${selectedRecDetails.farm}.`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Consult AI Agronomist</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
