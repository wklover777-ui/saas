ALTER TABLE public.users ADD COLUMN customer_key TEXT UNIQUE;
ALTER TABLE public.users ADD COLUMN billing_key TEXT;
