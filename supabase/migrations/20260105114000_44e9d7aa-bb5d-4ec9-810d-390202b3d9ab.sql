-- Tabela para cadastro de influenciadoras
CREATE TABLE public.influencers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  auth_provider TEXT NOT NULL DEFAULT 'email',
  name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_influencers_updated_at
  BEFORE UPDATE ON public.influencers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;

-- Permitir inserção pública (cadastro)
CREATE POLICY "Anyone can insert influencers" 
ON public.influencers 
FOR INSERT 
WITH CHECK (true);

-- Admins podem visualizar
CREATE POLICY "Admins can view influencers" 
ON public.influencers 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()
));

-- Admins podem atualizar
CREATE POLICY "Admins can update influencers" 
ON public.influencers 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()
));