'use client'

import Cart from '../../components/Cart'

export default function CartPage() {
  return (
    <div className="pt-24 px-4 min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Keranjang Belanja</h1>
      <Cart />
    </div>
  )
}