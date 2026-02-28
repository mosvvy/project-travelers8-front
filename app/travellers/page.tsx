import css from './page.module.css';
import TravellersPageClient from './TravellersPage.client';

export default async function TravellersPage() {
  const res = await fetch('https://project-travelers8-back.onrender.com/users', {
    cache: 'no-store',
  });

  const data = await res.json();

  console.log(data);

  return (
    <main className={css.container}>
      <h1 className={css.travellersPageTitle}>Мандрівники</h1>
      <TravellersPageClient totalUsers={data.totalUsers} />
    </main>
  );
}
