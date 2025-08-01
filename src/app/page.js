'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import CategoryBar from '../components/Category'
import FlashSale from '../components/FlashSale'
import DetailProduct from '../components/DetailProduct'

function getMultipleOfFour(arr) {
  return arr.slice(0, arr.length - (arr.length % 4))
}

export default function Home() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()
  const [showPopup, setShowPopup] = useState(false)
  const [popupProduct, setPopupProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const waNumber = '+6285880333326'
  const handleWaLink = (p) => {
    const text = `Halo, saya ingin memesan produk berikut:%0A%0A` +
      `*${p.title}*%0A` +
      `Harga: Rp ${(p.price * 16000).toLocaleString('id-ID')}%0A` +
      `Deskripsi: ${p.description}`
    return `https://wa.me/${waNumber}?text=${text}`
  }

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  const ProductCard = ({ p, badge }) => (
    <div
      onClick={() => setSelectedProduct(p)}
  className="relative bg-white shadow-md rounded-xl overflow-hidden p-2 flex flex-col border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group min-h-[260px] cursor-pointer"

    >
      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide shadow
        ${badge === 'Flash Sale' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
          'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800'}`}>
        {badge}
      </span>
      <div className="flex-1 flex items-center justify-center mb-2">
        <img
          src={p.image}
          alt={p.title}
          className="w-24 h-24 object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <h2 className="font-semibold text-xs text-gray-800 mb-1 line-clamp-2">
{p.title}</h2>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{p.category}</span>
        <span className="flex items-center text-yellow-500 text-xs font-semibold">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`inline h-3 w-3 ${i < Math.round(p.rating.rate) ? '' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.7,11.4 15,17.2 9.9,14.1 4.8,17.2 6.1,11.4 1.6,7.3 7.5,6.6 " />
            </svg>
          ))}
          <span className="ml-1 text-gray-600">{p.rating.rate}</span>
          <span className="ml-1 text-gray-400">({p.rating.count})</span>
        </span>
      </div>
      <p className="text-gray-500 text-[11px] mb-1 line-clamp-2">
{p.description}</p>
      <div className="flex items-center justify-between mt-auto gap-2">
<span className="text-pink-600 font-semibold text-sm">
          Rp {(p.price * 16000).toLocaleString('id-ID')}
        </span>
        <a
          href={handleWaLink(p)}
          target="_blank"
          rel="noopener noreferrer"
  className="bg-green-500 hover:bg-green-600 text-white px-2 py-0.5 rounded-md font-medium shadow-sm transition-colors duration-200 flex items-center gap-1 text-[11px]"

          title="Pesan via WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.72 11.06a6.5 6.5 0 11-3.72-3.72l2.06 2.06m0 0l2.06-2.06m-2.06 2.06V7.5" />
          </svg>
          Pesan
        </a>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md font-semibold shadow-sm transition-colors duration-200 flex items-center gap-1 text-xs"
          title="Masukkan Keranjang"
          onClick={(e) => {
            e.stopPropagation()
            addToCart(p)
            setPopupProduct(p)
            setShowPopup(true)
            setTimeout(() => setShowPopup(false), 1500)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.52 17h8.96a1 1 0 00.87-1.3L17 13M7 13V6h10v7" />
          </svg>
          + Cart
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />

      {showPopup && popupProduct && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>
            <b>{popupProduct.title}</b> telah dimasukkan ke keranjang!
          </span>
        </div>
      )}

      <div className="pt-20 px-8 bg-gradient-to-br from-blue-100 via-white to-pink-100">
        {selectedProduct ? (
          <DetailProduct product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        ) : (
          <>
            <Hero />
            <FlashSale />
            <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
            <main className="min-h-screen -mt-10 pt-4">
              <section>
                <h2 className="text-2xl mt-6 font-bold mb-4 text-blue-600">
                  {selectedCategory ? `Kategori: ${selectedCategory}` : 'Semua Produk'}
                </h2>
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getMultipleOfFour(filteredProducts).map((p) => (
                    <ProductCard key={p.id} p={p} badge={selectedCategory ? selectedCategory : "Produk"} />
                  ))}
                </div>
              </section>
            </main>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}
