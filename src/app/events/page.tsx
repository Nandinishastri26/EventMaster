import Link from 'next/link';
type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  image_url?: string;
};

export default async function EventsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const result = await res.json();
    return <p>Error loading events: {result.error || 'Unknown error'}</p>;
  }

  const events: Event[] = await res.json();
  if (!events || events.length === 0) return <p>No events found.</p>;
  return (
   <section>
  <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {events.map((event: Event) => (
      <div
        key={event.id}
        className="border p-4 rounded shadow hover:shadow-lg transition bg-white w-60"
      >
        <Link href={`/events/${event.id}`} className="block">
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
          )}
          <h2 className="text-xl font-semibold cursor-pointer">{event.title}</h2>
          <p className="text-sm text-gray-600">
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-sm">{event.location}</p>
        </Link>
      </div>
    ))}
  </div>
</section>

  );
}
