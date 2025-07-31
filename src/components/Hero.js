"use client";

import {
  ShoppingBag,
  Shirt,
  Gem,
  Star,
  Glasses,
  Watch,
  Crown,
  Handbag,
  Tag,
  BadgePercent,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const availableIcons = [
  ShoppingBag,
  Shirt,
  Gem,
  Star,
  Glasses,
  Watch,
  Crown,
  Handbag,
  Tag,
  BadgePercent,
];

// Buat grid 5x6 posisi ikon
function generateGridIcons(rows = 7, cols = 6) {
  const icons = [];
  const rowGap = 100 / (rows + 1);
  const colGap = 100 / (cols + 1);

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const Component =
        availableIcons[Math.floor(Math.random() * availableIcons.length)];

      const top = row * rowGap + Math.random() * 2 - 1; // variasi kecil -1% s/d +1%
      const left = col * colGap + Math.random() * 2 - 1;

      const radius = Math.random() * 10 + 5; // 5–15px
      const angle = Math.random() * 360;
      const duration = Math.random() * 5 + 4; // 4–9 detik

      const animate = {
        x: [0, radius * Math.cos(angle), 0, -radius * Math.cos(angle), 0],
        y: [0, -radius * Math.sin(angle), 0, radius * Math.sin(angle), 0],
        rotate: [0, 10, -10, 0], // rotasi kecil
      };

      icons.push({
        Component,
        top,
        left,
        animate,
        transition: {
          repeat: Infinity,
          duration,
          ease: "easeInOut",
        },
      });
    }
  }

  return icons;
}


export default function Hero() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    setIcons(generateGridIcons());
  }, []);

  return (
    <div className="w-full h-96 flex flex-col md:flex-row relative rounded-xl shadow-lg overflow-hidden mb-10 bg-gradient-to-r from-blue-400 via-pink-200 to-pink-400">
      <img
        src="https://prismic-proxy.imgix.net/juvia-b2c-shop/Z-5_eHdAxsiBwRgo_XXL-themenshop-250410-sale-damen-modul-02b-de-en.jpg?auto=format,compress&rect=0,0,5760,1440&w=2600&h=650"
        alt="Banner Katalog Produk"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Kolom Kiri */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center px-6">
        <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
          Ambil Promo
        </button>
      </div>

      {/* Kolom Kanan */}
      <div className="relative z-10 w-full md:w-1/2 h-full overflow-hidden">
        {icons.map(({ Component, top, left, animate, transition }, index) => (
          <motion.div
            key={index}
            className="absolute text-white opacity-20"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={animate}
            transition={transition}
          >
            <Component size={22} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
