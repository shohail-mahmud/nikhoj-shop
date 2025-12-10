-- Allow anyone to view team images
CREATE POLICY "Anyone can view team images"
ON storage.objects FOR SELECT
USING (bucket_id = 'team');

-- Allow admins to upload team images
CREATE POLICY "Admins can upload team images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'team' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update team images
CREATE POLICY "Admins can update team images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'team' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete team images
CREATE POLICY "Admins can delete team images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'team' 
  AND public.has_role(auth.uid(), 'admin')
);