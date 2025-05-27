import React, { Suspense } from 'react';
import {LoadingSkeleton} from '../components/ui/LoadingSkeleton';
import TermsContent from '../components/legal/TermsContent';

export default function TermsPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <TermsContent />
        </Suspense>
      </div>
    </div>
  );
}