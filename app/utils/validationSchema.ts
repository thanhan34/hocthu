import { z } from 'zod';

// Validation schema for registration form
export const registrationSchema = z.object({
  // Personal information
  hoTen: z
    .string()
    .min(2, { message: 'Họ tên phải có ít nhất 2 ký tự' })
    .max(100, { message: 'Họ tên không được vượt quá 100 ký tự' }),
  
  soDienThoai: z
    .string()
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 số' })
    .max(15, { message: 'Số điện thoại không được vượt quá 15 số' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa các chữ số' }),
  
  soDienThoaiZalo: z
    .string()
    .min(10, { message: 'Số Zalo phải có ít nhất 10 số' })
    .max(15, { message: 'Số Zalo không được vượt quá 15 số' })
    .regex(/^[0-9]+$/, { message: 'Số Zalo chỉ được chứa các chữ số' }),
  
  email: z
    .string()
    .email({ message: 'Email không hợp lệ' })
    .min(5, { message: 'Email phải có ít nhất 5 ký tự' })
    .max(100, { message: 'Email không được vượt quá 100 ký tự' }),
  
  // Study goals
  mucDich: z
    .string()
    .min(1, { message: 'Vui lòng chọn mục đích học PTE' }),
  
  mucTieuDiem: z
    .string()
    .min(1, { message: 'Vui lòng chọn mục tiêu điểm PTE' }),
  
  thoiGianCan: z
    .string()
    .min(1, { message: 'Vui lòng chọn thời gian cần có điểm' }),
  
  thanhPho: z
    .string()
    .min(1, { message: 'Vui lòng chọn thành phố' }),
  
  // Additional information
  gioiTinh: z
    .string()
    .min(1, { message: 'Vui lòng chọn giới tính' }),
  
  namSinh: z
    .string()
    .min(4, { message: 'Vui lòng nhập năm sinh hợp lệ' })
    .refine((val) => {
      const year = parseInt(val);
      return !isNaN(year) && year >= 1950 && year <= 2010;
    }, { message: 'Năm sinh phải từ 1950 đến 2010' }),
  
  nguon: z
    .string()
    .min(1, { message: 'Vui lòng chọn nguồn biết đến chúng tôi' }),
  
  ghiChu: z
    .string()
    .optional(),
  
  // UTM parameters
  utmSource: z
    .string()
    .optional(),
  
  utmCampaign: z
    .string()
    .optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
