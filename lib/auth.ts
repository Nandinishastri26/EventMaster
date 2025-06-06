// lib/auth.ts
import { supabase } from './supabaseClient';

export async function registerUser(email: string, password: string, name: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
}

export async function loginUser(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function logoutUser() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  return supabase.auth.getUser();
}
// export async function registerUser(email: string, password: string, name: string) {
//   return supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { name },
//       emailRedirectTo: `${location.origin}/auth/callback`
//     }
//   });
// }

// export async function getCurrentUser() {
//   const { data: { user } } = await supabase.auth.getUser();
  
//   if (user) {
//     // Fetch additional profile data
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', user.id)
//       .single();
    
//     return { user: { ...user, ...profile } };
//   }
  
//   return { user: null };
// }
