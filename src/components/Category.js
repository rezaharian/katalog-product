"use client"

import { useEffect, useState } from "react"
import { HiOutlineUser, HiOutlineDeviceMobile, HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineChip, HiOutlineCamera, HiOutlineGlobeAlt } from "react-icons/hi"

const categoryIcons = {
  "men's clothing": <HiOutlineUser className="text-2xl text-blue-500" />,
  "women's clothing": <HiOutlineSparkles className="text-2xl text-pink-500" />,
  "jewelery": <HiOutlineShoppingBag className="text-2xl text-yellow-500" />,
  "electronics": <HiOutlineDeviceMobile className="text-2xl text-gray-500" />,
  "accessories": <HiOutlineChip className="text-2xl text-green-500" />,
  "photography": <HiOutlineCamera className="text-2xl text-purple-500" />,
  "international": <HiOutlineGlobeAlt className="text-2xl text-indigo-500" />,
}

export default function CategoryBar({ selected, onSelect }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        setCategories([
          ...data,
          
        ])
      })
  }, [])

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 md:gap-4 justify-center items-center py-4 bg-none rounded-xl shadow-none mb-8 min-w-max flex-nowrap">
        <div
          onClick={() => onSelect(null)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium
            ${!selected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100'}
          `}
        >
          <HiOutlineShoppingBag className="text-2xl" />
          Semua
        </div>
        {categories.map(cat => (
          <div
            key={cat}
            onClick={() => onSelect(cat)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium
              ${selected === cat ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100'}
            `}
          >
            {categoryIcons[cat] || <HiOutlineShoppingBag className="text-2xl text-blue-400" />}
            <span className="capitalize">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}