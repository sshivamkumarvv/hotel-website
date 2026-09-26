import { NextResponse } from 'next/server';

// Revalidate once every 24 hours (86400 seconds) for ultra-fast, zero-overhead caching
export const revalidate = 86400;

const DEFAULT_LIMIT = 12; // Maximum newest reviews returned from the sheet

export async function GET(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      success: true,
      source: 'fallback',
      reviews: [],
    });
  }

  // Support optional custom limit, e.g. /api/reviews?limit=6
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? Math.max(1, parseInt(limitParam, 10)) : DEFAULT_LIMIT;

  try {
    const res = await fetch(webhookUrl, {
      method: 'GET',
      next: { revalidate: 86400 }, // 24-hour cache
    });

    if (!res.ok) {
      return NextResponse.json({
        success: true,
        source: 'fallback',
        reviews: [],
      });
    }

    const json = await res.json();
    const rawReviews = Array.isArray(json.reviews) ? json.reviews : [];

    // Show newest first and cap at the limit (e.g. latest 12 reviews)
    const limitedReviews = [...rawReviews].reverse().slice(0, limit);

    return NextResponse.json({
      success: true,
      source: 'google_sheet',
      totalInSheet: rawReviews.length,
      returnedCount: limitedReviews.length,
      limitApplied: limit,
      reviews: limitedReviews,
    });
  } catch (error) {
    console.error('Failed to fetch reviews from Google Sheet:', error);
    return NextResponse.json({
      success: true,
      source: 'fallback',
      reviews: [],
    });
  }
}
