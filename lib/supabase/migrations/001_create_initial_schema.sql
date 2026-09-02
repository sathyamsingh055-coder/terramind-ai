-- TerraMind AI Database Schema
-- Create tables for storing farm information and analyses

-- 1. farms table
-- Stores basic information about each farm
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. farm_analyses table
-- Stores soil and environmental analysis data for each farm
CREATE TABLE farm_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  nitrogen NUMERIC NOT NULL,
  phosphorus NUMERIC NOT NULL,
  potassium NUMERIC NOT NULL,
  temperature NUMERIC NOT NULL,
  humidity NUMERIC NOT NULL,
  soil_ph NUMERIC NOT NULL,
  rainfall NUMERIC NOT NULL,
  season TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_farm_analyses_farm_id ON farm_analyses(farm_id);
CREATE INDEX idx_farm_analyses_created_at ON farm_analyses(created_at);
