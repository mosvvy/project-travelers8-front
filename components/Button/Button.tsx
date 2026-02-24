'use client';
import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;

  onClick: () => void;
}

const Button = ({ variant, children, onClick }: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={clsx(css.button, variant && css[variant])} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
