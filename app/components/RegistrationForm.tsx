'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addRegistration } from '../firebase/firestore';
import { sendNotificationEmail } from '../utils/emailService';
import { getUtmParams } from '../utils/urlParams';
import { registrationSchema, RegistrationFormData } from '../utils/validationSchema';

const RegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      hoTen: '',
      soDienThoai: '',
      soDienThoaiZalo: '',
      email: '',
      mucDich: '',
      mucTieuDiem: '',
      thoiGianCan: '',
      thanhPho: '',
      gioiTinh: '',
      namSinh: '',
      nguon: '',
      ghiChu: '',
      utmSource: '',
      utmCampaign: '',
    },
  });

  // Watch phone number to auto-fill Zalo number
  const phoneNumber = watch('soDienThoai');
  const zaloNumber = watch('soDienThoaiZalo');

  // Auto-fill Zalo number when phone number changes and Zalo is empty
  useEffect(() => {
    if (phoneNumber && !zaloNumber) {
      setValue('soDienThoaiZalo', phoneNumber);
    }
  }, [phoneNumber, zaloNumber, setValue]);

  // Get UTM parameters from URL
  useEffect(() => {
    const { utmSource, utmCampaign } = getUtmParams();
    setValue('utmSource', utmSource);
    setValue('utmCampaign', utmCampaign);
  }, [setValue]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    // Determine which fields to validate based on current step
    if (formStep === 1) {
      fieldsToValidate = ['hoTen', 'soDienThoai', 'soDienThoaiZalo', 'email'];
    } else if (formStep === 2) {
      fieldsToValidate = ['mucDich', 'mucTieuDiem', 'thoiGianCan', 'thanhPho'];
    }
    
    // Validate the fields for the current step
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setFormStep(formStep + 1);
      // Scroll to top of form
      const formElement = document.getElementById('registration-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
    // Scroll to top of form
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    try {
      // Add registration to Firestore
      const registrationData = await addRegistration(data);
      console.log('Registration added to Firestore:', registrationData);
      
      try {
        // Send notification email
        await sendNotificationEmail({
          hoTen: data.hoTen,
          soDienThoai: data.soDienThoai,
          mucDich: data.mucDich,
          thoiGianCan: data.thoiGianCan,
          thanhPho: data.thanhPho,
          email: data.email,
        });
        console.log('Notification email sent successfully');
      } catch (emailError) {
        // Log email error but continue with form submission
        console.error('Error sending email notification:', emailError);
        // We don't throw here to allow the registration to complete even if email fails
      }
      
      // Redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau.');
      setIsSubmitting(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ message }: { message: string | undefined }) => {
    if (!message) return null;
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <div className="mb-6">
              <label htmlFor="hoTen" className="block text-[#374151] font-[500] mb-2">Họ tên</label>
              <input
                id="hoTen"
                {...register('hoTen')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.hoTen ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập họ tên của bạn"
              />
              <ErrorMessage message={errors.hoTen?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="soDienThoai" className="block text-[#374151] font-[500] mb-2">Số điện thoại</label>
              <input
                id="soDienThoai"
                {...register('soDienThoai')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.soDienThoai ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập số điện thoại của bạn"
              />
              <ErrorMessage message={errors.soDienThoai?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="soDienThoaiZalo" className="form-label">Số điện thoại dùng Zalo (nếu không có, nhập lại số trên)</label>
              <input
                id="soDienThoaiZalo"
                {...register('soDienThoaiZalo')}
                className={`form-input ${errors.soDienThoaiZalo ? 'border-red-500' : ''}`}
                placeholder="Nhập số Zalo của bạn"
              />
              <ErrorMessage message={errors.soDienThoaiZalo?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Nhập email của bạn"
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-orange-primary hover:bg-orange-bright text-white px-8 py-3 text-lg rounded-full transition-colors"
              >
                Tiếp tục <span className="ml-2">→</span>
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-6">
              <label htmlFor="mucDich" className="form-label">Bạn cần PTE để làm gì?</label>
              <select
                id="mucDich"
                {...register('mucDich')}
                className={`form-select ${errors.mucDich ? 'border-red-500' : ''}`}
              >
                <option value="">-- Chọn mục đích --</option>
                <option value="Visa 485">Visa 485</option>
                <option value="Visa 189">Visa 189</option>
                <option value="Visa 190">Visa 190</option>
                <option value="Du học">Du học</option>
                <option value="Công việc">Công việc</option>
                <option value="Khác">Khác</option>
              </select>
              <ErrorMessage message={errors.mucDich?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="mucTieuDiem" className="form-label">Bạn cần điểm PTE bao nhiêu?</label>
              <select
                id="mucTieuDiem"
                {...register('mucTieuDiem')}
                className={`form-select ${errors.mucTieuDiem ? 'border-red-500' : ''}`}
              >
                <option value="">-- Chọn mục tiêu điểm --</option>
                <option value="30">30</option>
                <option value="36">36</option>
                <option value="42">42</option>
                <option value="50">50</option>
                <option value="58">58</option>
                <option value="65">65</option>
                <option value="79">79</option>
              </select>
              <ErrorMessage message={errors.mucTieuDiem?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="thoiGianCan" className="form-label">Khi nào bạn cần có điểm?</label>
              <select
                id="thoiGianCan"
                {...register('thoiGianCan')}
                className={`form-select ${errors.thoiGianCan ? 'border-red-500' : ''}`}
              >
                <option value="">-- Chọn thời gian --</option>
                <option value="Gấp trong 1 tháng">Gấp trong 1 tháng</option>
                <option value="1-2 tháng">1-2 tháng</option>
                <option value="Không gấp">Không gấp</option>
              </select>
              <ErrorMessage message={errors.thoiGianCan?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="thanhPho" className="form-label">Thành phố bạn đang ở</label>
              <select
                id="thanhPho"
                {...register('thanhPho')}
                className={`form-select ${errors.thanhPho ? 'border-red-500' : ''}`}
              >
                <option value="">-- Chọn thành phố --</option>
                <option value="HCM">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Khác">Khác</option>
              </select>
              <ErrorMessage message={errors.thanhPho?.message} />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 text-lg border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="mr-2">←</span> Quay lại
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-orange-primary hover:bg-orange-bright text-white px-8 py-3 text-lg rounded-full transition-colors"
              >
                Tiếp tục <span className="ml-2">→</span>
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-6">
              <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
              <select
                id="gioiTinh"
                {...register('gioiTinh')}
                className={`form-select ${errors.gioiTinh ? 'border-red-500' : ''}`}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
              <ErrorMessage message={errors.gioiTinh?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="namSinh" className="form-label">Năm sinh</label>
              <input
                type="number"
                id="namSinh"
                {...register('namSinh')}
                className={`form-input ${errors.namSinh ? 'border-red-500' : ''}`}
                min="1950"
                max="2010"
                placeholder="Nhập năm sinh của bạn"
              />
              <ErrorMessage message={errors.namSinh?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="nguon" className="form-label">Nguồn bạn biết đến chúng tôi</label>
              <select
                id="nguon"
                {...register('nguon')}
                className={`form-select ${errors.nguon ? 'border-red-500' : ''}`}
              >
                <option value="">-- Chọn nguồn --</option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
                <option value="Zalo">Zalo</option>
                <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                <option value="Khác">Khác</option>
              </select>
              <ErrorMessage message={errors.nguon?.message} />
            </div>
            
            <div className="mb-8">
              <label htmlFor="ghiChu" className="form-label">Ghi chú / lời nhắn</label>
              <textarea
                id="ghiChu"
                {...register('ghiChu')}
                className="form-textarea"
                rows={4}
                placeholder="Nhập ghi chú hoặc lời nhắn của bạn (nếu có)"
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 text-lg border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="mr-2">←</span> Quay lại
              </button>
              <button
                type="submit"
                className="bg-orange-primary hover:bg-orange-bright text-white px-8 py-3 text-lg rounded-full transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang gửi...
                  </span>
                ) : (
                  'Đăng ký ngay'
                )}
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div id="registration-form" className="card max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden">
      <div className="gradient-orange py-6 px-8">
        <h2 className="text-2xl font-bold text-white text-center">Đăng ký học thử miễn phí</h2>
      </div>
      
      {/* Progress bar */}
      <div className="px-8 pt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-orange-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(formStep / 3) * 100}%` }}
          ></div>
        </div>
            <div className="flex justify-between text-sm mb-6">
              <div className={`${formStep >= 1 ? 'text-[#fc5d01] font-medium' : 'text-gray-500'}`}>Thông tin cá nhân</div>
              <div className={`${formStep >= 2 ? 'text-[#fc5d01] font-medium' : 'text-gray-500'}`}>Mục tiêu học tập</div>
              <div className={`${formStep >= 3 ? 'text-[#fc5d01] font-medium' : 'text-gray-500'}`}>Thông tin bổ sung</div>
            </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-4">
        {renderFormStep()}
      </form>
    </div>
  );
};

export default RegistrationForm;
