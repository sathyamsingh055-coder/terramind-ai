'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CropRecommendationInput } from '@/types/recommendation';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { SuccessState } from './SuccessState';
import { FlaskConical, CloudSun, MapPin, Sprout, AlertCircle, ArrowLeft } from 'lucide-react';

const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
];

interface FormErrors {
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  ph?: string;
  temperature?: string;
  humidity?: string;
  rainfall?: string;
  location?: string;
  season?: string;
}

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

export function RecommendationForm() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    location: '',
    season: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<CropRecommendationInput | null>(
    null
  );
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.nitrogen) newErrors.nitrogen = 'Nitrogen is required';
    if (!formData.phosphorus)
      newErrors.phosphorus = 'Phosphorus is required';
    if (!formData.potassium) newErrors.potassium = 'Potassium is required';
    if (!formData.ph) newErrors.ph = 'Soil pH is required';
    if (!formData.temperature)
      newErrors.temperature = 'Temperature is required';
    if (!formData.humidity) newErrors.humidity = 'Humidity is required';
    if (!formData.rainfall) newErrors.rainfall = 'Rainfall is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.season) newErrors.season = 'Season is required';

    // Numeric validation
    if (formData.nitrogen && isNaN(Number(formData.nitrogen))) {
      newErrors.nitrogen = 'Must be a valid number';
    }
    if (formData.phosphorus && isNaN(Number(formData.phosphorus))) {
      newErrors.phosphorus = 'Must be a valid number';
    }
    if (formData.potassium && isNaN(Number(formData.potassium))) {
      newErrors.potassium = 'Must be a valid number';
    }
    if (formData.ph && isNaN(Number(formData.ph))) {
      newErrors.ph = 'Must be a valid number';
    }
    if (formData.temperature && isNaN(Number(formData.temperature))) {
      newErrors.temperature = 'Must be a valid number';
    }
    if (formData.humidity && isNaN(Number(formData.humidity))) {
      newErrors.humidity = 'Must be a valid number';
    }
    if (formData.rainfall && isNaN(Number(formData.rainfall))) {
      newErrors.rainfall = 'Must be a valid number';
    }

    // Range validation
    const ph = Number(formData.ph);
    if (formData.ph && (ph < 0 || ph > 14)) {
      newErrors.ph = 'pH must be between 0 and 14';
    }

    const humidity = Number(formData.humidity);
    if (formData.humidity && (humidity < 0 || humidity > 100)) {
      newErrors.humidity = 'Humidity must be between 0 and 100';
    }

    const temp = Number(formData.temperature);
    if (formData.temperature && (temp < -50 || temp > 60)) {
      newErrors.temperature = 'Temperature should be between -50°C and 60°C';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Construct the CropRecommendationInput
    const data: CropRecommendationInput = {
      soil: {
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
      },
      environment: {
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        rainfall: Number(formData.rainfall),
      },
      soilProperties: {
        ph: Number(formData.ph),
      },
      farm: {
        location: formData.location,
        season: formData.season as 'spring' | 'summer' | 'autumn' | 'winter',
      },
    };

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/analyses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error || 'Failed to save farm data');
      }

      const result = (await response.json()) as ApiResponse;
      setSubmittedData(data);
      setApiResponse(result);
      setSubmitted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      setSubmitError(errorMessage);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
      temperature: '',
      humidity: '',
      rainfall: '',
      location: '',
      season: '',
    });
    setErrors({});
    setSubmitted(false);
    setSubmittedData(null);
    setApiResponse(null);
    setSubmitError(null);
  };

  if (submitted && submittedData && apiResponse) {
    return (
      <SuccessState
        data={submittedData}
        apiResponse={apiResponse}
        onReset={handleReset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {submitError && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-100">
                Error saving farm data
              </h3>
              <p className="text-xs text-red-700 dark:text-red-200 mt-1">
                {submitError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Soil Section */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Soil Chemistry & Nutrients
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Primary macronutrient reserves (N, P, K in ppm) and soil pH level
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Nitrogen (N) in ppm"
            name="nitrogen"
            type="number"
            placeholder="e.g., 45"
            value={formData.nitrogen}
            onChange={(val) =>
              setFormData({ ...formData, nitrogen: val as string })
            }
            error={errors.nitrogen}
            required
          />
          <FormInput
            label="Phosphorus (P) in ppm"
            name="phosphorus"
            type="number"
            placeholder="e.g., 35"
            value={formData.phosphorus}
            onChange={(val) =>
              setFormData({ ...formData, phosphorus: val as string })
            }
            error={errors.phosphorus}
            required
          />
          <FormInput
            label="Potassium (K) in ppm"
            name="potassium"
            type="number"
            placeholder="e.g., 180"
            value={formData.potassium}
            onChange={(val) =>
              setFormData({ ...formData, potassium: val as string })
            }
            error={errors.potassium}
            required
          />
          <FormInput
            label="Soil pH Level"
            name="ph"
            type="number"
            placeholder="e.g., 6.5"
            value={formData.ph}
            onChange={(val) => setFormData({ ...formData, ph: val as string })}
            error={errors.ph}
            min={0}
            max={14}
            step={0.1}
            required
          />
        </div>
      </div>

      {/* Environmental Section */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Environmental Conditions
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ambient temperature, relative humidity, and precipitation
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            label="Temperature (°C)"
            name="temperature"
            type="number"
            placeholder="e.g., 25"
            value={formData.temperature}
            onChange={(val) =>
              setFormData({ ...formData, temperature: val as string })
            }
            error={errors.temperature}
            step={0.1}
            required
          />
          <FormInput
            label="Humidity (%)"
            name="humidity"
            type="number"
            placeholder="e.g., 65"
            value={formData.humidity}
            onChange={(val) =>
              setFormData({ ...formData, humidity: val as string })
            }
            error={errors.humidity}
            min={0}
            max={100}
            step={0.1}
            required
          />
          <FormInput
            label="Rainfall (mm)"
            name="rainfall"
            type="number"
            placeholder="e.g., 150"
            value={formData.rainfall}
            onChange={(val) =>
              setFormData({ ...formData, rainfall: val as string })
            }
            error={errors.rainfall}
            step={0.1}
            required
          />
        </div>
      </div>

      {/* Farm Context Section */}
      <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Farm Location & Season
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Regional microclimate context and cropping season
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Location / Region"
            name="location"
            type="text"
            placeholder="e.g., Ludhiana, Punjab"
            value={formData.location}
            onChange={(val) =>
              setFormData({ ...formData, location: val as string })
            }
            error={errors.location}
            required
          />
          <FormSelect
            label="Cropping Season"
            name="season"
            options={SEASONS}
            value={formData.season}
            onChange={(val) =>
              setFormData({ ...formData, season: val })
            }
            error={errors.season}
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-400 disabled:cursor-not-allowed px-6 py-3 text-center text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer"
        >
          <Sprout className="w-4 h-4" />
          <span>{isSubmitting ? 'Analyzing Telemetry...' : 'Generate Crop Recommendation'}</span>
        </button>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-6 py-3 text-center text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
}

