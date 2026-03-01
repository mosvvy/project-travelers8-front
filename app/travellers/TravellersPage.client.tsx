'use client';

import { useEffect, useState } from 'react';
import TravellersList from '@/components/TravellersList/TravellersList';
import Button from '@/components/Button/Button';
import { User } from '@/types/user';
import css from './page.module.css';

const LOAD_STEP = 4;

export default function TravellersPageClient({ totalUsers }: { totalUsers: number }) {
  const [users, setUsers] = useState<User[]>([]);
  const [perPage, setPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async (nextPerPage = perPage) => {
    setIsLoading(true);
    const res = await fetch(
      `https://project-travelers8-back.onrender.com/users?page=1&perPage=${nextPerPage}`
    );
    const data = await res.json();

    setUsers(data.users);
    setPerPage(nextPerPage);
    setIsLoading(false);
  };

  useEffect(() => {
    const initialPerPage = window.innerWidth >= 1440 ? 12 : 8;
    setPerPage(initialPerPage);
    loadMore(initialPerPage);
  }, []);

  const isAllLoaded = users.length >= totalUsers;

  return (
    <>
      <TravellersList travellers={users} />
      <div className={css.buttonContainer}>
        {!isAllLoaded && (
          <Button onClick={() => loadMore(perPage + LOAD_STEP)}>
            {isLoading ? 'Завантаження…' : 'Переглянути ще'}
          </Button>
        )}
      </div>
    </>
  );
}
