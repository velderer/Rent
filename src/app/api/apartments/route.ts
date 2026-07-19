import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const apartments = await prisma.apartment.findMany({
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        amenities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(apartments)
  } catch (error) {
    console.error('Error fetching apartments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
