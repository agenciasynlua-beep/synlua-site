-- Create policy for admin_users to allow authenticated users to check their admin status
CREATE POLICY "Users can check their own admin status"
ON public.admin_users
FOR SELECT
USING (auth.uid() = user_id);