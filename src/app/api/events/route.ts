// app/api/events/route.ts (GET all events and POST create event)
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../lib/supabaseServer';

export async function GET() {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createServerSupabase();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, date, location, description, category, max_tickets, image_url } = body;

  const { data, error } = await supabase.from('events').insert([
    {
      title,
      date,
      location,
      description,
      category,
      max_tickets,
      image_url,
      user_id: user.id,
      tickets_sold: 0,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Event created', data });
}
