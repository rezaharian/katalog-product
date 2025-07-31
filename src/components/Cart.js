"use client";

import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaTrashAlt, FaWhatsapp } from "react-icons/fa";

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart()

  // Hitung total harga
  const total = cart.reduce((sum, item) => sum + item.price * 16000 * item.qty, 0)

  // Format pesan WhatsApp
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
    // src={product.thumbnail ?? product.images?.[0] ?? "https://via.placeholder.com/150"}
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 sm:p-8 max-w-3xl mx-auto w-full">
        <div className="rounded-xl shadow-lg bg-white p-4 sm:p-8 mb-8">
          <ul className="divide-y divide-gray-200">
            {cart.map(item => (
              <li key={item.id} className="flex flex-col sm:flex-row items-center py-4 gap-4">
        <img
  src={
    item.image ||
    item.thumbnail ||
    item.images?.[0] ||
    "https://via.placeholder.com/150"
  }
  alt={item.title}
  className="w-20 h-20 object-contain rounded border bg-gray-50"
/>

                <div className="flex-1 w-full">
                  <div className="font-semibold text-base text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                  <div className="text-sm text-pink-600 font-bold mb-2">Rp {(item.price * 16000).toLocaleString('id-ID')}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold text-lg"
                      disabled={item.qty <= 1}
                    >-</button>
                    <span className="w-8 text-center font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold text-lg"
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <span className="font-bold text-pink-600 text-lg">
                    Rp {(item.price * 16000 * item.qty).toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-semibold transition"
                    title="Hapus dari keranjang"
                  >
                    <FaTrashAlt className="inline" /> Hapus
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
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow transition text-lg"
          >
            <FaWhatsapp className="text-2xl" /> Beli via WhatsApp
          </a>
          <button
            onClick={clearCart}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            <FaTrashAlt className="text-lg" /> Kosongkan Keranjang
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}