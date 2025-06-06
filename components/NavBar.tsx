"use client";

import Link from "next/link";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function Navbar() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      router.refresh(); // Ensures navbar updates after login/logout
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // optional redirect after logout
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold text-violet-600">
        📅 Event Master
      </Link>

      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/events/create">Create Event</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/booking">Bookings</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className="flex gap-4 items-baseline">
        {user ? (
          <>
            <div className="flex items-baseline gap-2">
              <User className="w-5 h-5 text-gray-700" />
              <span className="text-sm">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-800">
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-violet-600 text-white"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
