'use client'

import { useState } from 'react'

export default function BookingForm({ apartmentId }: { apartmentId: number }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [spamProtection, setSpamProtection] = useState('') // Simple honeypot

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple honeypot check
    if (spamProtection !== '') {
      setStatus('error')
      setErrorMessage('Spam detected.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          apartmentId,
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки')
      }

      setStatus('success')
      setFormData({ name: '', phone: '', email: '', comment: '' })
    } catch (error: unknown) {
      console.error(error)
      setStatus('error')
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Что-то пошло не так. Попробуйте позже.')
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-lime-50 rounded-2xl p-8 text-center border border-lime-200">
        <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Спасибо!</h3>
        <p className="text-gray-600 mb-6">Ваша заявка успешно отправлена.<br/>Мы свяжемся с вами в ближайшее время.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-semibold text-black hover:text-lime-600 underline"
        >
          Отправить еще одну заявку
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-2xl font-bold text-black mb-6">Оставить заявку</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from real users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={spamProtection}
            onChange={(e) => setSpamProtection(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all"
            placeholder="Как к вам обращаться"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all"
            placeholder="+995 555 000 000"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (необязательно)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Укажите даты или особые пожелания"
          ></textarea>
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black hover:bg-lime-400 text-white hover:text-black font-bold py-4 px-6 rounded-xl transition-colors duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Отправка...' : 'Оставить заявку'}
        </button>
      </form>
    </div>
  )
}
