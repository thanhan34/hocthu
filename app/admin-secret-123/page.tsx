import React from 'react';
import Link from 'next/link';
import AdminPanel from '../components/AdminPanel';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="gradient-orange text-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="text-orange-primary font-bold text-lg">P</span>
              </div>
              <h1 className="text-2xl font-bold">PTE Intensive - Admin Panel</h1>
            </div>
            
            <Link 
              href="/"
              className="bg-white text-orange-primary hover:bg-orange-light px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#006d39]">Tổng quan</h2>
          <p className="text-gray-600 mb-4">
            Chào mừng đến với trang quản trị của PTE Intensive. Tại đây, bạn có thể xem và quản lý tất cả các đăng ký học thử.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-orange-light-very rounded-lg p-4 flex-1 min-w-[200px]">
              <h3 className="text-orange-primary font-bold mb-1">Đăng ký học thử</h3>
              <p className="text-3xl font-bold text-gray-800">
                <span className="loading-data">...</span>
              </p>
            </div>
            <div className="bg-[#e6f7ef] rounded-lg p-4 flex-1 min-w-[200px]">
              <h3 className="text-[#006d39] font-bold mb-1">Đăng ký hôm nay</h3>
              <p className="text-3xl font-bold text-gray-800">
                <span className="loading-data">...</span>
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex-1 min-w-[200px]">
              <h3 className="text-gray-600 font-bold mb-1">Đăng ký tuần này</h3>
              <p className="text-3xl font-bold text-gray-800">
                <span className="loading-data">...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AdminPanel />
      
      <div className="bg-gray-800 text-white py-4 mt-12">
        <div className="container-custom text-center text-sm">
          <p>© {new Date().getFullYear()} PTE Intensive. Trang quản trị nội bộ.</p>
        </div>
      </div>
      
      {/* Client-side script to update the loading data */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // This will be replaced with actual data from Firestore in the AdminPanel component
            setTimeout(() => {
              const loadingElements = document.querySelectorAll('.loading-data');
              loadingElements[0].textContent = '0';
              loadingElements[1].textContent = '0';
              loadingElements[2].textContent = '0';
            }, 2000);
          });
        `
      }} />
    </main>
  );
}
