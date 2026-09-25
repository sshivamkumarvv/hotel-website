'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#FCFBF9]">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-amber-900/10 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            An unexpected error occurred while loading this page. Please try refreshing or return to the main sanctuary.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="shimmer-btn px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
