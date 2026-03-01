'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../Modal/Modal';
import css from './AuthNavModal.module.css';
import CloseIcon from '../../app/close-btn.svg';

const AuthNavModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => setIsOpen(false);

  const handleLogin = () => {
    handleClose();
    router.push('/auth/login');
  };

  const handleRegister = () => {
    handleClose();
    router.push('/auth/register');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <button
        className={css.closeBtn}
        onClick={handleClose}
        aria-label="Закрити"
      >
        <img src={CloseIcon.src} alt="" className={css.closeIcon} />
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