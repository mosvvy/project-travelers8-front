'use client';
import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick: () => void;
}

const Button = ({ variant = 'primary', children, fullWidth = false, onClick }: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  const widthClass = fullWidth ? css.fullWidth : css.defaultWidth;

  return (
    <button className={clsx(css.button, widthClass, variant && css[variant])} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
