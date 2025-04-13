'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-orange-light-very backdrop-blur-sm bg-white/90">
      <div className="container-custom py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className="flex items-center">
              <div className="relative w-14 h-14 mr-3 transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-orange-light-very rounded-full blur-md opacity-50"></div>
                <div className="relative">
                  <Image 
                    src="/orange-logo.png" 
                    alt="PTE Intensive Logo" 
                    width={56} 
                    height={56}
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">
                  PTE Intensive
                </h1>
                <p className="text-xs text-gray-500">Học là đậu</p>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-orange-primary font-medium transition-all duration-300 relative group py-2 px-3"
            >
              <span className="relative z-10">Trang chủ</span>
              <span className="absolute bottom-0 left-0 w-0 h-full bg-orange-light-very opacity-0 rounded-lg -z-10 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
            </Link>
            <a 
              href="https://www.facebook.com/pteintensive" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-orange-primary font-medium transition-all duration-300 relative group py-2 px-3"
            >
              <span className="relative z-10">Liên hệ Facebook</span>
              <span className="absolute bottom-0 left-0 w-0 h-full bg-orange-light-very opacity-0 rounded-lg -z-10 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
            </a>
            <a 
              href="https://www.facebook.com/PTE.Intensive.VN" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-orange-primary font-medium transition-all duration-300 relative group py-2 px-3"
            >
              <span className="relative z-10">Liên hệ tư vấn</span>
              <span className="absolute bottom-0 left-0 w-0 h-full bg-orange-light-very opacity-0 rounded-lg -z-10 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
            </a>
            <a 
              href="#registration-form" 
              className="bg-gradient-to-r from-orange-primary to-orange-bright hover:from-orange-bright hover:to-orange-primary text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Đăng ký ngay
            </a>
          </nav>
          
          <div className="md:hidden">
            <button 
              className="text-[#374151] hover:text-orange-primary transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-6 border-t border-orange-light-very">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-primary font-medium transition-all duration-300 relative group py-3 px-4 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Trang chủ</span>
                </div>
                <span className="absolute inset-0 bg-orange-light-very opacity-0 rounded-xl -z-10 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>
              <a 
                href="https://www.facebook.com/pteintensive" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-orange-primary font-medium transition-all duration-300 relative group py-3 px-4 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  <span>Liên hệ Facebook</span>
                </div>
                <span className="absolute inset-0 bg-orange-light-very opacity-0 rounded-xl -z-10 transition-opacity duration-300 group-hover:opacity-100"></span>
              </a>
              <a 
                href="https://www.facebook.com/PTE.Intensive.VN" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-orange-primary font-medium transition-all duration-300 relative group py-3 px-4 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  <span>Liên hệ tư vấn</span>
                </div>
                <span className="absolute inset-0 bg-orange-light-very opacity-0 rounded-xl -z-10 transition-opacity duration-300 group-hover:opacity-100"></span>
              </a>
              <div className="pt-2">
                <a 
                  href="#registration-form" 
                  className="bg-gradient-to-r from-orange-primary to-orange-bright hover:from-orange-bright hover:to-orange-primary text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Đăng ký ngay
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
