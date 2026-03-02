'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@/components/Link/Link';
import Logo from '@/components/Logo/Logo';
import UserBar from '../UserBar/UserBar';
import { usePathname } from 'next/navigation';
import css from './BurgerMenu.module.css';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  navigation: { name: string; href: string }[];
  user: { name: string; avatarUrl?: string } | null;
  onLogout: () => void;
  isHomePage?: boolean;
}

const BurgerMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  navigation,
  user,
  onLogout,
  isHomePage = false,
}: BurgerMenuProps) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

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
          <Logo variant="dark" />
          <button type="button" className={css.closeBtn} onClick={onClose} aria-label="Закрити меню">
            <svg width="24" height="24" className={css.closeIcon}>
              <use href="/icons/sprite.svg#icon-close"></use>
            </svg>
          </button>
        </div>

        <nav className={css.menuNav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(css.navLink, pathname === item.href && css.active)}
              variant="link"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={css.menuFooter}>
          {isAuthenticated ? (
            <>
              <UserBar user={user} />
              <button
                type="button"
                className={css.logoutBtn}
                onClick={() => {
                  onClose();
                  onLogout();
                }}
              >
                <svg width="24" height="24" className={css.logoutIcon}>
                  <use href="/icons/sprite.svg#icon-arrow_forward"></use>
                </svg>
                <span className={css.logoutText}>Вийти</span>
              </button>
            </>
          ) : (
            <div className={css.authLinks}>
              <Link href="/auth/login" variant="secondaryBtn" className={css.authBtn} onClick={onClose}>
                Вхід
              </Link>
              <Link href="/auth/register" variant="primaryBtn" className={css.authBtn} onClick={onClose}>
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;