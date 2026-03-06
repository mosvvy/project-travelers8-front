'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/lib/store/authStore';

export default function AuthInit() {
  const restore = useAuthStore(s => s.restore);

  useEffect(() => {
    restore();
  }, [restore]);

  return null;
}
