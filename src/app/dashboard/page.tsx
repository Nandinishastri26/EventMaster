'use client';

import { useEffect, useState } from 'react';
import { fetchUserBookings } from '../../../lib/bookings';
import { getCurrentUser } from '../../../lib/auth'
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const router = useRouter();
 
// useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();

//       if (error || !user) {
//         router.push('/login'); // Not logged in
//       } else {
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, [supabase, router]);
//   useEffect(() => {
//     async function loadBookings() {
//       const userRes = await getCurrentUser();
//       if (!userRes.data?.user) {
//         setError('Please login first');
//         setLoading(false);
//         return;
//       }
//       const userId = userRes.data.user.id;
//       const { data, error } = await fetchUserBookings(userId);
//       if (error) setError(error.message);
//       else setBookings(data ?? []);
//       setLoading(false);
//     }
//     loadBookings();
//   }, []);

useEffect(() => {
  const load = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      router.push('/login');
      return;
    }

    const { data: bookingsData, error: bookingsError } = await fetchUserBookings(user.id);

    if (bookingsError) {
      setError(bookingsError.message);
    } else {
      setBookings(bookingsData ?? []);
    }

    setLoading(false);
  };

  load();
}, [supabase, router]);


  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6">Your Bookings</h2>
      {bookings.length === 0 && <p>You have no bookings yet.</p>}
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{booking.events.title}</h3>
            <p>
              Tickets booked: <strong>{booking.tickets_booked}</strong>
            </p>
            <p>
              Event date: {new Date(booking.events.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
