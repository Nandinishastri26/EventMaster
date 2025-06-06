
  'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<unknown>(null);
  const [event, setEvent] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/booking/${params.id}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result?.error || 'Booking not found');
          setLoading(false);
          return;
        }

        setBooking(result.data);
        setEvent(result.data.event); 

      } catch (err) {
        setError('Failed to load booking details');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [params.id]);


  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Booking not found'}
        </div>
        <button
          onClick={() => router.push('/booking')}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-violet-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Booking Confirmation</h1>
          <p className="opacity-90">ID: {booking.id}</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Event Details</h2>
              {event ? (
                <div className="space-y-2">
                  <p><span className="font-medium">Event:</span> {event.title}</p>
                  <p><span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Location:</span> {event.location}</p>
                  {/* <p><span className="font-medium">Price:</span> ${event.price}</p> */}
                </div>
              ) : (
                <p>Event details not available</p>
              )}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Booking Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Booking Date:</span> {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p><span className="font-medium">Tickets:</span> {booking.tickets_count}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {/* <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Total Cost</h2>
            <p className="text-2xl font-bold text-violet-600">
              ${event ? (event.price * booking.tickets_booked).toFixed(2) : 'N/A'}
            </p>
          </div> */}
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={() => router.push('/booking')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );
}