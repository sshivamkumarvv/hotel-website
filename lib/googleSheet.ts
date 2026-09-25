export interface LeadInquiry {
  name: string;
  phone: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
  subject?: string;
  message?: string;
  source?: string;
}

export async function submitInquiry(data: LeadInquiry) {
  try {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to submit inquiry to server');
    }

    return await res.json();
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return { success: false, error };
  }
}
