import React, { Suspense } from 'react';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import PrivacyPolicyContent from '../components/legal/PrivacyPolicyContent';
// NOTE: The Metadata export and type are not valid in plain JSX/React. 
// If this is for a Next.js page using the App Router and you want metadata,
// use `export const metadata = { ... }` in a .tsx file.
// For pure JSX, simply remove the metadata export.

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <PrivacyPolicyContent />
        </Suspense>
      </div>
    </div>
  );
}