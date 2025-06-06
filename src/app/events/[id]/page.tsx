import Link from "next/link";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const result = await res.json();
    return <p>Error loading event: {result.error}</p>;
  }

  const event = await res.json();
  if (!event) return <p>Event not found.</p>;

  return (
    <section className="max-w-3xl mx-auto p-6 border rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p className="mt-4">{event.description}</p>

      <div className="flex justify-center mt-6">
        <Link
          href={`/booking/new?eventId=${event.id}`}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-md shadow hover:from-blue-600 hover:to-violet-700 transition"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
