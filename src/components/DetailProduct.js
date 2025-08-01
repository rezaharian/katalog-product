'use client'

import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function DetailProduct({ product, onBack }) {
  const { addToCart } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!product) return <div className="p-8 text-gray-600">Produk tidak ditemukan.</div>

  const priceIDR = (product.price * 16000).toLocaleString('id-ID')

  const whatsappURL = `https://wa.me/6285880333326?text=Halo,%20saya%20ingin%20pesan%20produk:%20${encodeURIComponent(
    product.title
  )}%20dengan%20harga%20Rp${priceIDR}`

  return (
    <div className="pt-24 px-8 pb-12 bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen">
      <button onClick={onBack} className="mb-4 text-sm text-blue-600 hover:underline">
        ← Kembali ke katalog
      </button>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex justify-center items-center">
                <img
          src={
            product.image
              ? product.image
              : product.thumbnail
              ? product.thumbnail
              : product.images && product.images[0]
              ? product.images[0]
              : "https://via.placeholder.com/300"
          }
          alt={product.title}
          className="w-64 h-64 object-contain"
        />

        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>

          <div className="flex items-center text-yellow-500 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating?.rate) ? '' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.4 15,17.2 9.9,14.1 4.8,17.2 6.1,11.4 1.6,7.3 7.5,6.6 " />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating?.rate} / 5 ({product.rating?.count} ulasan)
            </span>
          </div>

          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Detail Tambahan */}
          <div className="text-sm text-gray-600 mb-4 space-y-1">
            {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
            <p><strong>Harga:</strong> Rp {priceIDR}</p>
            {product.stock && <p><strong>Stok:</strong> {product.stock} tersedia</p>}
            {product.category && <p><strong>Kategori:</strong> {product.category}</p>}
            {product.id && <p><strong>ID Produk:</strong> #{product.id}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-semibold shadow-sm transition"
            >
              + Tambah ke Keranjang
            </button>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-semibold shadow-sm transition"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
