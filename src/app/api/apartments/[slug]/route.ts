import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const apartment = await prisma.apartment.findUnique({
      where: {
        slug: slug,
      },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        amenities: true,
      },
    })

    if (!apartment) {
      return NextResponse.json({ error: 'Apartment not found' }, { status: 404 })
    }

    return NextResponse.json(apartment)
  } catch (error) {
    console.error('Error fetching apartment:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
