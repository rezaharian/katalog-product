"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { ChevronRight, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/context/CartContext"
import DetailProduct from "./DetailProduct"

export default function FlashSale() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()
  const [notification, setNotification] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

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

  if (selectedProduct) {
    return (
      <DetailProduct product={selectedProduct} onBack={() => setSelectedProduct(null)} />
    )
  }

  return (
    <div className="w-full py-6 relative">
      {notification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow z-50 text-sm transition-opacity duration-500">
          {notification}
        </div>
      )}

      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-base sm:text-lg font-semibold text-red-600 tracking-wide">🔥 Flash Sale</h2>
        <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-medium">
          Terbatas <ChevronRight size={12} /> <ChevronRight size={12} />
        </span>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={2}
        slidesPerView={6}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 2.2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="!pb-4"
      >
        {products.map(product => {
          const percentageSold = Math.round((product.sold / product.stock) * 100)

          return (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => setSelectedProduct(product)}
                className="rounded-xl hover:shadow-sm transition-all duration-200 flex flex-col items-center relative group w-full h-[220px] sm:h-[240px] md:h-[260px] max-w-[130px] sm:max-w-[150px] md:max-w-[160px] overflow-hidden bg-white cursor-pointer"
              >
                <span className="absolute top-1 left-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-semibold shadow">
                  {Math.round(product.discountPercentage)}% OFF
                </span>

                <div className="w-full flex justify-center items-center p-2 h-[100px]">
                  <img
                    src={product.thumbnail ?? product.images?.[0] ?? "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="w-24 h-24 object-contain rounded transition group-hover:scale-105"
                  />
                </div>

                <div className="font-semibold text-[10px] text-center text-gray-800 line-clamp-2 px-1 mt-1">
                  {product.title}
                </div>

                <div className="flex items-center gap-0.5 text-yellow-500 text-[9px] mt-1 mb-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.round(product.rating) ? "fill-yellow-400" : "stroke-yellow-300"}`}
                    />
                  ))}
                  <span className="text-[8px] text-gray-500">({Math.round(product.rating * 20)} ulasan)</span>
                </div>

                <div className="flex items-center gap-1 mb-1 mt-0.5">
                  <span className="text-red-600 font-semibold text-[10px]">
                    Rp {(product.price * 16000).toLocaleString("id-ID")}
                  </span>
                  <span className="text-[8px] text-gray-400 line-through">
                    Rp {((product.price * 16000) / (1 - product.discountPercentage / 100)).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="w-full px-2 mt-0.5">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full">
                    <div
                      className="h-1.5 bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                      style={{ width: `${percentageSold}%` }}
                    />
                  </div>
                  <div className="text-[8px] text-gray-600 mt-0.5 text-center">
                    {product.sold} terjual dari {product.stock}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                    setNotification(`✅ Produk "${product.title}" telah dimasukkan ke keranjang`)
                    setTimeout(() => setNotification(null), 3000)
                  }}
                  className="mt-auto mb-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] flex items-center gap-1 shadow-sm transition"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
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
