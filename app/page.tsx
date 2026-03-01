import Hero from '@/components/Hero/Hero';
import Join from '@/components/Join/Join';
import css from './page.module.css';
import About from '../components/About/About';
import PopularStories from '@/components/PopularStories/PopularStories';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PopularStories />
      <h2>travelers</h2>s
      <Join />
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