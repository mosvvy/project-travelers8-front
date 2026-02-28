'use client';
import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ variant = 'primary', children, onClick, className }: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={clsx(css.button, variant && css[variant], className)} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
