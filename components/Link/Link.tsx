'use client';
import clsx from 'clsx';
import css from './Link.module.css';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'link' | 'primaryBtn' | 'secondaryBtn';
  text: string;
  href: string;
}

const Button = ({ variant, href, text }: ButtonProps) => {
  return (
    <Link href={href} className={clsx(css.link, variant && css[variant])}>
      {text}
    </Link>
  );
};

export default Button;
