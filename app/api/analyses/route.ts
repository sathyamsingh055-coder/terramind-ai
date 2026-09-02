import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { CropRecommendationInput } from '@/types/recommendation';

export async function POST(request: NextRequest) {
  // Get environment variables at runtime
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validate that required environment variables are set and valid
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch {
    console.error('Invalid Supabase URL');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    // Step 1: Create a farm record
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

    if (farmError) {
      console.error('Error creating farm:', farmError);
      return NextResponse.json(
        { error: 'Failed to create farm record' },
        { status: 500 }
      );
    }

    if (!farmData) {
      return NextResponse.json(
        { error: 'Failed to create farm record' },
        { status: 500 }
      );
    }

    // Step 2: Create a farm_analyses record linked to the farm
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

    if (analysisError) {
      console.error('Error creating farm analysis:', analysisError);
      return NextResponse.json(
        { error: 'Failed to save analysis' },
        { status: 500 }
      );
    }

    // Return success response
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
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
