// app/api/events/[id]/route.ts (GET event by ID)
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../../lib/supabaseServer';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
