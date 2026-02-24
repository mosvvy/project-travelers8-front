import Link from '../Link/Link';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer_section}>
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.wrapper}>
            <div className={css.logo}>
              <Link href='/' variant='link' text='Подорожники' />
            </div>
            <ul className={css.socials}>
              <li>
                <Link href='https://www.facebook.com/' variant='link' text='F' />
              </li>
              <li>
                <Link href='https://www.instagram.com/' variant='link' text='I' />
              </li>
              <li>
                <Link href='https://x.com/' variant='link' text='X' />
              </li>
              <li>
                <Link href='https://www.youtube.com/' variant='link' text='Y' />
              </li>
            </ul>
          </div>
          <ul className={css.menu}>
            <li>
              <Link href='/' variant='link' text='Головна' />
            </li>
            <li>
              <Link href='/stories' variant='link' text='Історії' />
            </li>
            <li>
              <Link href='/travellers' variant='link' text='Мандрівники' />
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
