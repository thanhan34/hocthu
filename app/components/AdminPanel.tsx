'use client';

import React, { useState, useEffect } from 'react';
import { getRegistrations, updateRegistration, deleteRegistration, StoredRegistration, FirebaseTimestamp } from '../firebase/firestore';

type Registration = StoredRegistration;

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  // Stats for dashboard metrics (used in parent component via DOM)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    fetchRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Type guard for FirebaseTimestamp
  const isFirebaseTimestamp = (value: unknown): value is FirebaseTimestamp => {
    return value !== null && 
           typeof value === 'object' && 
           'toDate' in value && 
           typeof (value as FirebaseTimestamp).toDate === 'function';
  };

  // Helper function to safely get timestamp in milliseconds
  const getTimestampMs = (timestamp: FirebaseTimestamp | string | number | Date | undefined): number => {
    if (!timestamp) return 0;
    
    if (isFirebaseTimestamp(timestamp)) {
      // It's a Firebase Timestamp
      return timestamp.toDate().getTime();
    } else if (timestamp instanceof Date) {
      // It's a Date object
      return timestamp.getTime();
    } else if (typeof timestamp === 'number') {
      // It's already a number (milliseconds)
      return timestamp;
    } else {
      // It's a string or something else, try to parse it
      try {
        return new Date(timestamp).getTime();
      } catch (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _
      ) {
        return 0;
      }
    }
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getRegistrations();
      const registrationsData = data as Registration[];
      setRegistrations(registrationsData);
      
      // Update stats
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const oneWeekAgo = today - 7 * 24 * 60 * 60 * 1000;
      
      const todayCount = registrationsData.filter(reg => {
        const submitTime = getTimestampMs(reg.submitTime);
        return submitTime >= today;
      }).length;
      
      const weekCount = registrationsData.filter(reg => {
        const submitTime = getTimestampMs(reg.submitTime);
        return submitTime >= oneWeekAgo;
      }).length;
      
      setStats({
        total: registrationsData.length,
        today: todayCount,
        thisWeek: weekCount,
      });
      
      // Update the loading elements in the parent component
      const loadingElements = document.querySelectorAll('.loading-data');
      if (loadingElements.length >= 3) {
        loadingElements[0].textContent = registrationsData.length.toString();
        loadingElements[1].textContent = todayCount.toString();
        loadingElements[2].textContent = weekCount.toString();
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (registration: Registration) => {
    setEditingRegistration({ ...registration });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRegistration) {
      setEditingRegistration({
        ...editingRegistration,
        [name]: value,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingRegistration) return;
    
    try {
      await updateRegistration(editingRegistration.id, editingRegistration);
      setRegistrations(prev => 
        prev.map(reg => reg.id === editingRegistration.id ? editingRegistration : reg)
      );
      setEditingRegistration(null);
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingRegistration(null);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    
    try {
      await deleteRegistration(deletingId);
      setRegistrations(prev => prev.filter(reg => reg.id !== deletingId));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        total: prev.total - 1,
      }));
      
      setDeletingId(null);
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const filteredRegistrations = registrations.filter(reg => {
    // Search filter
    const searchMatch = 
      reg.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.soDienThoai.includes(searchTerm) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    if (filterBy === 'all') return searchMatch;
    if (filterBy === 'today') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const submitTime = getTimestampMs(reg.submitTime);
      return searchMatch && submitTime >= today;
    }
    if (filterBy === 'thisWeek') {
      const now = new Date();
      const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
      const submitTime = getTimestampMs(reg.submitTime);
      return searchMatch && submitTime >= oneWeekAgo;
    }
    if (filterBy === 'mucDich') {
      return searchMatch && reg.mucDich === 'Visa 485';
    }
    if (filterBy === 'thanhPho') {
      return searchMatch && reg.thanhPho === 'HCM';
    }
    
    return searchMatch;
  }).sort((a, b) => {
    const timeA = getTimestampMs(a.submitTime);
    const timeB = getTimestampMs(b.submitTime);
    
    if (sortBy === 'newest') {
      return timeB - timeA;
    } else {
      return timeA - timeB;
    }
  });

  const formatDate = (timestamp: FirebaseTimestamp | string | number | Date | undefined) => {
    if (!timestamp) return 'N/A';
    
    try {
      if (isFirebaseTimestamp(timestamp)) {
        return timestamp.toDate().toLocaleString('vi-VN');
      } else if (timestamp instanceof Date) {
        return timestamp.toLocaleString('vi-VN');
      } else if (typeof timestamp === 'number' || typeof timestamp === 'string') {
        return new Date(timestamp).toLocaleString('vi-VN');
      }
      return 'Invalid date format';
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _
    ) {
      // Ignore the error and return a fallback string
      return 'Invalid date';
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#006d39] mb-4 md:mb-0">Danh sách đăng ký học thử</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-input pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex gap-2">
              <select
                className="form-select"
                value={filterBy}
                onChange={handleFilterChange}
              >
                <option value="all">Tất cả</option>
                <option value="today">Hôm nay</option>
                <option value="thisWeek">Tuần này</option>
                <option value="mucDich">Visa 485</option>
                <option value="thanhPho">TP. HCM</option>
              </select>
              
              <select
                className="form-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-primary"></div>
            <p className="mt-4 text-lg">Đang tải dữ liệu...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg text-gray-600">Không có dữ liệu đăng ký nào.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Họ tên</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">SĐT</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Mục đích</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Mục tiêu</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Thời gian</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Thành phố</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Ngày đăng ký</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{registration.hoTen}</td>
                    <td className="py-3 px-4">{registration.soDienThoai}</td>
                    <td className="py-3 px-4">{registration.email}</td>
                    <td className="py-3 px-4">{registration.mucDich}</td>
                    <td className="py-3 px-4">{registration.mucTieuDiem}</td>
                    <td className="py-3 px-4">{registration.thoiGianCan}</td>
                    <td className="py-3 px-4">{registration.thanhPho}</td>
                    <td className="py-3 px-4 text-gray-500">{formatDate(registration.submitTime)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(registration)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="Sửa"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(registration.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Xóa"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      {editingRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#006d39]">Chỉnh sửa thông tin</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-[#374151]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  name="hoTen"
                  value={editingRegistration.hoTen}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  name="soDienThoai"
                  value={editingRegistration.soDienThoai}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Số Zalo</label>
                <input
                  type="text"
                  name="soDienThoaiZalo"
                  value={editingRegistration.soDienThoaiZalo}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingRegistration.email}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Mục đích</label>
                <select
                  name="mucDich"
                  value={editingRegistration.mucDich}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="Visa 485">Visa 485</option>
                  <option value="Visa 189">Visa 189</option>
                  <option value="Visa 190">Visa 190</option>
                  <option value="Du học">Du học</option>
                  <option value="Công việc">Công việc</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Mục tiêu điểm</label>
                <select
                  name="mucTieuDiem"
                  value={editingRegistration.mucTieuDiem}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="30">30</option>
                  <option value="36">36</option>
                  <option value="42">42</option>
                  <option value="50">50</option>
                  <option value="58">58</option>
                  <option value="65">65</option>
                  <option value="79">79</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Thời gian cần</label>
                <select
                  name="thoiGianCan"
                  value={editingRegistration.thoiGianCan}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="Gấp trong 1 tháng">Gấp trong 1 tháng</option>
                  <option value="1-2 tháng">1-2 tháng</option>
                  <option value="Không gấp">Không gấp</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Thành phố</label>
                <select
                  name="thanhPho"
                  value={editingRegistration.thanhPho}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="HCM">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Giới tính</label>
                <select
                  name="gioiTinh"
                  value={editingRegistration.gioiTinh}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Năm sinh</label>
                <input
                  type="number"
                  name="namSinh"
                  value={editingRegistration.namSinh}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Nguồn</label>
                <select
                  name="nguon"
                  value={editingRegistration.nguon}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                  <option value="Zalo">Zalo</option>
                  <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label">Ghi chú</label>
              <textarea
                name="ghiChu"
                value={editingRegistration.ghiChu || ''}
                onChange={handleEditChange}
                className="form-textarea"
                rows={3}
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#006d39] text-white hover:bg-opacity-90 rounded"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Xác nhận xóa</h2>
              <p className="text-gray-600">
                Bạn có chắc chắn muốn xóa đăng ký này không? Hành động này không thể hoàn tác.
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
