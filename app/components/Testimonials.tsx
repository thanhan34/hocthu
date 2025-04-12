import React from 'react';

interface TestimonialProps {
  quote: string;
  name: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, index }) => {
  // Alternate between different styles based on index
  const isOrange = index % 3 === 0;
  const isLight = index % 3 === 1;
  // Third style (neutral) is used when neither isOrange nor isLight is true
  
  return (
    <div className={`group relative ${index % 3 === 0 ? 'mt-0' : index % 3 === 1 ? 'mt-8 md:mt-12' : 'mt-4 md:mt-6'}`}>
      <div className={`absolute inset-0.5 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${
        isOrange ? 'bg-gradient-to-r from-orange-primary to-orange-bright' : 
        isLight ? 'bg-gradient-to-r from-orange-light to-orange-light-medium' : 
        'bg-gradient-to-r from-gray-400 to-gray-600'
      }`}></div>
      
      <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 relative z-10 group-hover:-translate-y-2 transform transition-transform duration-300 h-full flex flex-col justify-between">
        <div>
          <div className="mb-6 relative">
            <svg className={`w-12 h-12 opacity-20 absolute -top-2 -left-2 ${
              isOrange ? 'text-orange-primary' : 
              isLight ? 'text-orange-light' : 
              'text-gray-500'
            }`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-700 text-lg italic relative z-10 pl-6">{quote}</p>
          </div>
        </div>
        
        <div className="flex items-center mt-6 pt-4 border-t border-dashed border-gray-200">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
            isOrange ? 'bg-gradient-to-r from-orange-primary to-orange-bright' : 
            isLight ? 'bg-gradient-to-r from-orange-light to-orange-light-medium' : 
            'bg-gradient-to-r from-gray-500 to-gray-700'
          }`}>
            {name.charAt(0)}
          </div>
          <div className="ml-4">
            <p className={`font-bold text-lg ${
              isOrange ? 'text-orange-primary' : 
              isLight ? 'text-orange-light' : 
              'text-gray-700'
            } group-hover:translate-x-1 transition-transform duration-300`}>
              {name}
            </p>
            <p className="text-gray-500 text-sm">Học viên</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Nhờ học thử mà mình biết được trình độ hiện tại & được định hướng rất rõ ràng",
      name: "Hồng Nhung"
    },
    {
      quote: "Buổi học thử giúp mình hiểu rõ cấu trúc bài thi PTE và biết được những điểm yếu cần cải thiện",
      name: "Minh Tuấn"
    },
    {
      quote: "Giáo viên rất tận tâm, phân tích chi tiết những lỗi sai và đưa ra lộ trình học tập phù hợp",
      name: "Thanh Hà"
    },
    {
      quote: "Mình đã thử nhiều trung tâm nhưng chỉ ở đây mình mới thấy được phương pháp học hiệu quả nhất",
      name: "Quang Huy"
    },
    {
      quote: "Buổi học thử đã cho mình cái nhìn tổng quan về kỳ thi PTE và cách tiếp cận hiệu quả",
      name: "Thu Trang"
    },
    {
      quote: "Giáo viên phân tích rất kỹ điểm mạnh, điểm yếu và đưa ra lộ trình học tập cụ thể",
      name: "Đức Anh"
    },
    {
      quote: "Mình rất hài lòng với buổi học thử, được giải đáp mọi thắc mắc về kỳ thi PTE",
      name: "Phương Linh"
    },
    {
      quote: "Sau buổi học thử, mình đã có động lực và phương hướng rõ ràng để chuẩn bị cho kỳ thi",
      name: "Hoàng Nam"
    },
    {
      quote: "Giáo viên rất nhiệt tình và chuyên nghiệp, giúp mình hiểu rõ những kỹ năng cần thiết",
      name: "Mai Anh"
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/file.svg')] bg-no-repeat bg-right-top opacity-5"></div>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="inline-block px-6 py-2 bg-orange-light-very text-orange-primary rounded-full text-sm font-bold shadow-md">
                Phản hồi từ học viên
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Học viên nói gì về buổi học thử?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
              Hàng trăm học viên đã trải nghiệm buổi học thử và nhận được lộ trình học tập phù hợp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                quote={testimonial.quote} 
                name={testimonial.name}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
