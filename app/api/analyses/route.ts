import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { CropRecommendationInput } from '@/types/recommendation';

// In-memory store fallback when Supabase is not connected
interface FarmRecord {
  id: string;
  name: string;
  location: string;
  created_at: string;
}

interface AnalysisRecord {
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
}

const mockFarms: FarmRecord[] = [];
const mockAnalyses: AnalysisRecord[] = [];

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = (await request.json()) as CropRecommendationInput;

    // Validate required fields
    if (
      !body.soil ||
      !body.environment ||
      !body.soilProperties ||
      !body.farm
    ) {
      return NextResponse.json(
        { error: 'Missing required fields in request body' },
        { status: 400 }
      );
    }

    const { soil, environment, soilProperties, farm } = body;

    // Validate all numeric values
    const requiredNumbers = [
      soil.nitrogen,
      soil.phosphorus,
      soil.potassium,
      environment.temperature,
      environment.humidity,
      environment.rainfall,
      soilProperties.ph,
    ];

    if (requiredNumbers.some((val) => typeof val !== 'number' || isNaN(val))) {
      return NextResponse.json(
        { error: 'All numeric fields must contain valid numbers' },
        { status: 400 }
      );
    }

    // Validate required text fields
    if (!farm.location || !farm.season) {
      return NextResponse.json(
        { error: 'Location and season are required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const hasSupabaseConfig =
      Boolean(supabaseUrl) &&
      Boolean(supabaseAnonKey) &&
      !supabaseUrl?.includes('placeholder');

    if (hasSupabaseConfig && supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data: farmData, error: farmError } = await supabase
          .from('farms')
          .insert([
            {
              name: `Farm Analysis - ${farm.location}`,
              location: farm.location,
            },
          ])
          .select()
          .single();

        if (!farmError && farmData) {
          const { data: analysisData, error: analysisError } = await supabase
            .from('farm_analyses')
            .insert([
              {
                farm_id: farmData.id,
                nitrogen: soil.nitrogen,
                phosphorus: soil.phosphorus,
                potassium: soil.potassium,
                temperature: environment.temperature,
                humidity: environment.humidity,
                soil_ph: soilProperties.ph,
                rainfall: environment.rainfall,
                season: farm.season,
              },
            ])
            .select()
            .single();

          if (!analysisError && analysisData) {
            return NextResponse.json(
              {
                success: true,
                farmId: farmData.id,
                analysisId: analysisData.id,
                data: {
                  farm: farmData,
                  analysis: analysisData,
                },
              },
              { status: 201 }
            );
          }
        }
      } catch (dbErr) {
        console.warn('Supabase request failed, falling back to in-memory store:', dbErr);
      }
    }

    // In-memory fallback
    const now = new Date().toISOString();
    const mockFarm: FarmRecord = {
      id: `farm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: `Farm Analysis - ${farm.location}`,
      location: farm.location,
      created_at: now,
    };
    mockFarms.push(mockFarm);

    const mockAnalysis: AnalysisRecord = {
      id: `analysis_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      farm_id: mockFarm.id,
      nitrogen: soil.nitrogen,
      phosphorus: soil.phosphorus,
      potassium: soil.potassium,
      temperature: environment.temperature,
      humidity: environment.humidity,
      soil_ph: soilProperties.ph,
      rainfall: environment.rainfall,
      season: farm.season,
      created_at: now,
    };
    mockAnalyses.push(mockAnalysis);

    return NextResponse.json(
      {
        success: true,
        farmId: mockFarm.id,
        analysisId: mockAnalysis.id,
        data: {
          farm: mockFarm,
          analysis: mockAnalysis,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
