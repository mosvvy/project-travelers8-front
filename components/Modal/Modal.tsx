import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
      // document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return createPortal(
    <div onClick={handleBackdropClick} className={css.backdrop} role='dialog' aria-modal='true'>
      <div className={css.modal}>
        <button type='button' className={css.closeBtn} onClick={onClose} aria-label='Close modal'>
          <svg className={css.iconX}>
            <use href='/sprite.svg#icon-close1' />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
