-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  segment TEXT,
  service_type TEXT,
  revenue TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  form_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create influencers table
CREATE TABLE IF NOT EXISTS public.influencers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'email',
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  type TEXT NOT NULL DEFAULT 'influencer',
  instagram_handle TEXT,
  tiktok_handle TEXT,
  youtube_handle TEXT,
  followers_count TEXT,
  niche TEXT,
  city TEXT,
  state TEXT,
  phone TEXT,
  bio TEXT,
  profile_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;

-- Public access policies for form_submissions
CREATE POLICY "Anyone can insert form_submissions" 
ON public.form_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view form_submissions" 
ON public.form_submissions FOR SELECT USING (true);

CREATE POLICY "Anyone can update form_submissions"
ON public.form_submissions FOR UPDATE USING (true);

-- Public access policies for influencers
CREATE POLICY "Anyone can insert influencers" 
ON public.influencers FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view influencers"
ON public.influencers FOR SELECT USING (true);

CREATE POLICY "Anyone can update influencers"
ON public.influencers FOR UPDATE USING (true);