import css from './MessageNoStories.module.css';
import Link from '../Link/Link';

type PageProps = {
  text: string;
  buttonText: string;
  route: string;
};

const MessageNoStories = ({ text, buttonText, route }: PageProps) => {
  return (
    <div className={css.messageWrapper}>
      <p className={css.messageText}>{text}</p>
      <Link href={route} className={css.messageButtonText}>
        {buttonText}
      </Link>
    </div>
  );
};

export default MessageNoStories;
