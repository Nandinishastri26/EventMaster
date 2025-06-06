import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../../lib/supabaseServer';

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = createServerSupabase();
  const { id } = context.params;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, event:events(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
