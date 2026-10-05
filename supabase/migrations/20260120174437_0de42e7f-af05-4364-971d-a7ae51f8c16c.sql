ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS social_media_handle TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS business_description TEXT,
ADD COLUMN IF NOT EXISTS client_acquisition_channels TEXT[];