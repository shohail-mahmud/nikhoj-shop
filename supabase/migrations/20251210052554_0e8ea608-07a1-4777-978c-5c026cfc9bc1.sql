-- Allow anyone to view product images
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow admins to upload product images
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update product images
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete product images
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Also add policies for the 'products' bucket if it's used
CREATE POLICY "Anyone can view products bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Admins can upload to products bucket"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update products bucket"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete from products bucket"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' 
  AND public.has_role(auth.uid(), 'admin')
);