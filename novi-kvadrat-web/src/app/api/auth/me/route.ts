import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }

    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
      )

      // Check if session has expired
      if (sessionData.exp && Date.now() > sessionData.exp) {
        cookieStore.delete('admin_session')
        return NextResponse.json(
          { message: 'Session expired' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        user: {
          id: sessionData.userId,
          email: sessionData.email,
          fullName: sessionData.fullName,
          avatarUrl: sessionData.avatarUrl,
          roleId: sessionData.roleId,
          roleName: sessionData.roleName,
          permissions: sessionData.permissions
        }
      })
    } catch (parseError) {
      // Invalid session format
      cookieStore.delete('admin_session')
      return NextResponse.json(
        { message: 'Invalid session' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    )
  }
}
