
-- Drop overly permissive SELECT and UPDATE policies
DROP POLICY IF EXISTS "Anyone can view form_submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Anyone can update form_submissions" ON public.form_submissions;

-- Keep INSERT public (needed for lead form submissions from anonymous visitors)
-- The existing INSERT policy "Anyone can insert form_submissions" remains
