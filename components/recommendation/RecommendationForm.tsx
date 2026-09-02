'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CropRecommendationInput } from '@/types/recommendation';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { SuccessState } from './SuccessState';

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Alert */}
      {submitError && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-100">
                Error saving farm data
              </h3>
              <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                {submitError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Soil Section */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Soil Information
        </h2>
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
            label="Soil pH"
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
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Environmental Conditions
        </h2>
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
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Farm Context
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Location"
            name="location"
            type="text"
            placeholder="e.g., Punjab, India"
            value={formData.location}
            onChange={(val) =>
              setFormData({ ...formData, location: val as string })
            }
            error={errors.location}
            required
          />
          <FormSelect
            label="Season"
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

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-zinc-400 disabled:cursor-not-allowed px-6 py-3 text-center font-semibold text-white transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Analyze My Farm'}
        </button>
        <Link
          href="/"
          className="flex-1 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 py-3 text-center font-semibold text-black dark:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </form>
  );
}
