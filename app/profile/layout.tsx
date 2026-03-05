'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/app/lib/store/authStore';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import PageToggle from '@/components/PageToggle/PageToggle';
import { getMe } from '../lib/api/clientApi';
import { User } from '@/types/user';
import css from '@/components/Section/Section.module.css';
import styles from './page.module.css';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const authUser = useAuthStore(state => state.user);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(err => console.error('Failed to load user:', err));
  }, []);

  return (
    <div className={css.container}>
      <div className={styles.profilePage} aria-label='profile page'>
        {user && <TravellerInfo traveller={user} />}

        <PageToggle />

        <div>{children}</div>
      </div>
    </div>
  );
}
