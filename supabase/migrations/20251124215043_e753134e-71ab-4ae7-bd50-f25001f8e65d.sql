-- Adicionar campo service_type e remover users_count da tabela form_submissions
ALTER TABLE form_submissions 
ADD COLUMN IF NOT EXISTS service_type text;

-- Remover a coluna users_count
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS users_count;