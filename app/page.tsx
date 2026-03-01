import Hero from '@/components/Hero/Hero';
import OurTravellers from '@/components/OurTravellers/OurTravellers';
import Join from '@/components/Join/Join';
import css from './page.module.css';

export default function HomePage() {
  return (
    <>
      <Hero />
      <h2>project</h2>
      <h2>popular stories</h2>
      <OurTravellers />
      <Join />
    </>
  );
}
