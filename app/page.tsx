import Hero from '@/components/Hero/Hero';
import Join from '@/components/Join/Join';
import css from './page.module.css';
import About from '../components/About/About';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <h2>popular stories</h2>
      <h2>travelers</h2>s
      <Join />
    </>
  );
}
