import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminLayoutWrapper } from '@/components/admin/admin-layout-wrapper'

async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')
  
  if (!sessionCookie) {
    return null
  }

  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    )

    // Check if session has expired
    if (sessionData.exp && Date.now() > sessionData.exp) {
      return null
    }

    return sessionData
  } catch {
    return null
  }
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await getSession()

  // Check if the current path is the login page
  // If not authenticated and not on login page, redirect to login
  // This is handled by checking the URL in the layout
  
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  )
}
