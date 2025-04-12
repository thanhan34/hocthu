'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Client-side only component for floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    // Only run on client-side
    const newParticles = Array.from({ length: 10 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 8 + Math.random() * 10;
      
      return (
        <div 
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float-random"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        ></div>
      );
    });
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles}
    </div>
  );
};

const Hero = () => {
  // Animation states for staggered entrance
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="relative bg-gradient-to-br from-orange-primary via-orange-bright to-[#fd7f33] text-white py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-white to-transparent opacity-10 rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-white to-transparent opacity-10 rounded-full -ml-64 -mb-64"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
      
      {/* Floating particles - client-side only with useEffect */}
      <FloatingParticles />
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className={`lg:w-3/5 text-center lg:text-left mb-16 lg:mb-0 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block bg-white text-orange-primary px-6 py-2 rounded-full text-sm font-bold mb-8 shadow-md">
              Đăng ký ngay - Số lượng có hạn
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight drop-shadow-lg">
              <span className="inline-block transition-all duration-700 delay-100 transform translate-y-0 opacity-100" style={{transitionDelay: '100ms'}}>
                ĐĂNG KÝ HỌC THỬ
              </span> 
              <br />
              <span className="inline-block relative text-white bg-orange-primary bg-opacity-30 px-6 py-2 rounded-lg transition-all duration-700 delay-300 transform translate-y-0 opacity-100" style={{transitionDelay: '300ms'}}>
                <span className="relative z-10">PTE MIỄN PHÍ</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-primary to-orange-bright opacity-30 rounded-lg"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-white transition-all duration-700 delay-500 transform translate-y-0 opacity-100" style={{transitionDelay: '500ms'}}>
              Tư vấn lộ trình cá nhân hóa – Trải nghiệm lớp học thật – Học là đậu!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 transition-all duration-700 delay-700 transform translate-y-0 opacity-100" style={{transitionDelay: '700ms'}}>
              <a 
                href="#registration-form" 
                className="group relative bg-white text-orange-primary hover:bg-orange-light-very px-10 py-5 text-lg md:text-xl rounded-full shadow-xl inline-block font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Đăng ký ngay</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-orange-light-very to-white opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
              </a>
              
              <a 
                href="https://zalo.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-transparent border-2 border-white hover:bg-white/10 px-10 py-5 text-lg md:text-xl rounded-full shadow-xl inline-block font-bold transform transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Liên hệ Zalo</span>
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
              </a>
            </div>
          </div>
          
          <div className={`lg:w-2/5 relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '300ms'}}>
            <div className="relative w-full h-[400px] lg:h-[550px]">
              {/* Card decorative elements */}
              <div className="absolute inset-0 bg-white bg-opacity-10 rounded-3xl transform rotate-6 shadow-xl"></div>
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-3xl transform -rotate-3 shadow-xl"></div>
              
              {/* Main card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-white/90 rounded-3xl shadow-2xl overflow-hidden">
                {/* Card background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-light-very/50 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-orange-light-very to-transparent rounded-full -mr-32 -mb-32 opacity-50"></div>
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-light-very to-transparent rounded-full -ml-32 -mt-32 opacity-50"></div>
                </div>
                
                {/* Card content */}
                <div className="relative h-full w-full flex items-center justify-center p-8">
                  <div className="text-center">
                    {/* Logo with glow effect */}
                    <div className="w-36 h-36 mx-auto mb-8 relative">
                      <div className="absolute inset-0 bg-orange-light-very rounded-full blur-xl opacity-50"></div>
                      <div className="relative">
                        <Image 
                          src="/orange-logo.png" 
                          alt="PTE Intensive Logo" 
                          width={144} 
                          height={144}
                          className="object-contain drop-shadow-lg"
                          priority
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-orange-primary text-3xl font-bold mb-6 drop-shadow-sm">PTE Intensive</h3>
                    <p className="text-gray-700 text-lg mb-8">Đồng hành cùng bạn trên hành trình chinh phục PTE</p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-light-very text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Học là đậu</span>
                        </div>
                      </div>
                      <div className="bg-orange-light-medium text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span>Cam kết đầu ra</span>
                        </div>
                      </div>
                      <div className="bg-orange-light-very text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>Giáo trình chuyên biệt</span>
                        </div>
                      </div>
                      <div className="bg-orange-light text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>Giáo viên kinh nghiệm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 text-white fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
