import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import Testimonials from './components/Testimonials';
import LimitedTimeOffer from './components/LimitedTimeOffer';
import WhyChooseUs from './components/WhyChooseUs';

export default function Home() {
  return (
    <main>
      <Header />
      
      <Hero />
      
      <LimitedTimeOffer />
      
      <section className="py-28 bg-gray-50 relative" id="registration-form">
        <div className="absolute inset-0 bg-[url('/window.svg')] bg-no-repeat bg-right-top opacity-5"></div>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <span className="inline-block px-6 py-2 bg-orange-light-very text-orange-primary rounded-full text-sm font-bold shadow-md">
                  Đăng ký miễn phí
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Đăng ký học thử miễn phí</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Điền thông tin của bạn vào form dưới đây để đăng ký học thử miễn phí cùng PTE Intensive.
                Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-orange-light-very">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>
      
      <WhyChooseUs />
      
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20 text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <span className="inline-block px-6 py-2 bg-orange-light-very text-orange-primary rounded-full text-sm font-bold shadow-md">
                  Quy trình học tập
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Quy trình học tập tại PTE Intensive</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                Chúng tôi đồng hành cùng bạn trong suốt quá trình học tập
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-primary via-orange-bright to-orange-light transform -translate-x-1/2"></div>
              
              <div className="space-y-16 relative">
                <div className="flex flex-col md:flex-row items-center group">
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-light-very group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-primary transition-colors">Đánh giá trình độ</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Chúng tôi đánh giá trình độ hiện tại của bạn để xây dựng lộ trình học tập phù hợp với khả năng và mục tiêu cá nhân
                      </p>
                    </div>
                  </div>
                  <div className="md:w-16 md:mx-auto relative z-10">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-primary to-orange-bright text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-16 md:text-left"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center group">
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right"></div>
                  <div className="md:w-16 md:mx-auto relative z-10">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-bright to-orange-primary text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-16 md:text-left">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-light-very group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-primary transition-colors">Xây dựng lộ trình</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Dựa trên mục tiêu và trình độ của bạn, chúng tôi xây dựng lộ trình học tập cá nhân hóa với các bài học phù hợp
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center group">
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-light-very group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-primary transition-colors">Học tập và luyện tập</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Bạn sẽ được học tập và luyện tập với các giáo viên giàu kinh nghiệm và tài liệu chất lượng, được cập nhật liên tục
                      </p>
                    </div>
                  </div>
                  <div className="md:w-16 md:mx-auto relative z-10">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-light to-orange-bright text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-16 md:text-left"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center group">
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right"></div>
                  <div className="md:w-16 md:mx-auto relative z-10">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-bright to-orange-primary text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      4
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-16 md:text-left">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-light-very group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-primary transition-colors">Đạt mục tiêu</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Chúng tôi cam kết đồng hành cùng bạn cho đến khi đạt được mục tiêu điểm số mong muốn, không giới hạn thời gian
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-primary to-orange-bright"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/globe.svg')] bg-no-repeat bg-center bg-contain"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-md">Sẵn sàng để bắt đầu?</h2>
            <p className="text-xl md:text-2xl mb-12 text-white opacity-90">
              Đăng ký học thử miễn phí ngay hôm nay và bắt đầu hành trình chinh phục PTE của bạn!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#registration-form" 
                className="bg-white text-orange-primary hover:bg-orange-light-very px-10 py-5 text-lg md:text-xl rounded-full shadow-xl inline-block font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Đăng ký ngay
              </a>
              <a 
                href="https://zalo.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-10 py-5 text-lg md:text-xl rounded-full shadow-xl inline-block font-bold transform transition-all duration-300 hover:scale-105"
              >
                Liên hệ tư vấn
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
