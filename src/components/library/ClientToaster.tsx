'use client';

import { Toaster } from 'sonner';

export default function ClientToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      dir="rtl" // ✅ بيفيد العربي
    />
  );
}
