-- Add new columns for influencer profile information
ALTER TABLE public.influencers
ADD COLUMN instagram_handle text,
ADD COLUMN tiktok_handle text,
ADD COLUMN youtube_handle text,
ADD COLUMN followers_count text,
ADD COLUMN niche text,
ADD COLUMN city text,
ADD COLUMN state text,
ADD COLUMN phone text,
ADD COLUMN bio text,
ADD COLUMN profile_completed boolean NOT NULL DEFAULT false;

-- Allow users to update their own pending or approved influencer record
CREATE POLICY "Anyone can update pending or approved influencers"
ON public.influencers
FOR UPDATE
USING (status IN ('pending', 'approved'))
WITH CHECK (status IN ('pending', 'approved'));