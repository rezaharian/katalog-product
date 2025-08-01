'use client'

import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import Hero from '../components/Hero'
import FlashSale from '../components/FlashSale'
import DetailProduct from '../components/DetailProduct'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupProduct, setPopupProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const ProductCard = ({ p, badge }) => (
    <div
      onClick={() => setSelectedProduct(p)}
      className="relative bg-white rounded-xl shadow hover:shadow-lg transition-all p-2 border border-gray-100 group flex flex-col cursor-pointer min-h-[240px]"
    >
      <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-medium shadow 
        ${badge === 'Flash Sale' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' : 'bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800'}`}>
        {badge}
      </span>

      <div className="flex-1 flex items-center justify-center mb-2">
        <img
          src={p.image}
          alt={p.title}
          className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <h2 className="text-xs font-semibold text-gray-800 mb-1 line-clamp-2">
        {p.title}
      </h2>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{p.category}</span>
        <span className="flex items-center text-yellow-500 text-[10px] font-semibold">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`h-3 w-3 ${i < Math.round(p.rating.rate) ? '' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.4 15,17.2 9.9,14.1 4.8,17.2 6.1,11.4 1.6,7.3 7.5,6.6 " />
            </svg>
          ))}
          <span className="ml-1 text-gray-600">{p.rating.rate}</span>
        </span>
      </div>

      <p className="text-[10px] text-gray-500 mb-1 line-clamp-2">
        {p.description}
      </p>

      <div className="flex items-center justify-between mt-auto gap-2">
        <span className="text-pink-600 font-semibold text-[12px]">
          Rp {(p.price * 16000).toLocaleString('id-ID')}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-medium shadow-sm transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation()
            addToCart(p)
            setPopupProduct(p)
            setShowPopup(true)
            setTimeout(() => setShowPopup(false), 1500)
          }}
        >
          + Cart
        </button>
      </div>
    </div>
  )

  return (
    <>
      {selectedProduct ? (
        <DetailProduct product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen pt-3">
          <br />
          <br />
          <Navbar />
          <Hero />
          <FlashSale onSelectProduct={(product) => setSelectedProduct(product)} />

          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 mt-4">Produk Kami</h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                p={product}
                badge={i < 4 ? 'Flash Sale' : 'Tersedia'}
              />
            ))}
          </div>
      <Footer />

          {showPopup && popupProduct && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-200 px-4 py-2 rounded-lg z-50 text-sm">
              <span className="text-green-600 font-semibold">
                {popupProduct.title}
              </span>{" "}
              telah ditambahkan ke keranjang
            </div>
          )}
        </main>
      )}
    </>
  )
}
