import css from './page.module.css';
import TravellersPageClient from './TravellersPage.client';
import Section from '@/components/Section/Section';

export default async function TravellersPage() {
  const res = await fetch('https://project-travelers8-back.onrender.com/users', {
    cache: 'no-store',
  });

  const data = await res.json();

  console.log(data);

  return (
    <Section>
      <h1 className={css.travellersPageTitle}>Мандрівники</h1>
      <TravellersPageClient totalUsers={data.totalUsers} />
    </Section>
  );
}
