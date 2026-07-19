import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, comment, apartmentId } = body

    if (!name || !phone || !apartmentId) {
      return NextResponse.json({ error: 'Name, phone and apartmentId are required' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        comment,
        apartmentId: Number(apartmentId),
        status: 'new',
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
