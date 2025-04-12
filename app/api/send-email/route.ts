import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Set SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY || '';
    if (!apiKey) {
      console.error('SendGrid API key is missing');
      return NextResponse.json(
        { error: 'SendGrid API key is missing' },
        { status: 500 }
      );
    }
    
    try {
      sgMail.setApiKey(apiKey);
    } catch (error) {
      console.error('Error setting SendGrid API key:', error);
      return NextResponse.json(
        { error: 'Invalid SendGrid API key' },
        { status: 500 }
      );
    }

    // Get email addresses from environment variables
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'pteintensive@gmail.com';
    const toEmail = process.env.SENDGRID_TO_EMAIL || 'dtan42@gmail.com';

    // Create email content
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: 'Đăng ký học thử mới',
      text: `
        Thông tin đăng ký học thử mới:
        
        Họ tên: ${data.hoTen}
        Số điện thoại: ${data.soDienThoai}
        Email: ${data.email}
        Mục đích: ${data.mucDich}
        Thời gian cần: ${data.thoiGianCan}
        Thành phố: ${data.thanhPho}
      `,
      html: `
        <h2>Thông tin đăng ký học thử mới</h2>
        <p><strong>Họ tên:</strong> ${data.hoTen}</p>
        <p><strong>Số điện thoại:</strong> ${data.soDienThoai}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mục đích:</strong> ${data.mucDich}</p>
        <p><strong>Thời gian cần:</strong> ${data.thoiGianCan}</p>
        <p><strong>Thành phố:</strong> ${data.thanhPho}</p>
      `,
    };

    try {
      // Send email
      const response = await sgMail.send(msg);
      console.log('SendGrid response:', response);
      return NextResponse.json({ success: true });
    } catch (sendError: unknown) {
      console.error('SendGrid error:', sendError);
      
      // Type guard to safely access response property
      if (sendError && typeof sendError === 'object' && 'response' in sendError) {
        const typedError = sendError as { response?: { body?: unknown } };
        if (typedError.response && typedError.response.body) {
          console.error('SendGrid error body:', typedError.response.body);
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to send email through SendGrid' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
