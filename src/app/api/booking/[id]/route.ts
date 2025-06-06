import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../../lib/supabaseServer';

export async function GET(
    // context: { params: { id: string } }
) {
    const supabase = createServerSupabase();

    // const { id } = context.params;
    // Handle potential array type for id
    // const bookingId = Array.isArray(id) ? id[0] : id;
const bookingId="341f7452-ffcb-4952-bb88-98ed28ce754f";
    if (!bookingId) {
        return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('bookings')
        .select('*, event:events(*)')
        .eq('id', bookingId)
        .eq('user_id', user.id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
}