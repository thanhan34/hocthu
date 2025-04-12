"use client";

import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LimitedTimeOffer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [remainingSlots, setRemainingSlots] = useState(100);

  // Set end date to the end of the current month
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      // End of current month
      const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
      
      const difference = endDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);

  // Simulate decreasing slots (for demo purposes)
  useEffect(() => {
    // Random decrease of slots every 5-10 minutes
    const decreaseSlots = () => {
      setRemainingSlots(prev => {
        const newValue = prev - Math.floor(Math.random() * 2 + 1);
        return newValue > 0 ? newValue : 1; // Ensure at least 1 slot remains
      });
    };
    
    // Initial decrease after 30 seconds (for demo purposes)
    const initialTimer = setTimeout(decreaseSlots, 30000);
    
    // Regular decrease every 5-10 minutes
    const randomInterval = Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60 * 1000;
    const intervalTimer = setInterval(decreaseSlots, randomInterval);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-orange-primary to-orange-bright text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white text-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-orange-light-very transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(252,93,1,0.2)]">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-10 md:mb-0 md:w-1/2 md:pr-8">
                <div className="inline-block px-4 py-1 bg-orange-light-very text-orange-primary rounded-full text-sm font-bold mb-4">
                  Cơ hội giới hạn
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-primary to-orange-bright bg-clip-text text-transparent">Ưu đãi giới hạn thời gian</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Chỉ còn <span className="font-bold text-orange-primary text-2xl">{remainingSlots}</span> suất học thử miễn phí trong tháng này!
                </p>
                <a 
                  href="#registration-form" 
                  className="bg-gradient-to-r from-orange-primary to-orange-bright text-white hover:from-orange-bright hover:to-orange-primary px-8 py-4 rounded-full inline-block font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105 shadow-md"
                >
                  Đăng ký ngay
                </a>
              </div>
              
              <div className="md:w-1/2 md:border-l md:border-dashed md:border-orange-light-very md:pl-8">
                <p className="text-center text-gray-700 mb-4 font-medium text-lg">Thời gian còn lại:</p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center group">
                    <div className="bg-gradient-to-b from-orange-light-very to-white text-orange-primary text-3xl font-bold w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-orange-light-very">
                      {timeLeft.days}
                    </div>
                    <p className="text-gray-600 font-medium mt-2">Ngày</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gradient-to-b from-orange-light-very to-white text-orange-primary text-3xl font-bold w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-orange-light-very">
                      {timeLeft.hours}
                    </div>
                    <p className="text-gray-600 font-medium mt-2">Giờ</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gradient-to-b from-orange-light-very to-white text-orange-primary text-3xl font-bold w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-orange-light-very">
                      {timeLeft.minutes}
                    </div>
                    <p className="text-gray-600 font-medium mt-2">Phút</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="bg-gradient-to-b from-orange-light-very to-white text-orange-primary text-3xl font-bold w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-orange-light-very animate-pulse">
                      {timeLeft.seconds}
                    </div>
                    <p className="text-gray-600 font-medium mt-2">Giây</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOffer;
