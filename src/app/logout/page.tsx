'use client'

import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      // Client-side logout to clear session immediately
      await supabase.auth.signOut()

      // Optional: Call your own API if you need custom server-side cleanup
      await fetch('/api/auth/logout', {
        method: 'POST',
      })

      // Refresh session-aware components
      router.refresh()

      // Redirect to login
      router.push('/login')
    }

    logout()
  }, [router])

  return <p>Logging out...</p>
}
