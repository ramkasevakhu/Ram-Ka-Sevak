-- ========================================================
-- RAM KA SEVAK (ramkasevak.org) - Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Donations Table
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
    admin_note TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'pending', -- 'success', 'verified', 'pending', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Community Blessings / Recent Supporters Feed
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

-- 3. Ground Proof Videos / Reels Table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('youtube', 'instagram', 'facebook')),
    category TEXT NOT NULL DEFAULT 'annadaan',
    video_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Site Content (Impact Counters, Monthly Transparency, Seva Configs)
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_blessings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can insert donations (server API routes handle validation)
DROP POLICY IF EXISTS "Allow public insert to donations" ON public.donations;
CREATE POLICY "Allow public insert to donations"
ON public.donations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Public can read verified blessings (no phone/email stored here)
DROP POLICY IF EXISTS "Allow public read verified blessings" ON public.community_blessings;
CREATE POLICY "Allow public read verified blessings"
ON public.community_blessings FOR SELECT
TO anon, authenticated
USING (is_verified = true);

DROP POLICY IF EXISTS "Allow public insert blessings" ON public.community_blessings;
CREATE POLICY "Allow public insert blessings"
ON public.community_blessings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Public can read visible videos
DROP POLICY IF EXISTS "Allow public read visible videos" ON public.videos;
CREATE POLICY "Allow public read visible videos"
ON public.videos FOR SELECT
TO anon, authenticated
USING (is_visible = true);

-- Public can read site_content
DROP POLICY IF EXISTS "Allow public read site_content" ON public.site_content;
CREATE POLICY "Allow public read site_content"
ON public.site_content FOR SELECT
TO anon, authenticated
USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blessings_created_at ON public.community_blessings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_videos_order_date ON public.videos(sort_order ASC, video_date DESC);

-- Seed default site_content if not present
INSERT INTO public.site_content (key, value)
VALUES
  ('impact_counters', '{"mealsServed": 12450, "animalsTreated": 3280, "totalDonationsAmount": 485000}'::jsonb),
  ('transparency', '{"monthLabel": "नवंबर 2026", "incomeAmount": 68500, "expenseAmount": 66200, "notes": "राशन, सब्ज़ी, पशु चारा, दवाइयाँ और आपदा राहत सामग्री में सीधा व्यय।"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
