'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
const [message, setMessage] = useState('');
 const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Signup successful !.');
       router.push('/login');

    } else {
       setError(`Error: ${data.error}`);
       setMessage('');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 border rounded-3xl shadow">
      <h2 className="text-2xl mb-4 font-semibold text-center">Register</h2>
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <input
        required
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded">
      Register
        </button>
        {message && <p>{message}</p>}
    </form>
  );
}
