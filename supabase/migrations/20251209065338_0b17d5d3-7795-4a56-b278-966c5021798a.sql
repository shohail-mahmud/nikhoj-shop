-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for team member images
INSERT INTO storage.buckets (id, name, public)
VALUES ('team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for products bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'));

-- RLS policies for team bucket
CREATE POLICY "Anyone can view team images"
ON storage.objects FOR SELECT
USING (bucket_id = 'team');

CREATE POLICY "Admins can upload team images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'team' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update team images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'team' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete team images"
ON storage.objects FOR DELETE
USING (bucket_id = 'team' AND public.has_role(auth.uid(), 'admin'));

-- Add RLS policies for team_members table management
CREATE POLICY "Admins can insert team members"
ON public.team_members FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update team members"
ON public.team_members FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete team members"
ON public.team_members FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));