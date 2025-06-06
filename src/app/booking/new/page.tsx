"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth";
import { supabase } from '../../../../lib/supabaseClient';
export default function NewBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [event, setEvent] = useState<any>(null);
  const [tickets, setTickets] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      setError("Event ID is missing");
      setEventLoading(false);
      return;
    }

    const fetchEvent = async () => {
      setEventLoading(true);
      try {
        const res = await fetch(`/api/events/${eventId}`);
        const result = await res.json();

        if (!res.ok) {
          setError(result.error || "Event not found");
        } else {
          setEvent(result);
        }
      } catch (err) {
        setError("Failed to load event details");
      }
      setEventLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  // async function handleBooking() {
  //   if (!eventId) {
  //     setError("Event ID is missing");
  //     return;
  //   }

  //   setError("");
  //   setLoading(true);

  //   const userRes = await getCurrentUser();
  //   if (!userRes.data?.user) {
  //     setError("You must be logged in to book tickets");
  //     setLoading(false);
  //     return;
  //   }

  //   const bookingData = {
  //     user_id: userRes.data.user.id,
  //     event_id: eventId,
  //     tickets_count: tickets,
  //   };

  //   try {
  //     const { error: bookingError } = await bookTicket(bookingData);

  //     if (bookingError) {
  //       setError(bookingError.message);
  //     } else {
  //       alert("Booking successful!");
  //       router.push("/booking");
  //     }
  //   } catch (err) {
  //     setError("Failed to process booking");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

async function handleBooking() {
  if (!eventId) {
    setError("Event ID is missing");
    return;
  }

  setError("");
  setLoading(true);

  const userRes = await getCurrentUser();
  if (!userRes.data?.user) {
    setError("You must be logged in to book tickets");
    setLoading(false);
    return;
  }
const {
        data: { session },
      } = await supabase.auth.getSession();
  
      if (!session) {
        setError('You must be logged in');
        return;
      }
  
      const token = session.access_token;
  
  try {
    const res = await fetch('/api/booking/new', {
      method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify({
        event_id: eventId,
        tickets_count: tickets,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || 'Booking failed');
    } else {
      alert("Booking successful!");
      router.push("/booking");
    }
  } catch (err) {
    setError("Failed to process booking");
  } finally {
    setLoading(false);
  }
}

  if (eventLoading) {
    return (
      <div className="max-w-md mx-auto p-6">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!eventId || !event) {
    return (
      <div className="max-w-md mx-auto p-6 border rounded mt-10 shadow">
        <h2 className="text-2xl mb-4 font-semibold">Book Tickets</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "Invalid event specified"}
        </div>
        <button
          onClick={() => router.push("/events")}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-md mx-auto p-6 border rounded mt-10 shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-1">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600">Location: {event.location}</p>
      </div>

      <h3 className="text-xl font-medium mb-4">Book Tickets</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of tickets:</label>
        <input
          type="number"
          min={1}
          max={10}
          value={tickets}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= 10) {
              setTickets(value);
            }
          }}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <p className="text-sm text-gray-500 mt-1">Max 10 tickets per booking</p>
      </div>

      {/* <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-700">Price per ticket:</span>
          <span className="ml-2 font-bold">${event.price}</span>
        </div>
        <div>
          <span className="text-gray-700">Total:</span>
          <span className="ml-2 font-bold text-lg text-violet-600">${(event.price * tickets).toFixed(2)}</span>
        </div>
      </div> */}

      <button
        disabled={loading}
        onClick={handleBooking}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded shadow hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50"
      >
        {loading ? "Processing Booking..." : "Confirm Booking"}
      </button>
    </section>
  );
}
