"use client";
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  // Hitung total item di keranjang
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <img src="https://images.vexels.com/media/users/3/229333/isolated/preview/8b91f41fef575427ff01544eabfaa4f6-three-lines-gradient-logo.png" alt="Logo" className="h-8 w-8 object-contain" />
        <span className="font-bold text-xl text-blue-700 tracking-wide">Katalog Produk</span>
      </div>
      <div className="flex gap-6">
        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
        <Link href="/cart" className="relative text-gray-700 hover:text-green-600 font-medium transition-colors flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.52 17h8.96a1 1 0 00.87-1.3L17 13M7 13V6h10v7" />
          </svg>
          Keranjang
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}