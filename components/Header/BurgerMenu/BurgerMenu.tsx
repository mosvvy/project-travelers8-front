'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './BurgerMenu.module.css';
import Image from 'next/image';
import Logo from '@/components/Logo/Logo';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user?: { name: string; avatarUrl?: string } | null;
}

const BurgerMenu = ({ isOpen, onClose, isAuthenticated, user }: BurgerMenuProps) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={clsx(css.backdrop, isOpen && css.isOpen)} onClick={handleBackdropClick}>
      <div className={clsx(css.menu, isOpen && css.isOpen)} ref={menuRef}>
        <div className={css.menuHeader}>
          <Link href='/' className={css.logo}>
            <Logo />
          </Link>
          <button className={css.closeBtn} onClick={onClose}>
            <svg width='24' height='24'>
              <use href='/icons/sprite.svg#icon-close' />
            </svg>
          </button>
        </div>

        {isAuthenticated ? (
          // МЕНЮ ДЛЯ АВТОРИЗОВАНИХ
          <>
            <nav className={css.menuNav}>
              <Link
                href='/'
                className={clsx(css.navLink, pathname === '/' && css.active)}
                onClick={onClose}
              >
                Головна
              </Link>
              <Link
                href='/stories'
                className={clsx(css.navLink, pathname === '/stories' && css.active)}
                onClick={onClose}
              >
                Історії
              </Link>
              <Link
                href='/travellers'
                className={clsx(css.navLink, pathname === '/travellers' && css.active)}
                onClick={onClose}
              >
                Мандрівники
              </Link>
              <Link
                href='/profile'
                className={clsx(css.navLink, pathname === '/profile' && css.active)}
                onClick={onClose}
              >
                Мій профіль
              </Link>
            </nav>

            <div className={css.menuFooter}>
              {/* Кнопка "Опублікувати історію" - синя */}
              <Link href='/stories/create' className={css.publishBtn} onClick={onClose}>
                Опублікувати історію
              </Link>

              {/* Профіль з аватаром, ім'ям і кнопкою виходу */}
              <div className={css.profileSection}>
                <div className={css.profileInfo}>
                  <Image
                    src={user?.avatarUrl || '/default-avatar.png'}
                    alt={user?.name || 'Аватар користувача'}
                    className={css.avatar}
                    width={32}
                    height={32}
                  />
                  <span className={css.userName}>{user?.name}</span>
                </div>
                <button className={css.logoutBtn} onClick={onClose}>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-9c-1.1 0-2 .9-2 2v4h2V5h9v14h-9v-4H9v4c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          // МЕНЮ ДЛЯ НЕАВТОРИЗОВАНИХ
          <>
            <nav className={css.menuNav}>
              <Link
                href='/'
                className={clsx(css.navLink, pathname === '/' && css.active)}
                onClick={onClose}
              >
                Головна
              </Link>
              <Link
                href='/stories'
                className={clsx(css.navLink, pathname === '/stories' && css.active)}
                onClick={onClose}
              >
                Історії
              </Link>
              <Link
                href='/travellers'
                className={clsx(css.navLink, pathname === '/travellers' && css.active)}
                onClick={onClose}
              >
                Мандрівники
              </Link>
            </nav>

            <div className={css.menuFooter}>
              <Link href='/auth/login' className={css.loginBtn} onClick={onClose}>
                Вхід
              </Link>
              <Link href='/auth/register' className={css.registerBtn} onClick={onClose}>
                Реєстрація
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
