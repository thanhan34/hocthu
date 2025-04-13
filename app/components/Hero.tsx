'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// Enhanced floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    // Increased number of particles for more visual interest
    const newParticles = Array.from({ length: 20 }).map((_, i) => {
      const size = 1 + Math.random() * 2.5; // Varied sizes
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 8 + Math.random() * 12;
      const opacity = 0.2 + Math.random() * 0.3; // Varied opacity
      
      return (
        <div 
          key={i}
          className="absolute rounded-full animate-float-random"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: i % 5 === 0 ? '#fedac2' : '#ffffff', // Mix of white and light orange particles
            top: `${top}%`,
            left: `${left}%`,
            opacity: opacity,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        ></div>
      );
    });
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
};

// New animated number counter component
const AnimatedCounter = ({ value, label, delay }: { value: string, label: string, delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
};

// Animated badge component
const AnimatedBadge = ({ text, delay }: { text: string, delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-500 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ 
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(4px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {text}
    </div>
  );
};

const Hero = () => {
  // Animation states for staggered entrance
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        setScrolled(scrollPosition > 50);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative bg-gradient-to-br from-orange-primary via-orange-bright to-[#fd7f33] text-white py-24 md:py-32 lg:py-36 overflow-hidden"
    >
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/an doan 1.jpg" 
            alt="PTE Learning Environment" 
            fill
            sizes="100vw"
            className="object-cover object-center opacity-15 scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-primary via-orange-bright to-[#fd7f33] opacity-85"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-orange-primary/30 opacity-70"></div>
        </div>
        {/* Dot pattern with animation */}
        <div 
          className="absolute top-0 left-0 w-full h-full transform transition-transform duration-10000 ease-in-out"
          style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1.2px, transparent 1.2px)', 
            backgroundSize: '30px 30px',
            transform: scrolled ? 'translateY(-20px)' : 'translateY(0)'
          }}
        ></div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-white to-transparent opacity-10 rounded-full -mr-64 -mt-64 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-white to-transparent opacity-10 rounded-full -ml-64 -mb-64 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional light orbs */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-orange-light-very opacity-20 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-orange-light-very opacity-20 rounded-full blur-xl"></div>
      </div>
      
      {/* Enhanced floating particles */}
      <FloatingParticles />
      
      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Badges row - enhanced with better spacing and responsive design */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <AnimatedBadge text="Học là đậu" delay={100} />
            <AnimatedBadge text="Cam kết đầu ra" delay={300} />
            <AnimatedBadge text="Giáo trình chuyên biệt" delay={500} />
            <AnimatedBadge text="Giáo viên kinh nghiệm" delay={700} />
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left content */}
            <div className={`lg:w-3/5 text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block bg-white text-orange-primary px-6 py-2 rounded-full text-sm font-bold mb-6 md:mb-8 shadow-lg transform hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-orange-light-very">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-orange-primary rounded-full mr-2 animate-pulse"></span>
                  Đăng ký ngay - Số lượng có hạn
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight drop-shadow-lg">
                <span className="inline-block transition-all duration-700 delay-100 transform translate-y-0 opacity-100" style={{transitionDelay: '100ms'}}>
                  ĐĂNG KÝ HỌC THỬ
                </span> 
                <br />
                <span className="inline-block relative text-white mt-3 px-6 py-3 rounded-lg transition-all duration-700 delay-300 transform translate-y-0 opacity-100" style={{
                  background: 'rgba(252, 93, 1, 0.3)',
                  backdropFilter: 'blur(4px)',
                  transitionDelay: '300ms'
                }}>
                  <span className="relative z-10">PTE MIỄN PHÍ</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-primary to-orange-bright opacity-30 rounded-lg"></span>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-white transition-all duration-700 delay-500 transform translate-y-0 opacity-100" style={{transitionDelay: '500ms'}}>
                Tư vấn lộ trình cá nhân hóa – Trải nghiệm lớp học thật – Học là đậu!
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12 max-w-lg mx-auto lg:mx-0">
                <AnimatedCounter value="500+" label="Học viên" delay={800} />
                <AnimatedCounter value="95%" label="Tỷ lệ đậu" delay={1000} />
                <AnimatedCounter value="10+" label="Năm kinh nghiệm" delay={1200} />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6 transition-all duration-700 delay-700 transform translate-y-0 opacity-100" style={{transitionDelay: '700ms'}}>
                <a 
                  href="#registration-form" 
                  className="group relative bg-white text-orange-primary hover:bg-orange-light-very px-8 sm:px-10 py-4 sm:py-5 text-base md:text-lg lg:text-xl rounded-full shadow-xl inline-block font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Đăng ký ngay
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-orange-light-very to-white opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
                </a>
                
                <a 
                  href="https://zalo.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-transparent border-2 border-white hover:bg-white/10 px-8 sm:px-10 py-4 sm:py-5 text-base md:text-lg lg:text-xl rounded-full shadow-xl inline-block font-bold transform transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Liên hệ Zalo
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
                </a>
              </div>
            </div>
            
            {/* Right content - Enhanced card */}
            <div className={`lg:w-2/5 relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '300ms'}}>
              <div className="relative w-full h-[350px] md:h-[400px] lg:h-[550px]">
                {/* Card decorative elements with animation */}
                <div className="absolute inset-0 bg-white bg-opacity-10 rounded-3xl transform rotate-6 shadow-xl hover:rotate-8 transition-transform duration-700 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-3xl transform -rotate-3 shadow-xl hover:-rotate-5 transition-transform duration-700 backdrop-blur-sm"></div>
                
                {/* Main card with enhanced design and featured image */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-white/90 rounded-3xl shadow-2xl overflow-hidden group hover:shadow-[0_20px_50px_rgba(252,93,1,0.2)] transition-all duration-500">
                  {/* Featured image with overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image 
                      src="/an doan 1.jpg" 
                      alt="PTE Intensive Learning Environment" 
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center opacity-20 group-hover:opacity-25 transition-opacity duration-500 scale-105 group-hover:scale-110 transition-transform duration-1000"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-light-very/30 to-transparent mix-blend-overlay"></div>
                  </div>
                  
                  {/* Card background with enhanced gradients */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-light-very/50 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-orange-light-very to-transparent rounded-full -mr-32 -mb-32 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-light-very to-transparent rounded-full -ml-32 -mt-32 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    
                    {/* Additional decorative elements */}
                    <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-orange-light-medium rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-orange-light-medium rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Card content with enhanced animations */}
                  <div className="relative h-full w-full flex items-center justify-center p-8">
                    <div className="text-center">
                      {/* Logo with enhanced glow effect */}
                      <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-6 md:mb-8 relative group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-orange-light-very rounded-full blur-xl opacity-50 group-hover:opacity-70 group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative animate-pulse-slow">
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
                      
                      <h3 className="text-orange-primary text-2xl md:text-3xl font-bold mb-4 md:mb-6 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">PTE Intensive</h3>
                      <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 group-hover:text-gray-800 transition-colors duration-500">Đồng hành cùng bạn trên hành trình chinh phục PTE</p>
                      
                      {/* Enhanced features grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-orange-light-very text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-light-very/90">
                          <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Học là đậu</span>
                          </div>
                        </div>
                        <div className="bg-orange-light-medium text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-light-medium/90">
                          <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>Cam kết đầu ra</span>
                          </div>
                        </div>
                        <div className="bg-orange-light-very text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-light-very/90">
                          <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>Giáo trình chuyên biệt</span>
                          </div>
                        </div>
                        <div className="bg-orange-light text-orange-primary px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-light/90">
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
      </div>
      
      {/* Enhanced wave shape divider with animation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-white fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20">
        <span className="text-white text-xs mb-2 font-medium">Khám phá thêm</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
