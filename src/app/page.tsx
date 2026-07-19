import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CatalogFilters from '@/components/CatalogFilters'
import prisma from '@/lib/prisma'
import Link from 'next/link'

async function getApartments() {
  const apartments = await prisma.apartment.findMany({
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
      amenities: true
    },
    orderBy: { createdAt: 'desc' },
  })
  return apartments
}

export default async function Home() {
  const apartments = await getApartments()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black">
            {/* Using a placeholder background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80')" }}
            ></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Современные <br/>квартиры в аренду
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Премиальные апартаменты в лучших локациях для вашего идеального отдыха и работы.
            </p>
            <Link
              href="#catalog"
              className="inline-block bg-lime-400 hover:bg-white text-black font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Смотреть квартиры
            </Link>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Advantages Section */}
        <section id="advantages" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Наши преимущества</h2>
              <div className="h-1 w-20 bg-lime-400 mx-auto rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 transition-colors">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 text-lime-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Отличное расположение</h3>
                <p className="text-gray-600">Все квартиры находятся в пешей доступности от главных достопримечательностей.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 transition-colors">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 text-lime-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Чистота и комфорт</h3>
                <p className="text-gray-600">Идеальная чистота перед каждым заселением и свежее постельное белье.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 transition-colors">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 text-lime-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 11.414 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Быстрый Wi-Fi</h3>
                <p className="text-gray-600">Бесплатный высокоскоростной интернет для работы и развлечений.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 transition-colors">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 text-lime-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Оборудованная кухня</h3>
                <p className="text-gray-600">Всё необходимое для приготовления еды прямо в апартаментах.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 transition-colors">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 text-lime-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Быстрое заселение</h3>
                <p className="text-gray-600">Возможность самостоятельного и бесконтактного заселения 24/7.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-lime-200 transition-colors">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 text-lime-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Бесплатная парковка</h3>
                <p className="text-gray-600">Безопасное место для вашего автомобиля рядом с домом.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Наши апартаменты</h2>
                <div className="h-1 w-20 bg-lime-400 rounded"></div>
              </div>
              <p className="text-gray-400 mt-4 md:mt-0 max-w-md md:text-right">
                Выберите идеальный вариант для вашего пребывания из нашей коллекции премиальных квартир.
              </p>
            </div>

            <CatalogFilters initialApartments={apartments} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
