import css from './page.module.css';

export default function HomePage() {
  return (
    <>
      <h1>Головна</h1>
      <h2>project</h2>
      <h2>popular stories</h2>
      <h2>travelers</h2>
      <h2>join us</h2>
    </>
  );
}






/* 'use client';

import { useState } from 'react';
import AuthNavModal from '@/components/AuthNavModal/AuthNavModal';

export default function Home() {
  const [open, setOpen] = useState(true); // ← щоб одразу була відкрита

  return (
    <main>
      <h1>Test page</h1>

      <AuthNavModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </main>
  );
}


 */