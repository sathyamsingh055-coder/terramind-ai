'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';
import Link from 'next/link';
import {
  Sprout,
  Bot,
  MapPin,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Compass,
} from 'lucide-react';

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const stats = [
    {
      label: 'Active Farms',
      value: '3',
      change: '+1 this season',
      trend: 'up',
      icon: MapPin,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/40',
    },
    {
      label: 'Soil Analyses',
      value: '12',
      change: '+3 this month',
      trend: 'up',
      icon: FlaskConical,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800/40',
    },
    {
      label: 'Recommendations',
      value: '8',
      change: '94% avg confidence',
      trend: 'neutral',
      icon: Sparkles,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/40',
    },
    {
      label: 'Average Soil Health',
      value: '88%',
      change: 'Optimal index',
      trend: 'up',
      icon: ShieldCheck,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/40',
      border: 'border-green-200 dark:border-green-800/40',
    },
  ];

  const soilMetrics = [
    {
      name: 'Nitrogen (N)',
      value: '84 mg/kg',
      target: '70 - 100 mg/kg',
      status: 'Optimal',
      percentage: 84,
      statusColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/30',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Phosphorus (P)',
      value: '48 mg/kg',
      target: '40 - 65 mg/kg',
      status: 'Good',
      percentage: 72,
      statusColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/30',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Potassium (K)',
      value: '195 mg/kg',
      target: '180 - 240 mg/kg',
      status: 'Balanced',
      percentage: 81,
      statusColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/30',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Soil pH',
      value: '6.8 pH',
      target: '6.0 - 7.5 pH',
      status: 'Optimal',
      percentage: 68,
      statusColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/30',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Soil Moisture',
      value: '64%',
      target: '60% - 80%',
      status: 'Adequate',
      percentage: 64,
      statusColor: 'text-blue-700 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/30',
      barColor: 'bg-blue-500',
    },
    {
      name: 'Temperature Index',
      value: '27.5 °C',
      target: '22 - 32 °C',
      status: 'Favorable',
      percentage: 75,
      statusColor: 'text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/30',
      barColor: 'bg-amber-500',
    },
  ];

  const recentAnalyses = [
    {
      farm: 'Punjab Field A',
      location: 'Ludhiana, Punjab',
      crop: 'Wheat (HD 2967)',
      date: '2 days ago',
      soilStatus: 'High Organic Matter',
      recommendationStatus: 'Recommended',
      confidence: '94%',
    },
    {
      farm: 'Punjab Field B',
      location: 'Amritsar, Punjab',
      crop: 'Basmati Rice',
      date: '1 week ago',
      soilStatus: 'Moderate Moisture',
      recommendationStatus: 'Recommended',
      confidence: '89%',
    },
    {
      farm: 'Karnataka Plot',
      location: 'Mandya, Karnataka',
      crop: 'Sugarcane (Co 86032)',
      date: '2 weeks ago',
      soilStatus: 'Slightly Alkaline',
      recommendationStatus: 'Under Review',
      confidence: '91%',
    },
    {
      farm: 'Haryana North Farm',
      location: 'Karnal, Haryana',
      crop: 'Mustard (Pusa Bold)',
      date: '3 weeks ago',
      soilStatus: 'Balanced NPK',
      recommendationStatus: 'Recommended',
      confidence: '92%',
    },
  ];

  const quickActions = [
    {
      title: 'Analyze New Field',
      description: 'Input soil test parameters and microclimate data for crop recommendations.',
      href: '/recommendation',
      icon: Sprout,
      cta: 'Start Analysis',
      badge: 'Core Tool',
      bgHover: 'group-hover:border-emerald-500 dark:group-hover:border-emerald-500',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
    },
    {
      title: 'View Recommendations',
      description: 'Review suitability scores, yield projections, and seasonal planting advice.',
      href: '/recommendations',
      icon: Layers,
      cta: 'Browse History',
      badge: '8 Active',
      bgHover: 'group-hover:border-blue-500 dark:group-hover:border-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
    },
    {
      title: 'Manage Farms',
      description: 'Register land plots, track acreage, and organize field-level test records.',
      href: '/farms',
      icon: Compass,
      cta: 'Manage Plots',
      badge: '3 Farms',
      bgHover: 'group-hover:border-amber-500 dark:group-hover:border-amber-500',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
    },
    {
      title: 'Ask AI Agronomist',
      description: 'Get real-time answers for pest control, fertilizer ratios, and crop health.',
      href: '/assistant',
      icon: Bot,
      cta: 'Open Chat',
      badge: 'AI Assistant',
      bgHover: 'group-hover:border-purple-500 dark:group-hover:border-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
    },
  ];

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* 1. Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Sprout className="w-4 h-4" />
              <span>TerraMind Agricultural Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Good morning, Farmer
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Monitor soil health telemetry, manage field plots, and generate AI-guided crop recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              <span>{currentDate}</span>
            </div>
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-semibold shadow-xs transition-colors"
            >
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Ask TerraMind AI</span>
            </Link>
            <Link
              href="/recommendation"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors"
            >
              <Sprout className="w-4 h-4" />
              <span>New Crop Analysis</span>
            </Link>
          </div>
        </div>

        {/* 2. Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs transition-all hover:shadow-md dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. AI Insight Card & Farm Health Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insight Panel (1 Col on Desktop) */}
          <div className="lg:col-span-1 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-zinc-900 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>AI Field Advisory</span>
                </div>
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Updated Today
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Nitrogen Balancing Advisory
              </h3>

              <div className="mt-3 p-3.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-emerald-100 dark:border-emerald-900/40 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                &ldquo;Your recent soil analysis for <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Punjab Field A</strong> shows balanced potassium and ideal pH (6.8), but nitrogen is tapering. We recommend a supplementary bio-fertilizer top-up before the next cereal cycle.&rdquo;
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Phosphorus & Potassium at peak retention</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Nitrogen reserve requires monitoring in 14 days</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                AI demonstration insight
              </span>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
              >
                <span>Consult Agronomist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Farm Health Overview Telemetry (2 Cols on Desktop) */}
          <div className="lg:col-span-2 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Soil Health & Microclimate Overview</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Aggregate telemetry indicators averaged across active farm plots.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>88 / 100 Health Score</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soilMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {metric.name}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${metric.statusColor}`}
                    >
                      {metric.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {metric.value}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Target: {metric.target}
                    </span>
                  </div>

                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${metric.barColor}`}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  Avg Temp: 27.5°C
                </span>
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  Avg Humidity: 71%
                </span>
              </div>
              <Link
                href="/recommendation"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Run New Diagnostic</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Recent Analyses Table / Activity List */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Recent Soil Analyses & Crop Predictions</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Past evaluations submitted across your registered farm plots.
              </p>
            </div>
            <Link
              href="/recommendations"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 self-start sm:self-auto"
            >
              <span>View All Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-6 sm:px-0">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead>
                  <tr className="text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Farm & Location</th>
                    <th className="pb-3 px-4">Recommended Crop</th>
                    <th className="pb-3 px-4 hidden md:table-cell">Soil Profile</th>
                    <th className="pb-3 px-4">Confidence</th>
                    <th className="pb-3 px-4 hidden sm:table-cell">Date</th>
                    <th className="pb-3 pl-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm">
                  {recentAnalyses.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.farm}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          <span>{item.location}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-zinc-800 dark:text-zinc-200">
                        <div className="flex items-center gap-1.5">
                          <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{item.crop}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {item.soilStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.confidence}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">
                        {item.date}
                      </td>

                      <td className="py-3.5 pl-4 text-right">
                        <Link
                          href="/recommendations"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 5. Quick Actions Section */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Quick Operations
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Access core workflows to analyze soil, manage plots, and consult the AI assistant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className={`group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs transition-all hover:shadow-md ${action.bgHover}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-lg ${action.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                        {action.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      {action.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>{action.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

