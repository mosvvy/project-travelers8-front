'use client';
import Image from 'next/image';
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import css from './Header.module.css';
import { useAuthStore } from '@/app/lib/store/authStore';
import Button from '../Button/Button';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const currentPath = usePathname();

  const onBurgerClick = () => {};

  const isHero = currentPath === '/';

  const [isTop, setTop] = useState(true);
  const [isTransparent, setIsTransparent] = useState(isHero);

  window.addEventListener('scroll', () => {
    setTop(window.scrollY === 0);
    setIsTransparent(window.scrollY === 0 && isHero);
  });

  return (
    <header
      className={clsx(
        css.header_section,
        isTransparent && isHero && css.transparent,
        isTop && css.top
      )}
    >
      <div className={css.container}>
        <nav className={css.navbar}>
          <Link href='/' className={css.logo}>
            <Logo variant={isTransparent ? 'light' : 'dark'} />
          </Link>
          <div className={css.wrapper}>
            <ul className={css.menu}>
              <li>
                <Link href='/' variant='link'>
                  Головна
                </Link>
              </li>
              <li>
                <Link href='/stories' variant='link'>
                  Історії
                </Link>
              </li>
              <li>
                <Link href='/travellers' variant='link'>
                  Мандрівники
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link href='/profile' variant='link'>
                    Мій Профіль
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <div className={css.auth}>
              {isAuthenticated ? (
                <>
                  <Link href='/stories/create' variant='primaryBtn'>
                    Опублікувати історію
                  </Link>
                  <div className={css.user}>
                    <Link href='/profile' variant='link'>
                      <Image
                        src='/images/avatar.png'
                        alt='Avatar'
                        width={32}
                        height={32}
                        className={css.avatar}
                      />
                      Імʼя
                    </Link>
                    <Link href='/auth/logout' variant='link' className='logout'>
                      <svg width={24} height={24}>
                        <use href='/icons/sprite.svg#icon-logout' />
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link href='/auth/login' variant='secondaryBtn' className='log-in'>
                    Вхід
                  </Link>
                  <Link href='/auth/register' variant='primaryBtn'>
                    Реєстрація
                  </Link>
                </>
              )}
            </div>
            <div className={css.burger}>
              <Button variant='secondary' onClick={onBurgerClick}>
                <svg width={24} height={24}>
                  <use href='/icons/sprite.svg#icon-menu' />
                </svg>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
