import { NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../lib/supabaseServer';

export async function POST(req: Request) {
    const supabase = createServerSupabase();
  const body = await req.json();
  const { email, password, name} = body;

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined,
    },
  });

  if (signUpError) {
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  const userId = authData.user?.id;
  console.log("userId",userId)
  if (!userId) {
    return NextResponse.json({ error: 'User ID not returned after signup.' }, { status: 500 });
  }

    const { error: insertError } = await supabase.from('users').insert([
    {
      id: userId,
      email,
      name,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ user: authData.user }, { status: 200 });
}