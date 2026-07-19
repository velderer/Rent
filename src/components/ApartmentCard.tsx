import Image from 'next/image'
import Link from 'next/link'
import { Apartment, ApartmentImage } from '@prisma/client'

type ApartmentWithImages = Apartment & { images: ApartmentImage[] }

export default function ApartmentCard({ apartment }: { apartment: ApartmentWithImages }) {
  const mainImage = apartment.images.find(img => img.isMain) || apartment.images[0]

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 w-full">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={apartment.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Нет фото</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {apartment.isAvailable ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-black shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 mr-2 rounded-full bg-lime-500 animate-pulse"></span>
              Доступна
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-black shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 mr-2 rounded-full bg-red-500"></span>
              Занята
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-black group-hover:text-lime-600 transition-colors">
            {apartment.title}
          </h3>
          <p className="text-xl font-bold whitespace-nowrap ml-4">
            {apartment.price} {apartment.currency}
            <span className="text-sm text-gray-500 font-normal">/{apartment.pricePer}</span>
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-1">
          {apartment.address}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {apartment.area} м²
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            До {apartment.maxGuests} гостей
          </div>
        </div>

        <Link
          href={`/apartments/${apartment.slug}`}
          className="block w-full text-center bg-black hover:bg-lime-400 text-white hover:text-black font-semibold py-3 px-4 rounded-xl transition-all duration-300"
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}
