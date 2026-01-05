-- Add storage policies for review-avatars bucket

-- Allow anyone to view review avatars (for public display)
CREATE POLICY "Anyone can view review avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'review-avatars');

-- Allow admins to upload review avatars
CREATE POLICY "Admins can upload review avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'review-avatars' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update review avatars
CREATE POLICY "Admins can update review avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'review-avatars' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete review avatars
CREATE POLICY "Admins can delete review avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'review-avatars' 
  AND public.has_role(auth.uid(), 'admin')
);