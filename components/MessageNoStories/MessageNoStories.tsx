import css from './MessageNoStories.module.css';
import Link from '../Link/Link';

type PageProps = {
  text: string;
  buttonText: string;
};

const MessageNoStories = ({ text, buttonText }: PageProps) => {
  const messageLink = text === 'Опублікувати історію' ? '/new-story' : '/stories';

  return (
    <div className={css.messageWrapper}>
      <p className={css.messageText}>{text}</p>
      <Link href={messageLink} className={css.messageButtonText}>
        {buttonText}
      </Link>
    </div>
  );
};

export default MessageNoStories;
