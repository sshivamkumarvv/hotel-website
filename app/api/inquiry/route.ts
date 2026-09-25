import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email = '',
      checkIn = '',
      checkOut = '',
      guests = '',
      roomType = '',
      subject = 'General Stay Inquiry',
      message = '',
      source = 'Website',
    } = body;

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    const leadData = {
      timestamp,
      name,
      phone,
      email,
      checkIn,
      checkOut,
      guests,
      roomType,
      subject,
      message,
      source,
      status: 'New',
      remarks: '',
    };

    console.log('[New Lead Received]:', leadData);

    // If Google Sheets Webhook URL is configured in environment variables
    const googleSheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (googleSheetWebhook) {
      try {
        const response = await fetch(googleSheetWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
        });

        if (!response.ok) {
          console.warn('Google Sheet Webhook returned non-200 status');
        }
      } catch (sheetError) {
        console.error('Failed to post to Google Sheets webhook:', sheetError);
        // We still return success to the user so their experience is smooth
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and logged successfully',
      data: leadData,
    });
  } catch (error) {
    console.error('API Error in /api/inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
