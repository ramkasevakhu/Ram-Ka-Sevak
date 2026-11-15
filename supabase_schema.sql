-- ========================================================
-- RAM KA SEVAK (ramkasevak.org) - Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table for all Donations
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_name TEXT NOT NULL,
    donor_phone TEXT,
    donor_email TEXT,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_label TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'UPI',
    transaction_ref TEXT,
    sankalp_message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'verified', -- 'pending', 'verified', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table for Community Blessings Feed (Sankalp Wall)
CREATE TABLE IF NOT EXISTS public.community_blessings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_id UUID REFERENCES public.donations(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    category_name TEXT NOT NULL,
    units_text TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    message TEXT,
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_blessings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert donations
CREATE POLICY "Allow public insert to donations" 
ON public.donations FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow public to read verified blessings for the community feed
CREATE POLICY "Allow public read verified blessings" 
ON public.community_blessings FOR SELECT 
TO anon, authenticated 
USING (is_verified = true);

-- Allow public to insert new blessing
CREATE POLICY "Allow public insert blessings" 
ON public.community_blessings FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Create index for fast retrieval of latest blessings
CREATE INDEX IF NOT EXISTS idx_blessings_created_at ON public.community_blessings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at DESC);
