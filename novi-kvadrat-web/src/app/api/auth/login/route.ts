import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Simple hash function for password comparison
// In production, use bcrypt or similar
function simpleHash(password: string): string {
  return password // For now, we compare plaintext since that's how they're stored
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        password_hash,
        avatar_url,
        is_active,
        role_id,
        role:roles(id, name, permissions)
      `)
      .eq('email', email.toLowerCase())
      .single()

    if (error || !user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json(
        { message: 'Your account has been deactivated. Contact the administrator.' },
        { status: 401 }
      )
    }

    // Verify password (comparing plaintext for now - should use bcrypt in production)
    if (user.password_hash !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id)

    // Create session token (simple base64 encoded user data)
    // In production, use JWT or secure session management
    const role = Array.isArray(user.role) ? user.role[0] : user.role
    const sessionData = {
      userId: user.id,
      email: user.email,
      fullName: user.full_name,
      avatarUrl: user.avatar_url,
      roleId: user.role_id,
      roleName: role?.name || null,
      permissions: role?.permissions || {},
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    }

    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64')

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        avatarUrl: user.avatar_url,
        roleName: role?.name || null
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
