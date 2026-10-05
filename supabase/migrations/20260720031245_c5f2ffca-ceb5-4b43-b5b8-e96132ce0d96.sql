CREATE TABLE public.proposal_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL DEFAULT 0,
  label text NOT NULL DEFAULT 'Proposta Comercial',
  company text NOT NULL DEFAULT 'Sua Empresa',
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  value text NOT NULL DEFAULT '',
  term text NOT NULL DEFAULT '',
  benefits text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.proposal_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.proposal_slides TO authenticated;
GRANT ALL ON public.proposal_slides TO service_role;

ALTER TABLE public.proposal_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read proposal slides" ON public.proposal_slides FOR SELECT USING (true);
CREATE POLICY "Public insert proposal slides" ON public.proposal_slides FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update proposal slides" ON public.proposal_slides FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete proposal slides" ON public.proposal_slides FOR DELETE USING (true);

CREATE TRIGGER update_proposal_slides_updated_at
  BEFORE UPDATE ON public.proposal_slides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.proposal_slides;
ALTER TABLE public.proposal_slides REPLICA IDENTITY FULL;

INSERT INTO public.proposal_slides (position, label, company, services, value, term, benefits) VALUES
(0, 'Proposta Comercial · 01', 'Sua Empresa',
 '["Social Media (Instagram e Linkedin)","Edição de vídeos","Design de Posts","Gestão de Tráfego","Captação de Leads Qualificados","1 Site ou Landing Page","Criação e Integração com Funil de Vendas","Análises Criteriosa de Mercado"]'::jsonb,
 'R$ 22.000,00 em 4 parcelas sem juros, ou, até 12 com acréscimo.',
 '4 Meses com alinhamento futuro.',
 '15% Off no Pagamento Integral');