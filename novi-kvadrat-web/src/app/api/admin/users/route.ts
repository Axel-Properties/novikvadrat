import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        role:roles(name)
      `)
      .order('full_name', { ascending: true })

    if (error) throw error

    // Transform to include role_name
    const usersWithRole = data?.map(user => ({
      ...user,
      role_name: user.role?.name || null,
      role: undefined
    })) || []

    return NextResponse.json(usersWithRole)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real app, you'd hash the password here
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: body.email,
        full_name: body.full_name,
        password_hash: body.password, // In production, hash this!
        avatar_url: body.avatar_url || null,
        role_id: body.role_id || null,
        is_active: body.is_active ?? true
      }])
      .select(`
        *,
        role:roles(name)
      `)
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A user with this email already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json({
      ...data,
      role_name: data.role?.name || null,
      role: undefined
    })
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    )
  }
}

