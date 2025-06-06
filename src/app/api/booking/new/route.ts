import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../../lib/supabaseServer';

export async function POST(req: NextRequest) {
  const supabase = createServerSupabase();

  // Authenticate the user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse request body
  const body = await req.json();
  const { event_id, tickets_count } = body;

  if (!event_id || !tickets_count) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Insert into bookings
  const { data, error } = await supabase.from('bookings').insert([
    {
      user_id: user.id,
      event_id,
      tickets_count,
    },
  ]).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Booking successful', data });
}