import css from './Logo.module.css';

interface LogoProps {
  variant?: 'dark' | 'light';
}

const Logo = ({ variant = 'dark' }: LogoProps) => {
  return (
    <div className={`${css.logo} ${css[variant]}`}>
      <svg width='24' height='24'>
        <use href='/logo.svg'></use>
      </svg>
      <span>Подорожники</span>
    </div>
  );
};

export default Logo;
