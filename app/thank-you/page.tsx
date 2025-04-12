import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ThankYou() {
  return (
    <main>
      <Header />
      
      <section className="relative py-24 gradient-orange text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white text-orange-primary w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Cảm ơn bạn đã đăng ký!
            </h1>
            
            <p className="text-xl mb-10 leading-relaxed">
              Cảm ơn bạn đã đăng ký học thử cùng PTE Intensive! Chúng tôi sẽ sớm liên hệ với bạn.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link 
                href="/"
                className="bg-white text-orange-primary hover:bg-orange-light px-8 py-4 text-lg rounded-full shadow-lg transform transition-transform hover:scale-105"
              >
                Về trang chủ
              </Link>
              
              <a 
                href="https://zalo.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-primary px-8 py-4 text-lg rounded-full shadow-lg transform transition-transform hover:scale-105"
              >
                Liên hệ Zalo
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white fill-current">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Các bước tiếp theo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center relative border border-gray-100 hover:border-orange-primary transition-colors duration-300 hover:shadow-xl">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#006d39] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold mb-4">Nhận cuộc gọi</h3>
                  <div className="w-16 h-1 bg-orange-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">
                    Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận thông tin
                  </p>
                </div>
              </div>
              
              <div className="card text-center relative border border-gray-100 hover:border-orange-primary transition-colors duration-300 hover:shadow-xl">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#006d39] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold mb-4">Tư vấn lộ trình</h3>
                  <div className="w-16 h-1 bg-orange-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">
                    Chuyên gia sẽ tư vấn lộ trình học tập phù hợp với mục tiêu của bạn
                  </p>
                </div>
              </div>
              
              <div className="card text-center relative border border-gray-100 hover:border-orange-primary transition-colors duration-300 hover:shadow-xl">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#006d39] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold mb-4">Tham gia lớp học thử</h3>
                  <div className="w-16 h-1 bg-orange-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">
                    Trải nghiệm lớp học thật để cảm nhận phương pháp giảng dạy của chúng tôi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Bạn có câu hỏi?</h2>
            <p className="text-gray-600 mb-8">
              Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua Zalo hoặc email.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a 
                href="https://zalo.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#006d39] hover:bg-opacity-90 text-white px-8 py-4 rounded-lg shadow-md"
              >
                <span className="font-bold">Zalo</span>
                <span>Liên hệ ngay</span>
              </a>
              
              <a 
                href="mailto:pteintensive@gmail.com"
                className="flex items-center justify-center gap-2 bg-orange-primary hover:bg-orange-bright text-white px-8 py-4 rounded-lg shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Gửi email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
