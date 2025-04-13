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
      const formElement = document.getElementById('registration-form-element');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
    // Scroll to top of form
    const formElement = document.getElementById('registration-form-element');
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
              <label htmlFor="soDienThoaiZalo" className="block text-[#374151] font-[500] mb-2">Số điện thoại dùng Zalo (nếu không có, nhập lại số trên)</label>
              <input
                id="soDienThoaiZalo"
                {...register('soDienThoaiZalo')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.soDienThoaiZalo ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập số Zalo của bạn"
              />
              <ErrorMessage message={errors.soDienThoaiZalo?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#374151] font-[500] mb-2">Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
              <label htmlFor="mucDich" className="block text-[#374151] font-[500] mb-2">Bạn cần PTE để làm gì?</label>
              <select
                id="mucDich"
                {...register('mucDich')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none bg-white ${errors.mucDich ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Chọn mục đích --</option>
                <option value="Du học Úc - Visa 500">Du học Úc - Visa 500</option>
                <option value="Working Holiday Úc - Visa 462">Working Holiday Úc - Visa 462</option>
                <option value="Đi làm/Định cư diện chủ bảo lãnh Úc - Visa 482/494/186">Đi làm/Định cư diện chủ bảo lãnh Úc - Visa 482/494/186</option>
                <option value="Định cư diện tay nghề cao Úc - Visa 189/190/491">Định cư diện tay nghề cao Úc - Visa 189/190/491</option>
                <option value="Gia hạn ở lại Úc sau tốt nghiệp - Visa 485">Gia hạn ở lại Úc sau tốt nghiệp - Visa 485</option>
                <option value="Định cư diện đầu tư Úc - Visa 188/132">Định cư diện đầu tư Úc - Visa 188/132</option>
                <option value="Visa nông nghiệp Úc - Visa 403">Visa nông nghiệp Úc - Visa 403</option>
                <option value="Visa training Úc - Visa 407">Visa training Úc - Visa 407</option>
                <option value="Diện cộng điểm Partner Úc">Diện cộng điểm Partner Úc</option>
                <option value="Thẩm định tay nghề Úc (Skill Assessment)">Thẩm định tay nghề Úc (Skill Assessment)</option>
                <option value="Du học New Zealand">Du học New Zealand</option>
                <option value="Định cư New Zealand">Định cư New Zealand</option>
                <option value="Du học Canada">Du học Canada</option>
                <option value="Đi làm/Định cư Canada - PTE Core">Đi làm/Định cư Canada - PTE Core</option>
                <option value="Nhập học các trường ở Việt Nam">Nhập học các trường ở Việt Nam</option>
                <option value="Tốt nghiệp các trường ở Việt Nam">Tốt nghiệp các trường ở Việt Nam</option>
                <option value="Đi làm ở Việt Nam">Đi làm ở Việt Nam</option>
                <option value="Du học Anh">Du học Anh</option>
                <option value="Du học Mỹ">Du học Mỹ</option>
                <option value="Du học các quốc gia khác">Du học các quốc gia khác</option>
              </select>
              <ErrorMessage message={errors.mucDich?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="mucTieuDiem" className="block text-[#374151] font-[500] mb-2">Bạn cần điểm PTE bao nhiêu?</label>
              <select
                id="mucTieuDiem"
                {...register('mucTieuDiem')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none bg-white ${errors.mucTieuDiem ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Chọn mục tiêu điểm --</option>
                <option value="PTE 30 (IELTS 4.5)">PTE 30 (IELTS 4.5)</option>
                <option value="PTE 36 (IELTS 5.0)">PTE 36 (IELTS 5.0)</option>
                <option value="PTE 36 all bands (IELTS 5.0)">PTE 36 all bands (IELTS 5.0)</option>
                <option value="PTE 42 (IELTS 5.5)">PTE 42 (IELTS 5.5)</option>
                <option value="PTE 50 (IELTS 6.0)">PTE 50 (IELTS 6.0)</option>
                <option value="PTE 58 (IELTS 6.5)">PTE 58 (IELTS 6.5)</option>
                <option value="PTE 60 (IELTS 6.5)">PTE 60 (IELTS 6.5)</option>
                <option value="PTE 65 (IELTS 7.0)">PTE 65 (IELTS 7.0)</option>
                <option value="PTE 73 (IELTS 7.5)">PTE 73 (IELTS 7.5)</option>
                <option value="PTE 79 (IELTS 8.0)">PTE 79 (IELTS 8.0)</option>
                <option value="PTE Core (CLB 3)">PTE Core (CLB 3)</option>
                <option value="PTE Core (CLB 4)">PTE Core (CLB 4)</option>
                <option value="PTE Core (CLB 5)">PTE Core (CLB 5)</option>
                <option value="PTE Core (CLB 6)">PTE Core (CLB 6)</option>
                <option value="PTE Core (CLB 7)">PTE Core (CLB 7)</option>
                <option value="PTE Core (CLB 8)">PTE Core (CLB 8)</option>
                <option value="PTE Core (CLB 9)">PTE Core (CLB 9)</option>
                <option value="PTE Core (CLB 10)">PTE Core (CLB 10)</option>
                <option value="Còn đang mơ hồ">Còn đang mơ hồ</option>
              </select>
              <ErrorMessage message={errors.mucTieuDiem?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="thoiGianCan" className="block text-[#374151] font-[500] mb-2">Khi nào bạn cần có điểm?</label>
              <select
                id="thoiGianCan"
                {...register('thoiGianCan')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none bg-white ${errors.thoiGianCan ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Chọn thời gian --</option>
                <option value="Gấp trong vòng 1 tháng">Gấp trong vòng 1 tháng</option>
                <option value="Có thời gian 2-3 tháng">Có thời gian 2-3 tháng</option>
                <option value="Có thời gian 4-6 tháng">Có thời gian 4-6 tháng</option>
                <option value="Chưa cần gấp">Chưa cần gấp</option>
              </select>
              <ErrorMessage message={errors.thoiGianCan?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="thanhPho" className="block text-[#374151] font-[500] mb-2">Thành phố bạn đang ở</label>
              <input
                type="text"
                id="thanhPho"
                {...register('thanhPho')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.thanhPho ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nhập thành phố bạn đang ở"
              />
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
              <label htmlFor="gioiTinh" className="block text-[#374151] font-[500] mb-2">Giới tính</label>
              <select
                id="gioiTinh"
                {...register('gioiTinh')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none bg-white ${errors.gioiTinh ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
              <ErrorMessage message={errors.gioiTinh?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="namSinh" className="block text-[#374151] font-[500] mb-2">Năm sinh</label>
              <input
                type="number"
                id="namSinh"
                {...register('namSinh')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.namSinh ? 'border-red-500' : 'border-gray-300'}`}
                min="1950"
                max="2010"
                placeholder="Nhập năm sinh của bạn"
              />
              <ErrorMessage message={errors.namSinh?.message} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="nguon" className="block text-[#374151] font-[500] mb-2">Nguồn bạn biết đến chúng tôi</label>
              <select
                id="nguon"
                {...register('nguon')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors appearance-none bg-white ${errors.nguon ? 'border-red-500' : 'border-gray-300'}`}
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
              <label htmlFor="ghiChu" className="block text-[#374151] font-[500] mb-2">Ghi chú / lời nhắn</label>
              <textarea
                id="ghiChu"
                {...register('ghiChu')}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none border-gray-300"
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
    <div className="card max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden relative z-10">
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
      
      <form id="registration-form-element" onSubmit={handleSubmit(onSubmit)} className="p-8 pt-4">
        {renderFormStep()}
      </form>
    </div>
  );
};

export default RegistrationForm;
