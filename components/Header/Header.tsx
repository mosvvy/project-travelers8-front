import Image from 'next/image';
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import css from './Header.module.css';

const Header = () => {
  const isAuthenticated = true; // Змінна для перевірки автентифікації користувача

  return (
    <header className={css.header_section}>
      <div className={css.container}>
        <nav className={css.navbar}>
          <Logo />
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
            <ul className={css.auth}>
              {isAuthenticated ? (
                <>
                  <Link href='/stories/new' variant='primaryBtn'>
                    Опублікувати історію
                  </Link>
                  <li>
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
                  </li>
                  <li>
                    <Link href='/auth/logout' variant='link'>
                      <svg width={24} height={24}>
                        <use href='/icons/sprite.svg#icon-logout' />
                      </svg>
                    </Link>
                  </li>
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
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
