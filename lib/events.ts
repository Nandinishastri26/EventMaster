import { supabase } from './supabaseClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
  return { data, error };
}

export async function fetchEventById(id: string) {
  const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
  return { data, error };
}

export async function createEvent(event: {
  user_id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  max_tickets: number;
  image_url?: string;
}) {
  const { data, error } = await supabase.from('events').insert([{
    ...event,
    tickets_sold: 0 // Default if not set by Supabase itself
  }]).select().single();
  
  return { data, error };
}

