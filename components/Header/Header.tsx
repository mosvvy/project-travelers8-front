'use client';

import { useState, useEffect } from 'react';
import Link from '@/components/Link/Link';
import Logo from '@/components/Logo/Logo';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './Header.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import UserBar from './UserBar/UserBar';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const publicNavigation = [
  { name: 'Головна', href: '/' },
  { name: 'Історії', href: '/stories' },
  { name: 'Мандрівники', href: '/travellers' },
];

const authenticatedNavigation = [
  { name: 'Головна', href: '/' },
  { name: 'Історії', href: '/stories' },
  { name: 'Мандрівники', href: '/travellers' },
  { name: 'Мій профіль', href: '/profile' },
  { name: 'Опублікувати історію', href: '/stories/create' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const pathname = usePathname();

  const { user, clearUser } = useAuthStore();
  const isAuthenticated = !!user;
  const isHomePage = pathname === '/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmLogout = () => {
    clearUser();
    setIsConfirmModalOpen(false);
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

  return (
    <header className={clsx(css.header, isHomePage && css.heroHeader)}>
      <div className={css.container}>
        <Logo variant={isHomePage ? 'light' : 'dark'} />

        <nav className={css.desktopNav}>
          {(isAuthenticated ? authenticatedNavigation : publicNavigation).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(css.navLink, pathname === item.href && css.active)}
              variant="link"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={css.authOrUserSection}>
          {isAuthenticated ? (
            <>
              <Link
                href="/stories/create"
                variant="primaryBtn"
                className={css.publishBtn}
              >
                Опублікувати історію
              </Link>
              <UserBar user={user} isHomePage={isHomePage} />
              <button
                type="button"
                className={clsx(css.iconBtn, css.logoutBtn)}
                onClick={handleLogout}
                aria-label="Вийти з профілю"
              >
                <svg width="24" height="24" className={css.logoutIcon}>
                  <use href="/icons/sprite.svg#icon-arrow_forward"></use>
                </svg>
              </button>
            </>
          ) : (
            <div className={css.authLinks}>
              <Link href="/auth/login" variant="secondaryBtn" className={css.authBtn}>
                Вхід
              </Link>
              <Link href="/auth/register" variant="primaryBtn" className={css.authBtn}>
                Реєстрація
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className={clsx(css.burgerBtn, isHomePage && css.heroHeader)}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span className={css.burgerIcon}></span>
        </button>
      </div>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isAuthenticated={isAuthenticated}
        navigation={isAuthenticated ? authenticatedNavigation : publicNavigation}
        user={user}
        onLogout={handleLogout}
        isHomePage={isHomePage}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmLogout}
        title="Підтвердження виходу"
        message="Ви впевнені, що бажаєте вийти з облікового запису?"
        confirmButtonText="Вийти"
        cancelButtonText="Скасувати"
      />
    </header>
  );
};

export default Header;