import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // Create or update user profile
    await supabase.from('profiles').upsert({
      id: session.user.id,
      name: session.user.user_metadata?.name || '',
      updated_at: new Date().toISOString()
    });
  }
  
  redirect(session ? '/dashboard' : '/login');
}