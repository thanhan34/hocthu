'use client';

import React from 'react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cam kết đầu ra",
      description: "Chúng tôi cam kết đồng hành cùng bạn cho đến khi đạt được mục tiêu điểm số mong muốn."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Giáo trình chuyên biệt",
      description: "Giáo trình được thiết kế riêng cho từng học viên, tập trung vào điểm yếu và phát huy điểm mạnh."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Giáo viên kinh nghiệm",
      description: "Đội ngũ giáo viên giàu kinh nghiệm, đã giúp hàng nghìn học viên đạt điểm cao trong kỳ thi PTE."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Phương pháp hiệu quả",
      description: "Phương pháp học tập hiệu quả, giúp học viên tiến bộ nhanh chóng và đạt kết quả cao trong thời gian ngắn."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Lộ trình cá nhân hóa",
      description: "Lộ trình học tập được cá nhân hóa cho từng học viên, giúp tối ưu thời gian và hiệu quả học tập."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của học viên 24/7, giúp học viên học tập hiệu quả."
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-light-very opacity-20 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-light-very opacity-20 rounded-full -ml-32 -mb-32"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="inline-block px-6 py-2 bg-orange-light-very text-orange-primary rounded-full text-sm font-bold shadow-md">
                Lựa chọn hàng đầu
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">
              Tại sao chọn PTE Intensive?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
              Chúng tôi tự hào mang đến cho bạn trải nghiệm học tập tốt nhất với những lý do sau
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-orange-light-very group hover:-translate-y-2 transform transition-transform duration-300"
              >
                <div className="mb-6 text-orange-primary group-hover:scale-110 transform transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="#registration-form" 
              className="bg-gradient-to-r from-orange-primary to-orange-bright hover:from-orange-bright hover:to-orange-primary text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Đăng ký học thử miễn phí
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
