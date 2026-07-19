'use client'

import { useState } from 'react'
import { Apartment, ApartmentImage, Amenity } from '@prisma/client'
import ApartmentCard from './ApartmentCard'

type ApartmentWithRelations = Apartment & {
  images: ApartmentImage[]
  amenities: Amenity[]
}

export default function CatalogFilters({ initialApartments }: { initialApartments: ApartmentWithRelations[] }) {
  const [apartments, setApartments] = useState(initialApartments)

  // Filter states
  const [priceMax, setPriceMax] = useState<number | ''>('')
  const [guests, setGuests] = useState<number | ''>('')
  const [parking, setParking] = useState(false)
  const [ac, setAc] = useState(false)
  const [wifi, setWifi] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)

  const applyFilters = () => {
    let filtered = initialApartments

    if (priceMax !== '') {
      filtered = filtered.filter(a => a.price <= Number(priceMax))
    }
    if (guests !== '') {
      filtered = filtered.filter(a => a.maxGuests >= Number(guests))
    }
    if (availableOnly) {
      filtered = filtered.filter(a => a.isAvailable)
    }

    if (parking) {
      filtered = filtered.filter(a => a.amenities.some(am => am.name.toLowerCase().includes('парковка')))
    }
    if (ac) {
      filtered = filtered.filter(a => a.amenities.some(am => am.name.toLowerCase().includes('кондиционер')))
    }
    if (wifi) {
      filtered = filtered.filter(a => a.amenities.some(am => am.name.toLowerCase().includes('wi-fi')))
    }

    setApartments(filtered)
  }

  const resetFilters = () => {
    setPriceMax('')
    setGuests('')
    setParking(false)
    setAc(false)
    setWifi(false)
    setAvailableOnly(false)
    setApartments(initialApartments)
  }

  return (
    <div>
      {/* Filters UI */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100 text-black">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Макс. цена (₾)</label>
            <input
              type="number"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value ? Number(e.target.value) : '')}
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Любая"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Гостей</label>
            <input
              type="number"
              value={guests}
              onChange={e => setGuests(e.target.value ? Number(e.target.value) : '')}
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Любое кол-во"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={parking} onChange={e => setParking(e.target.checked)} className="rounded" />
            <span>Парковка</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={ac} onChange={e => setAc(e.target.checked)} className="rounded" />
            <span>Кондиционер</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={wifi} onChange={e => setWifi(e.target.checked)} className="rounded" />
            <span>Wi-Fi</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="rounded" />
            <span>Доступна сейчас</span>
          </label>
        </div>

        <div className="mt-6 flex space-x-4">
          <button onClick={applyFilters} className="bg-black text-white px-6 py-2 rounded-xl hover:bg-lime-400 hover:text-black transition-colors font-medium">
            Применить
          </button>
          <button onClick={resetFilters} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-200 transition-colors font-medium">
            Сбросить
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      {apartments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          По вашему запросу ничего не найдено.
        </div>
      )}
    </div>
  )
}
