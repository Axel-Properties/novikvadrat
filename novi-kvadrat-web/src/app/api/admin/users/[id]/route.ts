import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updateData: any = {
      email: body.email,
      full_name: body.full_name,
      avatar_url: body.avatar_url || null,
      role_id: body.role_id || null,
      is_active: body.is_active
    }

    // Only update password if provided
    if (body.password) {
      updateData.password_hash = body.password // In production, hash this!
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
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
    console.error('Failed to update user:', error)
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

