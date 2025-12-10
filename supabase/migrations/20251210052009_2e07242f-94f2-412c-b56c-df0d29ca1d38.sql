-- Create trigger to automatically add user role on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_role();

-- Add the existing user to user_roles with admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('1381842f-eee5-4aa7-91d0-26442c0104c8', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;