import { supabase } from './supabaseClient';

export const getUserProfile = async (userId: string) => {
  return await supabase.from('users').select('*').eq('id', userId).single();
};
