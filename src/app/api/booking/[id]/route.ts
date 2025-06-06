import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '../../../../../lib/supabaseServer';
type RouteContext = {
    params: {
        id: string;
    };
};

export async function GET(
    _req: NextRequest,
    { params }: RouteContext
) {
    const supabase = createServerSupabase();

    const { id } = params;
    // Handle potential array type for id
    const bookingId = Array.isArray(id) ? id[0] : id;

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