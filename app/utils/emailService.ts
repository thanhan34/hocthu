interface EmailParams {
  hoTen: string;
  soDienThoai: string;
  mucDich: string;
  thoiGianCan: string;
  thanhPho: string;
  email: string;
}

export const sendNotificationEmail = async (data: EmailParams) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};
