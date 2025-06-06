import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="text-center">
      <h1 className="text-5xl font-bold text-violet-600 mb-4">Event Master</h1>
      <p className="text-gray-600 text-xl mb-6">Create, manage, and experience unforgettable events</p>
      <div className="flex justify-center">
        <Link 
          href="/events" 
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded shadow hover:from-blue-600 hover:to-violet-700 transition"
        >
          Book Event Now
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-12">
        <div className="text-center">
          <h2 className="text-2xl text-violet-600 font-bold">10K+</h2>
          <p>Events Created</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl text-violet-600 font-bold">500K+</h2>
          <p>Happy Attendees</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl text-violet-600 font-bold">1K+</h2>
          <p>Event Organizers</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl text-violet-600 font-bold">50+</h2>
          <p>Cities Worldwide</p>
        </div>
      </div>
    </section>
  );
}