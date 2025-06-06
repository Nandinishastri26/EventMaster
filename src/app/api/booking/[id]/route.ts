import { createServerSupabase } from '../../../../../lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const supabase = createServerSupabase();

  // 🔐 Get logged-in user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 📄 Fetch booking + event only if it belongs to the user
  const { data, error } = await supabase
    .from('bookings')
    .select('*, event:events(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
