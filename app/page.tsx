import Hero from '@/components/Hero/Hero';
import Join from '@/components/Join/Join';  
import css from './page.module.css';

export default function HomePage() {
  return (
    <>
      <h1>Головна</h1>
      <Hero />
      <h2>project</h2>
      <h2>popular stories</h2>
      <h2>travelers</h2>s
       <Join />
    </>
  );
}
