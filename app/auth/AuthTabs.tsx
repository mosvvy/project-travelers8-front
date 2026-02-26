'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './authTabs.module.css';

export default function AuthTabs() {
  const pathname = usePathname();

  return (
    <div className={styles.tabs}>
      <Link
        href='/auth/register'
        className={`${styles.tab} ${pathname === '/auth/register' ? styles.active : ''}`}
      >
        Реєстрація
      </Link>

      <Link
        href='/auth/login'
        className={`${styles.tab} ${pathname === '/auth/login' ? styles.active : ''}`}
      >
        Вхід
      </Link>
    </div>
  );
}
