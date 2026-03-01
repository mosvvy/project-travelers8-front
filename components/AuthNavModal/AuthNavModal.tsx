'use client';

import { useRouter } from 'next/navigation';
import Modal from '../Modal/Modal';
import css from './AuthNavModal.module.css';

type AuthNavModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthNavModal = ({ isOpen, onClose }: AuthNavModalProps) => {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push('/auth/login');
  };

  const handleRegister = () => {
    onClose();
    router.push('/auth/register');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* close button */}
      <button
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Закрити"
      >
        ×
      </button>

      {/* text block */}
      <div className={css.textBlock}>
        <h2 className={css.title}>Помилка під час <br /> збереження</h2>

        <p className={css.text}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає
          облікового запису — зареєструйтесь
        </p>
      </div>

      {/* actions */}
      <div className={css.actions}>
        <button className={css.loginBtn} onClick={handleLogin}>
          Увійти
        </button>

        <button
          className={css.registerBtn}
          onClick={handleRegister}
        >
          Зареєструватись
        </button>
      </div>
    </Modal>
  );
};

export default AuthNavModal;