import { supabase } from './supabaseClient';

export async function bookTicket(booking: { user_id: string; event_id: string; tickets_count: number }) {
  const { data, error } = await supabase.from('bookings').insert([booking]).select().single();
  return { data, error };
}

export async function fetchUserBookings(user_id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, events(*)')
    .eq('user_id', user_id);
  return { data, error };
}


