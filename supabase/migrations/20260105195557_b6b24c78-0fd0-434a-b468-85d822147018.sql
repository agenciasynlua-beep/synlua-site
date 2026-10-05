-- Add type column to distinguish influencers from partners
ALTER TABLE public.influencers 
ADD COLUMN type text NOT NULL DEFAULT 'influencer';

-- Add comment for clarity
COMMENT ON COLUMN public.influencers.type IS 'Type of registration: influencer or partner';