import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const apartments = await prisma.apartment.findMany({
      include: {
        images: { orderBy: { order: 'asc' } },
        amenities: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(apartments)
  } catch (error) {
    console.error('Error fetching apartments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
