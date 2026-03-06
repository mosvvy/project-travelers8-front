import Modal from '../Modal/Modal';
import css from './AuthNavModal.module.css';
import Link from '../Link/Link';
import Button from '../Button/Button';

interface AuthNavModalProps {
  onClose: () => void;
}

const AuthNavModal = ({ onClose }: AuthNavModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={css.content}>
        <Button onClick={onClose} variant='secondary' className={css.closeButton}>
          <svg className={css.closeIcon} width='14' height='14'>
            <use href='/icons/sprite.svg#icon-close1' />
          </svg>
        </Button>

        <h2 className={css.title}>Помилка під час збереження</h2>
        <p className={css.message}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь
        </p>
        <div className={css.buttons}>
          <Link href='/auth' className={css.loginButton} variant='secondaryBtn'>
            Увійти
          </Link>
          <Link href='/auth?mode=register' className={css.registerButton} variant='primaryBtn'>
            Зареєструватись
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuthNavModal;
