CREATE POLICY "Anyone can complete their partial submission"
ON public.form_submissions
FOR UPDATE
TO anon, authenticated
USING (status = 'partial')
WITH CHECK (status IN ('partial', 'new'));