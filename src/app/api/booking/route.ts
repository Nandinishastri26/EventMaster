import { createServerSupabase } from '../../../../lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServerSupabase();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, events(*)')
    .eq('user_id', user.id);

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }

  return NextResponse.json({ data });
}
