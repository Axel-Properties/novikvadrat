import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select(`
        *,
        users:users(count)
      `)
      .order('name', { ascending: true })

    if (error) throw error

    // Transform to include users count
    const rolesWithCount = data?.map(role => ({
      ...role,
      users_count: role.users?.[0]?.count || 0,
      users: undefined
    })) || []

    return NextResponse.json(rolesWithCount)
  } catch (error) {
    console.error('Failed to fetch roles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('roles')
      .insert([{
        name: body.name,
        description: body.description || null,
        permissions: body.permissions || {}
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A role with this name already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create role:', error)
    return NextResponse.json(
      { message: 'Failed to create role' },
      { status: 500 }
    )
  }
}

