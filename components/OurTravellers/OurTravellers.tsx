// app/components/OurTravellers/OurTravellers.tsx
'use client';

import { useEffect, useState } from 'react';
import TravellersList from '@/components/TravellersList/TravellersList';
import Section from '@/components/Section/Section';
import Link from 'next/link';
import { User } from '@/types/user';
import css from './OurTravellers.module.css';

export default function OurTravellers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'https://project-travelers8-back.onrender.com/users?page=1&perPage=4',
        { cache: 'no-store' }
      );
      const data = await res.json();
      setUsers(data.users);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <Section sectionClassName={css.ourTravellersSection}>
      <h2 className={css.ourTravellersTitle}>Наші Мандрівники</h2>
      {!isLoading && <TravellersList travellers={users} />}
      <div className={css.viewAllContainer}>
        <Link href='/travellers' className={css.viewAllLink}>
          Переглянути всіх
        </Link>
      </div>
    </Section>
  );
}
