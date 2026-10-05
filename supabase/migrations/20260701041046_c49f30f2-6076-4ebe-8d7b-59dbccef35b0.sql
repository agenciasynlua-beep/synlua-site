
-- Automations
DROP POLICY IF EXISTS "Public manage automations" ON public.automations;
DROP POLICY IF EXISTS "Public manage automation_steps" ON public.automation_steps;
DROP POLICY IF EXISTS "Public manage automation_runs" ON public.automation_runs;
REVOKE ALL ON public.automations FROM anon;
REVOKE ALL ON public.automation_steps FROM anon;
REVOKE ALL ON public.automation_runs FROM anon;
CREATE POLICY "Admins manage automations" ON public.automations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage automation_steps" ON public.automation_steps FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage automation_runs" ON public.automation_runs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Campaigns
DROP POLICY IF EXISTS "Public manage campaigns" ON public.campaigns;
REVOKE ALL ON public.campaigns FROM anon;
CREATE POLICY "Admins manage campaigns" ON public.campaigns FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contacts
DROP POLICY IF EXISTS "Public manage contacts" ON public.contacts;
REVOKE ALL ON public.contacts FROM anon;
CREATE POLICY "Admins manage contacts" ON public.contacts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Email sends
DROP POLICY IF EXISTS "Public read email_sends" ON public.email_sends;
REVOKE ALL ON public.email_sends FROM anon;
CREATE POLICY "Admins read email_sends" ON public.email_sends FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- user_roles: explicit deny INSERT/UPDATE/DELETE to non-admins by scoping ALL policy
-- The existing "Admins can manage roles" already restricts via WITH CHECK. Add explicit
-- restrictive INSERT policy to guarantee no self-promotion path.
CREATE POLICY "Only admins can insert roles" ON public.user_roles AS RESTRICTIVE
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can update roles" ON public.user_roles AS RESTRICTIVE
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Only admins can delete roles" ON public.user_roles AS RESTRICTIVE
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Revoke EXECUTE on internal trigger/definer functions from anon/authenticated so they can't be called via the API.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.auto_promote_admin() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.on_form_submission_created() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
