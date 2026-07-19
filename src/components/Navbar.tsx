import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
              RENT<span className="text-lime-400">APTS</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Главная</Link>
              <Link href="#catalog" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Квартиры</Link>
              <Link href="#advantages" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Преимущества</Link>
              <Link href="#contacts" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Контакты</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="tel:+995555123456" className="text-white hover:text-lime-400 font-medium transition-colors">+995 555 123 456</a>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
