import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Wave shape divider */}
      <div className="w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-gray-900 fill-current rotate-180">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-primary to-orange-bright opacity-10 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-bright to-orange-primary opacity-10 rounded-full -ml-48 -mb-48"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-orange-primary opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-orange-bright opacity-10 rounded-full blur-xl"></div>
      
      <div className="container-custom py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Logo and description section */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-16 pb-16 border-b border-gray-800">
            <div className="mb-12 md:mb-0 md:w-1/3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="relative w-16 h-16 mr-4 group">
                  <div className="absolute inset-0 bg-orange-light-very rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative">
                    <Image 
                      src="/orange-logo.png" 
                      alt="PTE Intensive Logo" 
                      width={64} 
                      height={64}
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">
                    <span className="text-orange-bright">PTE</span> <span className="text-orange-primary">Intensive</span>
                  </h3>
                  <p className="text-sm text-gray-400">Học là đậu</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                Tư vấn lộ trình cá nhân hóa – Trải nghiệm lớp học thật – Học là đậu! Chúng tôi cam kết đồng hành cùng bạn.
              </p>
              
              <div className="flex space-x-4 justify-center md:justify-start">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-primary transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a 
                  href="https://zalo.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-primary transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Zalo"
                >
                  <span className="font-bold text-sm">Zalo</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-primary transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Links sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:w-2/3 md:pl-12">
              <div>
                <h3 className="text-xl font-bold mb-8 text-orange-primary relative inline-block">
                  Liên hệ
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-primary to-orange-bright rounded-full"></span>
                </h3>
                <ul className="space-y-6 text-gray-300">
                  <li className="flex items-start group transform transition-transform duration-300 hover:translate-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-orange-primary transition-colors duration-300 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a href="mailto:pteintensive@gmail.com" className="text-gray-400 hover:text-orange-primary transition-colors">
                        pteintensive@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start group transform transition-transform duration-300 hover:translate-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-orange-primary transition-colors duration-300 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Zalo</p>
                      <a 
                        href="https://zalo.me" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-orange-primary transition-colors"
                      >
                        PTE Intensive
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start group transform transition-transform duration-300 hover:translate-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-orange-primary transition-colors duration-300 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Địa chỉ</p>
                      <span className="text-gray-400">TP. Hồ Chí Minh, Việt Nam</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-8 text-orange-primary relative inline-block">
                  Truy cập nhanh
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-primary to-orange-bright rounded-full"></span>
                </h3>
                <ul className="space-y-6 text-gray-300">
                  <li className="group transform transition-transform duration-300 hover:translate-x-2">
                    <Link href="/" className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-orange-primary transition-colors duration-300 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <span className="text-white">Trang chủ</span>
                    </Link>
                  </li>
                  <li className="group transform transition-transform duration-300 hover:translate-x-2">
                    <a href="#registration-form" className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-orange-primary transition-colors duration-300 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <span className="text-white">Đăng ký học thử</span>
                    </a>
                  </li>
                  <li className="group transform transition-transform duration-300 hover:translate-x-2">
                    <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-orange-primary transition-colors duration-300 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-white">Liên hệ tư vấn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-primary to-transparent opacity-30"></div>
              <p className="text-gray-500 my-4">&copy; {new Date().getFullYear()} PTE Intensive. All rights reserved.</p>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-primary to-transparent opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
