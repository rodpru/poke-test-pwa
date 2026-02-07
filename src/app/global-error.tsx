'use client';

import './globals.css';

const geistSans = {
  variable: 'var(--font-geist-sans)',
};

const geistMono = {
  variable: 'var(--font-geist-mono)',
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-pt">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-red-600">Algo correu mal!</h2>
          <p className="mt-4 text-gray-600">{error.message}</p>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
