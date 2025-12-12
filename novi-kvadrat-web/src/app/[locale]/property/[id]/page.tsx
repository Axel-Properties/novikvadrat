'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PropertyRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to projects page for now
    router.push('/novogradnja/beograd')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  )
}