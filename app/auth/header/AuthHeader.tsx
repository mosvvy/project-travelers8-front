import Link from 'next/link';
import css from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href='/' className={css.logo}>
          {/* <svg className={} width="32" height="32">
            <use href=" " />
          </svg> */}
          Подорожники
        </Link>
      </nav>
    </header>
  );
}
