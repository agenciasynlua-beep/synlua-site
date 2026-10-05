-- Create influencers table (same structure as partners)
CREATE TABLE public.influencers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  auth_provider TEXT NOT NULL DEFAULT 'email',
  name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;

-- Policies for influencers
CREATE POLICY "Anyone can insert influencers" 
ON public.influencers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view influencers" 
ON public.influencers 
FOR SELECT 
USING (EXISTS ( SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

CREATE POLICY "Admins can update influencers" 
ON public.influencers 
FOR UPDATE 
USING (EXISTS ( SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));

-- Enable realtime for influencers
ALTER PUBLICATION supabase_realtime ADD TABLE public.influencers;