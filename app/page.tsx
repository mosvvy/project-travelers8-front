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
