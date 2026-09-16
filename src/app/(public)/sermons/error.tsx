"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="py-24 flex-1 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <svg className="mx-auto h-16 w-16 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We encountered a problem while trying to fetch the latest sermons. Please try again or check back later.
        </p>
        <button
          onClick={() => reset()}
          className="bg-fbcc-navy hover:bg-fbcc-ocean text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
