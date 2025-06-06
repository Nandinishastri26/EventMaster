'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabaseClient';

export default function CreateEventPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    max_tickets: '',
    image_url: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const userRes = await getCurrentUser();
      console.log("userRes",userRes.data?.user?.id)
      if (userRes.data?.user?.id) {
        setUserId(userRes.data.user.id);
      } else {
        setError('Please log in to create an event');
      }
    }
    fetchUser();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError('You must be logged in');
      return;
    }

    const token = session.access_token;

    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    if (!res.ok) {
      setError(result.error || 'Failed to create event');
    } else {
      router.push('/events');
    }
  };
  return (
    <section className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Max Tickets"
          value={form.max_tickets}
          onChange={e => setForm({ ...form, max_tickets: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={form.image_url}
          onChange={e => setForm({ ...form, image_url: e.target.value })}
          className="w-full p-2 border rounded"
        />
       
  <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Create Event
        </button>
      </form>
    </section>
  );
}

