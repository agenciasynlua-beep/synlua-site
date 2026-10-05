-- Allow anonymous users to view pending influencers (for RETURNING after INSERT)
CREATE POLICY "Anyone can view pending influencers" 
ON public.influencers 
FOR SELECT 
USING (status = 'pending');