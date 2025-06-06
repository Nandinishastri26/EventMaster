'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchUserBookings } from '../../../lib/bookings';
import { getCurrentUser } from '../../../lib/auth';

type Booking = {
  id: string;
  event_id: string;
  tickets_booked: number;
  status: string;
  booking_date: string;
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    price: number;
  } | null;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   
    //  const fetchBooking = async () => {
    //   setLoading(true);

    //   const userRes = await getCurrentUser();

    //   if (!userRes.data?.user) {
    //     setError('You must be logged in to view this booking');
    //     setLoading(false);
    //     return;
    //   }

    //   try {
    //     const response = await fetch(`/api/booking/${userRes.data.user.id}`);
    //     const result = await response.json();

    //     if (!response.ok) {
    //       throw new Error(result?.error || 'Failed to fetch booking');
    //     }

    //     setBookings(result.data);
    //   } catch (err: any) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchBooking = async () => {
  setLoading(true);

  const userRes = await getCurrentUser();

  if (!userRes.data?.user) {
    setError('You must be logged in to view this booking');
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(`/api/booking`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Failed to fetch bookings');
    }

    setBookings(result.data);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    fetchBooking();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't made any bookings yet</p>
          <Link 
            href="/events"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {booking.events?.title || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(booking.booking_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking?.tickets_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link 
                      href={`/booking/${booking.id}`}
                      className="text-violet-600 hover:text-violet-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}