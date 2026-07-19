import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params;
    const data = await request.json()

    // Convert string ID to number
    const apartmentId = Number(id)

    const updatedApartment = await prisma.apartment.update({
      where: { id: apartmentId },
      data: {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        address: data.address,
        area: Number(data.area),
        rooms: Number(data.rooms),
        floor: Number(data.floor),
        maxGuests: Number(data.maxGuests),
        isAvailable: Boolean(data.isAvailable),
        // For a full implementation, you would also handle amenities relations here
      }
    })

    return NextResponse.json(updatedApartment)
  } catch (error) {
    console.error('Error updating apartment:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
