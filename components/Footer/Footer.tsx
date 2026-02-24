import Link from '../Link/Link';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer_section}>
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.wrapper}>
            <div className={css.logo}>
              <Link href='/' variant='link'>
                Подорожники
              </Link>
            </div>
            <ul className={css.socials}>
              <li>
                <Link href='https://www.facebook.com/' variant='link'>
                  F
                </Link>
              </li>
              <li>
                <Link href='https://www.instagram.com/' variant='link'>
                  I
                </Link>
              </li>
              <li>
                <Link href='https://x.com/' variant='link'>
                  X
                </Link>
              </li>
              <li>
                <Link href='https://www.youtube.com/' variant='link'>
                  Y
                </Link>
              </li>
            </ul>
          </div>
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
          </ul>
        </div>
        <hr className={css.line} />
        <div className={css.copyright}>© 2025 Подорожники. Усі права захищені.</div>
      </div>
    </footer>
  );
};

export default Footer;
