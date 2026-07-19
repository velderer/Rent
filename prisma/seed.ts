import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Amenities
  const wifi = await prisma.amenity.create({ data: { name: 'Wi-Fi' } })
  const ac = await prisma.amenity.create({ data: { name: 'Кондиционер' } })
  const tv = await prisma.amenity.create({ data: { name: 'Smart TV' } })
  const parking = await prisma.amenity.create({ data: { name: 'Парковка' } })
  const kitchen = await prisma.amenity.create({ data: { name: 'Кухня' } })

  // Create 5 Apartments
  const apt1 = await prisma.apartment.create({
    data: {
      title: 'Luxury Loft Studio',
      slug: 'luxury-loft-studio',
      description: 'Современная студия в центре города с отличным видом.',
      price: 150,
      address: 'ул. Руставели, 1, Тбилиси',
      area: 45,
      rooms: 1,
      floor: 5,
      maxGuests: 2,
      beds: 1,
      bathrooms: 1,
      isAvailable: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=800&q=80', isMain: true },
          { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', isMain: false }
        ]
      },
      amenities: {
        connect: [{ id: wifi.id }, { id: ac.id }, { id: tv.id }]
      }
    }
  })

  const apt2 = await prisma.apartment.create({
    data: {
      title: 'Modern 2-Bedroom Suite',
      slug: 'modern-2-bedroom-suite',
      description: 'Просторная квартира для семьи.',
      price: 250,
      address: 'пр. Чавчавадзе, 15, Тбилиси',
      area: 80,
      rooms: 3,
      floor: 3,
      maxGuests: 4,
      beds: 2,
      bathrooms: 2,
      isAvailable: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80', isMain: true }
        ]
      },
      amenities: {
        connect: [{ id: wifi.id }, { id: kitchen.id }, { id: parking.id }]
      }
    }
  })

  const apt3 = await prisma.apartment.create({
    data: {
      title: 'Cozy Penthouse',
      slug: 'cozy-penthouse',
      description: 'Уютный пентхаус с панорамными окнами.',
      price: 350,
      address: 'ул. Абашидзе, 30, Тбилиси',
      area: 120,
      rooms: 4,
      floor: 10,
      maxGuests: 6,
      beds: 3,
      bathrooms: 3,
      isAvailable: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09c254ea?w=800&q=80', isMain: true }
        ]
      },
      amenities: {
        connect: [{ id: wifi.id }, { id: ac.id }, { id: tv.id }, { id: kitchen.id }, { id: parking.id }]
      }
    }
  })

  const apt4 = await prisma.apartment.create({
    data: {
      title: 'Minimalist Urban Flat',
      slug: 'minimalist-urban-flat',
      description: 'Квартира в минималистичном стиле.',
      price: 180,
      address: 'ул. Пекина, 10, Тбилиси',
      area: 60,
      rooms: 2,
      floor: 2,
      maxGuests: 3,
      beds: 2,
      bathrooms: 1,
      isAvailable: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', isMain: true }
        ]
      },
      amenities: {
        connect: [{ id: wifi.id }, { id: kitchen.id }]
      }
    }
  })

  const apt5 = await prisma.apartment.create({
    data: {
      title: 'Classic Boutique Apartment',
      slug: 'classic-boutique-apartment',
      description: 'Классическая квартира в старом городе.',
      price: 200,
      address: 'пл. Свободы, 2, Тбилиси',
      area: 75,
      rooms: 2,
      floor: 4,
      maxGuests: 4,
      beds: 2,
      bathrooms: 1,
      isAvailable: false,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', isMain: true }
        ]
      },
      amenities: {
        connect: [{ id: wifi.id }, { id: ac.id }, { id: tv.id }]
      }
    }
  })

  // Create Admin User
  // Password is 'admin123'
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' // SHA-256 for admin123
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
