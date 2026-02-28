import css from './MessageNoStories.module.css';
import Link from 'next/link';

const MessageNoStories = () => {
  return (
    <>
      <p>Цей користувач ще не опублікував історій</p>
      <Link href='/'>Назад до історій</Link>
    </>
  );
};

export default MessageNoStories;
