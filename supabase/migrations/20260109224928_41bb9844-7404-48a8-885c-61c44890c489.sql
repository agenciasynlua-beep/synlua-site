-- Permitir SELECT para registros recém-criados (para RETURNING após INSERT)
CREATE POLICY "Anyone can view own submission after insert"
ON public.form_submissions
FOR SELECT
USING (
  status IN ('started', 'in_progress', 'completed')
  AND created_at > NOW() - INTERVAL '1 hour'
);