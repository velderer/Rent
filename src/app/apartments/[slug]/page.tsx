import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'

export const dynamic = 'force-dynamic'

async function getApartment(slug: string) {
  const apartment = await prisma.apartment.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      amenities: true,
    },
  })
  return apartment
}

export default async function ApartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apartment = await getApartment(slug)

  if (!apartment) {
    notFound()
  }

  const mainImage = apartment.images.find(img => img.isMain) || apartment.images[0]
  const galleryImages = apartment.images.filter(img => img.id !== mainImage?.id)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/#catalog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-6 transition-colors">
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад в каталог
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[50vh] min-h-[400px]">
            {mainImage ? (
              <div className="md:col-span-3 relative rounded-2xl overflow-hidden group">
                <Image
                  src={mainImage.url}
                  alt={apartment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority
                />
              </div>
            ) : (
              <div className="md:col-span-3 bg-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400">Нет фото</span>
              </div>
            )}

            <div className="hidden md:grid grid-rows-2 gap-4">
              {galleryImages.slice(0, 2).map((img) => (
                <div key={img.id} className="relative rounded-2xl overflow-hidden group">
                  <Image
                    src={img.url}
                    alt={`${apartment.title} - ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="25vw"
                  />
                </div>
              ))}
              {galleryImages.length === 0 && (
                <>
                  <div className="bg-gray-100 rounded-2xl"></div>
                  <div className="bg-gray-100 rounded-2xl"></div>
                </>
              )}
              {galleryImages.length === 1 && (
                <div className="bg-gray-100 rounded-2xl"></div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight">{apartment.title}</h1>
                </div>
                <p className="text-gray-500 text-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {apartment.address}
                </p>
              </div>

              {/* Characteristics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Площадь</p>
                  <p className="text-xl font-bold text-black">{apartment.area} м²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Комнат</p>
                  <p className="text-xl font-bold text-black">{apartment.rooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Макс. гостей</p>
                  <p className="text-xl font-bold text-black">{apartment.maxGuests}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Этаж</p>
                  <p className="text-xl font-bold text-black">{apartment.floor}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Описание</h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  {apartment.description.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {apartment.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">Удобства</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                    {apartment.amenities.map(amenity => (
                      <div key={amenity.id} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rules / Times */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-black mb-4">Правила размещения</h3>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Заезд</p>
                      <p className="font-bold text-black">После {apartment.checkInTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Выезд</p>
                      <p className="font-bold text-black">До {apartment.checkOutTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Расположение на карте</h2>
                <div className="bg-gray-200 w-full h-[400px] rounded-2xl flex flex-col items-center justify-center text-gray-500">
                  <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Интерактивная карта (требуется API ключ)</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(apartment.address)}`} target="_blank" rel="noopener noreferrer" className="mt-4 text-lime-600 hover:underline">
                    Открыть в Google Maps
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-black text-white p-6 rounded-t-2xl">
                  <p className="text-3xl font-bold">
                    {apartment.price} {apartment.currency}
                    <span className="text-base font-normal text-gray-400">/{apartment.pricePer}</span>
                  </p>

                  <div className="mt-4">
                    {apartment.isAvailable ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lime-500 text-black">
                        Доступна для бронирования
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                        Временно недоступна
                      </span>
                    )}
                  </div>
                </div>

                <div className="border border-t-0 border-gray-100 rounded-b-2xl overflow-hidden">
                   <BookingForm apartmentId={apartment.id} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
