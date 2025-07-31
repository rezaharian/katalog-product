"use client";

import { FaInstagram, FaFacebookF, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-8 pb-4 mt-12 text-gray-700 text-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo & Info */}
        <div className="flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <img src="https://images.vexels.com/media/users/3/229333/isolated/preview/8b91f41fef575427ff01544eabfaa4f6-three-lines-gradient-logo.png" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-bold text-lg text-blue-700">Katalog Produk</span>
          </div>
          <p className="text-gray-600 mb-4">
            Katalog Produk adalah platform belanja online yang menyediakan berbagai produk berkualitas dengan harga terjangkau. Temukan penawaran menarik setiap hari!
          </p>
          <div className="text-gray-500 mb-4"></div>
          <div className="flex items-center gap-2 mb-1">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>Jl. Contoh Alamat No. 123, Jakarta</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <FaEnvelope className="text-pink-500" />
            <span>info@katalogproduk.com</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <FaWhatsapp className="text-green-500" />
            <span>+62 858-8033-3326</span>
          </div>
        </div>

        {/* Bank */}
        <div className="flex-1 mb-6 md:mb-0">
          <div className="font-semibold text-center mb-2">Pembayaran Bank:</div>
   
   <div className="flex justify-center my-6">
  <img
    src="https://i.pinimg.com/736x/75/6a/0d/756a0dc1b222b3335f9caa3f12cbffce.jpg"
    alt="Logo Bank BCA BRI Mandiri BNI"
    className=" w-80"
  />
</div>

        </div>

        {/* Medsos & App */}
        <div className="flex-1">
          <div className="font-semibold mb-2">Ikuti Kami:</div>
          <div className="flex gap-4 mb-3">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl text-pink-500 hover:text-pink-600" /></a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF className="text-2xl text-blue-600 hover:text-blue-700" /></a>
            <a href="mailto:info@katalogproduk.com"><FaEnvelope className="text-2xl text-gray-500 hover:text-blue-500" /></a>
            <a href="https://wa.me/6285880333326" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-2xl text-green-500 hover:text-green-600" /></a>
          </div>
          <div className="font-semibold mb-2">Download Aplikasi:</div>
          <div className="flex gap-4">
            <a href="#" title="Google Play">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 w-auto"
              />
            </a>
            <a href="#" title="App Store">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Katalog Produk. All rights reserved. Dibuat dengan <span className="text-pink-500">❤</span> oleh <a href="https://github.com/rezaharian/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tim Developer</a>
      </div>
    </footer>
  );
}