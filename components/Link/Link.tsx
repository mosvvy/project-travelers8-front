'use client';
import clsx from 'clsx';
import css from './Link.module.css';
import NextLink from 'next/link';

interface LinkProps {
  variant?: 'link' | 'primaryBtn' | 'secondaryBtn';
  children: React.ReactNode;
  href: string;
  className?: string;
}

const Link = ({ variant = 'primaryBtn', href, children, className }: LinkProps) => {
  return (
    <NextLink href={href} 
    className={clsx(css.link, variant && css[variant], className)}>
      {children}
    </NextLink>
  );
};

export default Link;
