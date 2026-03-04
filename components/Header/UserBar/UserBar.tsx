'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import css from './UserBar.module.css';

interface UserBarProps {
  user: {
    name?: string;
    avatarUrl?: string;
  } | null;
  isHomePage?: boolean;
}

const UserBar = ({ user, isHomePage = false }: UserBarProps) => {
  if (!user) return null;

  return (
    <div className={css.userBar}>
      <Link href='/profile' className={css.avatarLink}>
        <Image
          src={user?.avatarUrl || '/images/default-avatar.png'}
          alt={user?.name || 'Аватар користувача'}
          className={css.avatar}
          width={32}
          height={32}
        />
      </Link>
      <span className={clsx(css.userName, isHomePage && css.light)}>{user.name}</span>
      <span className={clsx(css.separator, isHomePage && css.light)}></span>
    </div>
  );
};

export default UserBar;
