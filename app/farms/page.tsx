'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/app-shell/AppLayout';
import Link from 'next/link';
import {
  Sprout,
  Plus,
  Search,
  MapPin,
  FlaskConical,
  Layers,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Filter,
  LayoutGrid,
  List,
  X,
  Bot,
  Edit2,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

export interface Farm {
  id: string;
  name: string;
  location: string;
  region: string;
  acreage: number;
  primaryCrop: string;
  soilType: string;
  healthScore: number;
  healthStatus: 'Optimal' | 'Good' | 'Attention';
  lastAnalysisDate: string;
  analysesCount: number;
  npk: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
  };
  moisture: number;
  notes: string;
  recentAnalyses: Array<{
    id: string;
    date: string;
    crop: string;
    recommendation: string;
    confidence: string;
  }>;
}

const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-1',
    name: 'Punjab Field A',
    location: 'Ludhiana, Punjab',
    region: 'Punjab',
    acreage: 50,
    primaryCrop: 'Wheat (HD 2967)',
    soilType: 'Alluvial Loam',
    healthScore: 92,
    healthStatus: 'Optimal',
    lastAnalysisDate: 'Sep 1, 2024',
    analysesCount: 5,
    npk: {
      nitrogen: 88,
      phosphorus: 52,
      potassium: 210,
      ph: 6.8,
    },
    moisture: 68,
    notes: 'Well-irrigated plot with canal access. Scheduled for winter cereal cycle.',
    recentAnalyses: [
      {
        id: 'rec-1',
        date: 'Sep 1, 2024',
        crop: 'Wheat',
        recommendation: 'Optimal NPK levels for HD 2967 cultivar',
        confidence: '94%',
      },
      {
        id: 'rec-2',
        date: 'Jun 14, 2024',
        crop: 'Mustard',
        recommendation: 'Rotation crop for nitrogen preservation',
        confidence: '89%',
      },
    ],
  },
  {
    id: 'farm-2',
    name: 'Punjab Field B',
    location: 'Amritsar, Punjab',
    region: 'Punjab',
    acreage: 35,
    primaryCrop: 'Basmati Rice',
    soilType: 'Clayey Loam',
    healthScore: 84,
    healthStatus: 'Good',
    lastAnalysisDate: 'Aug 25, 2024',
    analysesCount: 3,
    npk: {
      nitrogen: 74,
      phosphorus: 44,
      potassium: 185,
      ph: 7.1,
    },
    moisture: 78,
    notes: 'High water-retention clay profile. Excellent for paddy cultivation.',
    recentAnalyses: [
      {
        id: 'rec-3',
        date: 'Aug 25, 2024',
        crop: 'Rice',
        recommendation: 'High humidity and rainfall ideal for Basmati',
        confidence: '87%',
      },
    ],
  },
  {
    id: 'farm-3',
    name: 'Karnataka Plot',
    location: 'Mandya, Karnataka',
    region: 'Karnataka',
    acreage: 25,
    primaryCrop: 'Sugarcane (Co 86032)',
    soilType: 'Red Sandy Loam',
    healthScore: 71,
    healthStatus: 'Attention',
    lastAnalysisDate: 'Aug 18, 2024',
    analysesCount: 4,
    npk: {
      nitrogen: 58,
      phosphorus: 38,
      potassium: 165,
      ph: 6.2,
    },
    moisture: 52,
    notes: 'Requires drip irrigation check. Nitrogen level is lower than baseline.',
    recentAnalyses: [
      {
        id: 'rec-4',
        date: 'Aug 18, 2024',
        crop: 'Sugarcane',
        recommendation: 'Temperature favorable, supplement bio-NPK fertilizer',
        confidence: '91%',
      },
      {
        id: 'rec-5',
        date: 'May 02, 2024',
        crop: 'Finger Millet (Ragi)',
        recommendation: 'Suitable during dry drought transition',
        confidence: '93%',
      },
    ],
  },
  {
    id: 'farm-4',
    name: 'Haryana North Farm',
    location: 'Karnal, Haryana',
    region: 'Haryana',
    acreage: 42,
    primaryCrop: 'Corn & Mustard',
    soilType: 'Sandy Loam',
    healthScore: 88,
    healthStatus: 'Optimal',
    lastAnalysisDate: 'Aug 10, 2024',
    analysesCount: 4,
    npk: {
      nitrogen: 82,
      phosphorus: 49,
      potassium: 202,
      ph: 6.7,
    },
    moisture: 62,
    notes: 'Equipped with soil probe sensor telemetry. Balanced micro-nutrients.',
    recentAnalyses: [
      {
        id: 'rec-6',
        date: 'Aug 10, 2024',
        crop: 'Corn (Maize)',
        recommendation: 'Good solar irradiance and drainage for hybrid maize',
        confidence: '92%',
      },
    ],
  },
];

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal / Drawer state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFarmDetails, setSelectedFarmDetails] = useState<Farm | null>(null);
  const [farmToEdit, setFarmToEdit] = useState<Farm | null>(null);

  // Form State for Add / Edit Farm
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    region: 'Punjab',
    acreage: '',
    soilType: 'Alluvial Loam',
    primaryCrop: '',
    notes: '',
  });

  const regions = ['All', 'Punjab', 'Karnataka', 'Haryana'];

  // Filter logic
  const filteredFarms = farms.filter((farm) => {
    const matchesSearch =
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.primaryCrop.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || farm.region === selectedRegion;

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Optimal' && farm.healthStatus === 'Optimal') ||
      (selectedStatus === 'Good' && farm.healthStatus === 'Good') ||
      (selectedStatus === 'Attention' && farm.healthStatus === 'Attention');

    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Summary Metrics calculations
  const totalFarms = farms.length;
  const totalAcreage = farms.reduce((acc, f) => acc + f.acreage, 0);
  const farmsNeedingAttention = farms.filter((f) => f.healthStatus === 'Attention').length;
  const totalAnalyses = farms.reduce((acc, f) => acc + f.analysesCount, 0);

  const handleOpenAddModal = (farm?: Farm) => {
    if (farm) {
      setFarmToEdit(farm);
      setFormData({
        name: farm.name,
        location: farm.location,
        region: farm.region,
        acreage: farm.acreage.toString(),
        soilType: farm.soilType,
        primaryCrop: farm.primaryCrop,
        notes: farm.notes,
      });
    } else {
      setFarmToEdit(null);
      setFormData({
        name: '',
        location: '',
        region: 'Punjab',
        acreage: '',
        soilType: 'Alluvial Loam',
        primaryCrop: '',
        notes: '',
      });
    }
    setIsAddModalOpen(true);
  };

  const handleSaveFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.acreage) return;

    if (farmToEdit) {
      // Edit existing
      setFarms((prev) =>
        prev.map((f) =>
          f.id === farmToEdit.id
            ? {
                ...f,
                name: formData.name,
                location: formData.location,
                region: formData.region,
                acreage: parseFloat(formData.acreage) || f.acreage,
                soilType: formData.soilType,
                primaryCrop: formData.primaryCrop || 'Mixed Crops',
                notes: formData.notes,
              }
            : f
        )
      );
    } else {
      // Create new
      const newFarm: Farm = {
        id: `farm-${Date.now()}`,
        name: formData.name,
        location: formData.location,
        region: formData.region,
        acreage: parseFloat(formData.acreage) || 20,
        soilType: formData.soilType,
        primaryCrop: formData.primaryCrop || 'Seasonal Rotation',
        healthScore: 85,
        healthStatus: 'Good',
        lastAnalysisDate: 'Pending analysis',
        analysesCount: 0,
        npk: {
          nitrogen: 70,
          phosphorus: 45,
          potassium: 190,
          ph: 6.8,
        },
        moisture: 60,
        notes: formData.notes || 'Registered plot awaiting soil diagnostic run.',
        recentAnalyses: [],
      };
      setFarms((prev) => [newFarm, ...prev]);
    }

    setIsAddModalOpen(false);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedStatus('All');
  };

  const getStatusBadge = (status: Farm['healthStatus'], score: number) => {
    if (status === 'Optimal') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          Optimal ({score}%)
        </span>
      );
    }
    if (status === 'Good') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/50">
          <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          Good ({score}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50">
        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
        Needs Attention ({score}%)
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
              <MapPin className="w-4 h-4" />
              <span>Field Asset Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              My Farms & Field Plots
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Register agricultural plots, inspect soil telemetry profiles, and schedule crop recommendations.
            </p>
          </div>

          <button
            onClick={() => handleOpenAddModal()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Farm</span>
          </button>
        </div>

        {/* 2. Farm Overview Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total Farms
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {totalFarms}
              </p>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Registered plots
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total Acreage
              </span>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {totalAcreage}{' '}
                <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">acres</span>
              </p>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Managed land
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Attention Needed
              </span>
              <div
                className={`p-2 rounded-lg ${
                  farmsNeedingAttention > 0
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    : 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {farmsNeedingAttention}
              </p>
              <span
                className={`text-xs font-medium ${
                  farmsNeedingAttention > 0
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {farmsNeedingAttention > 0 ? 'Action required' : 'All optimal'}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Soil Analyses
              </span>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <FlaskConical className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {totalAnalyses}
              </p>
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                Historic tests
              </span>
            </div>
          </div>
        </div>

        {/* 3. Search and Filters Toolbar */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search farms by name, location, or crop..."
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

            {/* Filter Buttons & View Mode */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Region Filter */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Region:</span>
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                {regions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg === 'All' ? 'All Regions' : reg}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="All">All Health Statuses</option>
                <option value="Optimal">Optimal</option>
                <option value="Good">Good</option>
                <option value="Attention">Needs Attention</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700 p-0.5 bg-zinc-100 dark:bg-zinc-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Farm Cards / List Views */}
        {filteredFarms.length === 0 ? (
          /* 7. Empty State */
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              No farms found matching your criteria
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              We couldn’t find any registered plots for &ldquo;{searchQuery || selectedRegion}&rdquo;. Try resetting your filters.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={() => handleOpenAddModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Farm</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarms.map((farm) => (
              <div
                key={farm.id}
                className="group relative rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {farm.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{farm.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAddModal(farm)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Edit Farm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    {getStatusBadge(farm.healthStatus, farm.healthScore)}
                  </div>

                  {/* Farm Attributes */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-100 dark:border-zinc-800 text-xs">
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Acreage</span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {farm.acreage} Acres
                      </p>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Primary Crop</span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 truncate">
                        {farm.primaryCrop}
                      </p>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Soil Type</span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {farm.soilType}
                      </p>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Analyses Logged</span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {farm.analysesCount} tests
                      </p>
                    </div>
                  </div>

                  {/* Telemetry Micro-Bar */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                      <span>NPK Balance Index</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                        {farm.healthScore}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          farm.healthStatus === 'Optimal'
                            ? 'bg-emerald-500'
                            : farm.healthStatus === 'Good'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${farm.healthScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedFarmDetails(farm)}
                    className="flex-1 py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/recommendation"
                    className="py-2.5 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/40 transition-colors flex items-center justify-center gap-1"
                    title="Run Soil Diagnostic"
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Analyze</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead>
                  <tr className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-800/40">
                    <th className="py-3.5 px-6">Farm & Location</th>
                    <th className="py-3.5 px-4">Size</th>
                    <th className="py-3.5 px-4">Primary Crop</th>
                    <th className="py-3.5 px-4">Soil Profile</th>
                    <th className="py-3.5 px-4">Health Status</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Analyses</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                  {filteredFarms.map((farm) => (
                    <tr
                      key={farm.id}
                      className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {farm.name}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{farm.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {farm.acreage} Acres
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {farm.primaryCrop}
                      </td>
                      <td className="py-4 px-4 text-xs text-zinc-600 dark:text-zinc-400">
                        {farm.soilType}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(farm.healthStatus, farm.healthScore)}
                      </td>
                      <td className="py-4 px-4 text-xs text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                        {farm.analysesCount} logged
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedFarmDetails(farm)}
                            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleOpenAddModal(farm)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                            title="Edit Farm"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Add / Edit Farm Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-lg w-full overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {farmToEdit ? 'Edit Farm Plot' : 'Register New Farm Plot'}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Specify field boundaries and primary soil characteristics.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveFarm} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Farm Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Punjab Field C or Western Orchard"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Location / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patiala, Punjab"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Region / State
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Other">Other Region</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Acreage (Acres) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="e.g. 45"
                      value={formData.acreage}
                      onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Soil Type
                    </label>
                    <select
                      value={formData.soilType}
                      onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                    >
                      <option value="Alluvial Loam">Alluvial Loam</option>
                      <option value="Clayey Loam">Clayey Loam</option>
                      <option value="Red Sandy Loam">Red Sandy Loam</option>
                      <option value="Black Cotton Soil">Black Cotton Soil</option>
                      <option value="Laterite Soil">Laterite Soil</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Primary / Planned Crop
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wheat, Basmati Rice, Sugarcane"
                    value={formData.primaryCrop}
                    onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Agronomic Field Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add irrigation details, historical crop rotation, or specific drainage conditions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    {farmToEdit ? 'Save Changes' : 'Save Farm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 6. Farm Details Drawer / Modal */}
        {selectedFarmDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
              {/* Drawer Header */}
              <div className="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {selectedFarmDetails.region}
                    </span>
                    {getStatusBadge(selectedFarmDetails.healthStatus, selectedFarmDetails.healthScore)}
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {selectedFarmDetails.name}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedFarmDetails.location}</span>
                    <span className="mx-1.5">•</span>
                    <span>{selectedFarmDetails.acreage} Acres</span>
                    <span className="mx-1.5">•</span>
                    <span>{selectedFarmDetails.soilType}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedFarmDetails(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                {/* Agronomic Summary */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Plot Overview & Field Notes
                  </h3>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {selectedFarmDetails.notes}
                  </div>
                </div>

                {/* Telemetry NPK & Health */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                    Soil Telemetry & Nutrient Composition
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        Nitrogen (N)
                      </span>
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                        {selectedFarmDetails.npk.nitrogen} mg/kg
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Balanced
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        Phosphorus (P)
                      </span>
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                        {selectedFarmDetails.npk.phosphorus} mg/kg
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Optimal
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        Potassium (K)
                      </span>
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                        {selectedFarmDetails.npk.potassium} mg/kg
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        High retention
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        Soil pH
                      </span>
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                        {selectedFarmDetails.npk.ph} pH
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Neutral / Ideal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis History */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                    Recent Soil Analyses & Crop Recommendations
                  </h3>

                  {selectedFarmDetails.recentAnalyses.length === 0 ? (
                    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 text-center">
                      No analyses logged yet for this field. Run a new analysis to generate crop recommendations.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {selectedFarmDetails.recentAnalyses.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {item.crop}
                              </span>
                              <span className="text-[11px] text-zinc-400">• {item.date}</span>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                              {item.recommendation}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                            {item.confidence}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Ask AI Agronomist</span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const toEdit = selectedFarmDetails;
                      setSelectedFarmDetails(null);
                      handleOpenAddModal(toEdit);
                    }}
                    className="px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Edit Info
                  </button>
                  <Link
                    href="/recommendation"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Sprout className="w-4 h-4" />
                    <span>Run New Soil Analysis</span>
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

