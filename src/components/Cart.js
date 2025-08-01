"use client"

import { useCart } from "../context/CartContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaTrashAlt, FaWhatsapp } from "react-icons/fa"

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * 16000 * item.qty, 0)
  const waNumber = '+6285880333326'
  const waText = encodeURIComponent(
    cart.map(item =>
      `*${item.title}*\nQty: ${item.qty}\nHarga: Rp ${(item.price * 16000).toLocaleString('id-ID')}\nSubtotal: Rp ${(item.price * 16000 * item.qty).toLocaleString('id-ID')}`
    ).join('\n\n') +
    `\n\nTotal: Rp ${total.toLocaleString('id-ID')}`
  )
  const waLink = `https://wa.me/${waNumber}?text=${waText}`

  if (cart.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="p-8 text-center text-gray-400 text-lg font-semibold">
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="mx-auto mb-4 w-24 h-24 opacity-60" />
            Keranjang kosong.<br />
            Yuk, belanja produk favoritmu!
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="rounded-xl shadow-lg bg-white p-4 sm:p-6 mb-8">
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image || item.thumbnail || item.images?.[0] || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded bg-gray-50 border"
                />
                <div className="flex-1">
                  <div className="text-sm sm:text-base font-semibold text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                  <div className="text-pink-600 text-sm font-bold mt-1 mb-2">
                    Rp {(item.price * 16000).toLocaleString('id-ID')}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold text-sm"
                      disabled={item.qty <= 1}
                    >-</button>
                    <span className="w-8 text-center font-semibold text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold text-sm"
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                  <span className="font-bold text-pink-600 text-sm sm:text-base">
                    Rp {(item.price * 16000 * item.qty).toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs mt-2"
                    title="Hapus dari keranjang"
                  >
                    <FaTrashAlt className="text-sm" /> Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-2xl text-pink-600">Rp {total.toLocaleString('id-ID')}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition text-sm sm:text-base"
          >
            <FaWhatsapp className="text-lg" /> Beli via WhatsApp
          </a>
          <button
            onClick={clearCart}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition text-sm sm:text-base"
          >
            <FaTrashAlt className="text-base" /> Kosongkan Keranjang
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
