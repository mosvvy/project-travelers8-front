'use client';
import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  text: string;
  onClick: () => void;
}

const Button = ({ variant, text, onClick }: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={clsx(css.button, variant && css[variant])} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
