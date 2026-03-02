'use client';
import Image from 'next/image';
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import css from './Header.module.css';
import { useAuthStore } from '@/app/lib/store/authStore';
import Button from '../Button/Button';

const Header = () => {
  const { isAuthenticated } = useAuthStore();

  const onBurgerClick = () => {};

  return (
    <header className={css.header_section}>
      <div className={css.container}>
        <nav className={css.navbar}>
          <Link href='/' className={css.logo}>
            <Logo />
          </Link>
          <div className={css.wrappwer}>
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
                    <Link href='/auth/logout' variant='link'>
                      <svg width={24} height={24}>
                        <use href='/icons/sprite.svg#icon-logout' />
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link href='/auth/login' variant='secondaryBtn'>
                    Вхід
                  </Link>
                  <Link href='/auth/register' variant='primaryBtn'>
                    Реєстрація
                  </Link>
                </>
              )}
            </div>
            <Button variant='secondary' className={css.burger} onClick={onBurgerClick}>
              <svg width={24} height={24}>
                <use href='/icons/sprite.svg#icon-menu' />
              </svg>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
