import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './authTabs.module.css';
import AuthHeader from './header/AuthHeader';
import AuthFooter from './footer/AuthFooter';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthHeader />
      <div className={styles.tabs}>
        <Link href='/auth/register' className={styles.tab}>
          Реєстрація
        </Link>
        <Link href='/auth/login' className={styles.tab}>
          Вхід
        </Link>
      </div>

      {children}
      <AuthFooter />
    </div>
  );
}
