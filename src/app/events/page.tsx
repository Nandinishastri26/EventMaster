// app/events/page.tsx
import Link from 'next/link';

export default async function EventsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const result = await res.json();
    return <p>Error loading events: {result.error || 'Unknown error'}</p>;
  }

  const events = await res.json();

  if (!events || events.length === 0) return <p>No events found.</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <ul className="space-y-4">
        {events.map((event: any) => (
          <li key={event.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <Link href={`/events/${event.id}`}>
              <h2 className="text-xl font-semibold cursor-pointer">{event.title}</h2>
            </Link>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
