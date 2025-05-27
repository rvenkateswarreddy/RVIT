import React, { Suspense } from 'react';
import CookiePolicyContent from '../components/legal/CookiePolicyContent';
import {LoadingSkeleton} from '../components/ui/LoadingSkeleton';

// NOTE: Metadata export is not valid in plain JSX. Remove it if not using Next.js app directory with TypeScript.
// If you need metadata for Next.js, move this to a .tsx file and use `export const metadata = { ... }`.

export default function CookiePolicyPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <CookiePolicyContent />
        </Suspense>
      </div>
    </div>
  );
}