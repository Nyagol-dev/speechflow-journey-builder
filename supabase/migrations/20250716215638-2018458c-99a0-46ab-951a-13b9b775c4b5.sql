-- Populate profiles table with existing users
INSERT INTO public.profiles (user_id, display_name)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'display_name', email) as display_name
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;