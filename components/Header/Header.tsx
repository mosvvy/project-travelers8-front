'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { useAuthStore } from '@/app/lib/store/authStore';
import Logo from '../Logo/Logo';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { user, isAuthenticated, clearUser } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    clearUser();
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
          <Logo variant={isHomePage ? 'light' : 'dark'} />
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
                <Image
                  src={user?.avatarUrl || '/images/default-avatar.png'}
                  alt={user?.name || 'Аватар користувача'}
                  className={css.avatar}
                  width={32}
                  height={32}
                />
                <span className={css.userName}>{user?.name}</span>
              </div>
              <button onClick={handleLogout} className={css.logoutBtn}>
                <svg width='24' height='24'>
                  <use href='/icons/sprite.svg#icon-logout' />
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
          <svg width='24' height='24'>
            <use href='/icons/sprite.svg#icon-burger' />
          </svg>
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
