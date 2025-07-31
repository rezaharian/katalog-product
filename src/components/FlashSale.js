"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function FlashSale() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then(res => res.json())
      .then(data => {
        const updatedProducts = (data.products || []).map(product => {
          const stock = Math.floor(Math.random() * 120) + 80
          const sold = Math.floor(stock * (Math.random() * 0.8 + 0.1))
          return { ...product, sold, stock }
        })
        setProducts(updatedProducts)
      })
      .catch(err => console.error("Error fetching products:", err))
  }, [])

  return (
    <div className="w-full py-8 relative">
      {/* Notifikasi popup */}
      {notification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow z-50 text-sm transition-opacity duration-500">
          {notification}
        </div>
      )}

      <div className="flex items-center justify-between  mb-4 px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-red-600 tracking-wide">🔥 Flash Sale</h2>
        <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-medium">Terbatas!</span>
      </div>



      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={6}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="!pb-6"
      >
        {products.map(product => {
          const percentageSold = Math.round((product.sold / product.stock) * 100)

          return (
            <SwiperSlide key={product.id}>
              <div className="rounded-xl   border-0 shadow-orange-400 hover:shadow-sm transition-all duration-200 flex flex-col items-center relative group w-full h-[320px] max-w-[180px] mx-auto overflow-hidden bg-white">
                
                {/* Label Diskon */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold shadow">
                  {Math.round(product.discountPercentage)}% OFF
                </span>

                {/* Gambar Produk */}
                <div className="w-full bg-white flex justify-center items-center p-3 h-[150px]">
                  <img
                    src={product.thumbnail ?? product.images?.[0] ?? "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="w-32 h-32 object-contain rounded transition group-hover:scale-105"
                  />
                </div>

                {/* Nama Produk */}
                <div className="font-semibold text-[11px] text-center text-gray-800 line-clamp-2 px-2 mt-1">
                  {product.title}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-[10px] mt-1 mb-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.round(product.rating) ? "fill-yellow-400" : "stroke-yellow-300"}`}
                    />
                  ))}
                  <span className="text-[9px] text-gray-500">({Math.round(product.rating * 20)} ulasan)</span>
                </div>

                {/* Harga */}
                <div className="flex items-center gap-1 mb-1 mt-0.5">
                  <span className="text-red-600 font-semibold text-[11px]">
                    Rp {(product.price * 16000).toLocaleString("id-ID")}
                  </span>
                  <span className="text-[9px] text-gray-400 line-through">
                    Rp {((product.price * 16000) / (1 - product.discountPercentage / 100)).toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Progress Penjualan */}
                <div className="w-full px-3 mt-1">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                      style={{ width: `${percentageSold}%` }}
                    />
                  </div>
                  <div className="text-[9px] text-gray-600 mt-0.5 text-center">
                    {product.sold} terjual dari {product.stock}
                  </div>
                </div>

                {/* Tombol + Keranjang */}
                <button
                  onClick={() => {
                    addToCart(product)
                    setNotification(`✅ Produk "${product.title}" telah dimasukkan ke keranjang`)
                    setTimeout(() => setNotification(null), 3000)
                  }}
                  className="mt-auto mb-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] flex items-center gap-1 shadow-sm transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>+ Cart</span>
                </button>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
