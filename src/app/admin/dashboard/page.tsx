'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ApartmentType {
  id: number
  title: string
  address: string
  price: number
  currency: string
  isAvailable: boolean
}

interface BookingType {
  id: number
  createdAt: string
  name: string
  phone: string
  comment: string
  status: string
  apartment: {
    title: string
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'apartments' | 'bookings'>('apartments')
  const [apartments, setApartments] = useState<ApartmentType[]>([])
  const [bookings, setBookings] = useState<BookingType[]>([])
  const [loading, setLoading] = useState(true)
  const isFetched = useRef(false)

  const fetchData = useCallback(async () => {
    try {
      const [aptsRes, booksRes] = await Promise.all([
        fetch('/api/admin/apartments'),
        fetch('/api/admin/bookings')
      ])

      if (aptsRes.status === 401 || booksRes.status === 401) {
        localStorage.removeItem('adminAuth')
        router.push('/admin/login')
        return
      }

      if (aptsRes.ok) setApartments(await aptsRes.json())
      if (booksRes.ok) setBookings(await booksRes.json())
    } catch (error) {
      console.error('Error fetching data', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      router.push('/admin/login')
      return
    }

    if (!isFetched.current) {
      isFetched.current = true
      setTimeout(() => {
        fetchData()
      }, 0)
    }
  }, [fetchData, router])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/apartments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus })
      })
      if (res.ok) {
        setApartments(prev => prev.map(apt =>
          apt.id === id ? { ...apt, isAvailable: !currentStatus } : apt
        ))
      } else if (res.status === 401) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error updating status', error)
    }
  }

  const updateBookingStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      })
      if (res.ok) {
        setBookings(prev => prev.map(booking =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        ))
      } else if (res.status === 401) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error updating booking', error)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">RENT<span className="text-lime-400">APTS</span> Admin</Link>
          <button onClick={handleLogout} className="text-sm hover:text-lime-400">Выйти</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${activeTab === 'apartments' ? 'bg-lime-400 text-black' : 'bg-white text-gray-600 border border-gray-200'}`}
            onClick={() => setActiveTab('apartments')}
          >
            Управление квартирами
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${activeTab === 'bookings' ? 'bg-lime-400 text-black' : 'bg-white text-gray-600 border border-gray-200'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Заявки на бронирование
          </button>
        </div>

        {activeTab === 'apartments' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apartments.map((apt) => (
                  <tr key={apt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{apt.title}</div>
                      <div className="text-sm text-gray-500">{apt.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {apt.price} {apt.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(apt.id, apt.isAvailable)}
                        className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${apt.isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                      >
                        {apt.isAvailable ? 'Доступна' : 'Недоступна'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="text-gray-400 cursor-not-allowed">Редактировать (В разработке)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {bookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Нет заявок</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Квартира</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус / Комментарий</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.apartment?.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <select
                          className="mb-2 p-1 border rounded"
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        >
                          <option value="new">Новая</option>
                          <option value="in_progress">В работе</option>
                          <option value="completed">Завершена</option>
                        </select>
                        <div className="max-w-xs truncate text-xs">{booking.comment || '-'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
