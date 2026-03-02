'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { useAuthStore } from '@/app/lib/store/authStore';
import { logout } from '@/app/lib/api/proxyApi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { user, isAuthenticated, clearUser } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    if (await logout()) {
      clearUser();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const authNavigation = [
    { name: 'Головна', href: '/' },
    { name: 'Історії', href: '/stories' },
    { name: 'Мандрівники', href: '/travellers' },
    { name: 'Мій профіль', href: '/profile' },
  ];

  const publicNavigation = [
    { name: 'Головна', href: '/' },
    { name: 'Історії', href: '/stories' },
    { name: 'Мандрівники', href: '/travellers' },
  ];

  const navigation = isAuthenticated ? authNavigation : publicNavigation;

  return (
    <header className={clsx(css.header, isHomePage && css.heroHeader)}>
      <div className={css.container}>
        <Link href='/' className={css.logo}>
          <svg width='23' height='23' viewBox='0 0 23 23' fill='currentColor'>
            <use href='/logo.svg#icon-logo' />
          </svg>
          <span>Подорожники</span>
        </Link>

        <div className={css.headerRight}>
          <nav className={css.desktopNav}>
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(css.navLink, pathname === item.href && css.active)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {isAuthenticated ? (
            <div className={css.userSection}>
              <Link href='/stories/create' className={css.publishBtnDesktop}>
                Опублікувати історію
              </Link>
              <div className={css.profile}>
                <img
                  src={user?.avatarUrl || '/avatarDefault.jpg'}
                  alt={user?.name}
                  className={css.avatar}
                />
                <span className={css.userName}>{user?.name}</span>
              </div>
              <button onClick={handleLogout} className={css.logoutBtn}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-9c-1.1 0-2 .9-2 2v4h2V5h9v14h-9v-4H9v4c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' />
                </svg>
              </button>
            </div>
          ) : (
            <div className={css.authLinks}>
              <Link href='/auth/login' className={css.btnLogin}>
                Вхід
              </Link>
              <Link href='/auth/register' className={css.btnRegister}>
                Реєстрація
              </Link>
            </div>
          )}
        </div>

        {/* Планшетна кнопка - ДЛЯ ВСІХ! */}
        <Link href='/stories/create' className={css.publishBtnTablet}>
          Опублікувати історію
        </Link>

        <button className={css.burgerBtn} onClick={toggleMenu} aria-label='Меню'>
          <span className={css.burgerIcon}></span>
        </button>
      </div>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    </header>
  );
};

export default Header;
