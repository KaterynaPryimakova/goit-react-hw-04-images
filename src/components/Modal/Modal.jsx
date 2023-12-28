import React, { useEffect } from 'react';
import { Overlay, Content } from './Modal.styled';

export const Modal = ({ modalData, handleCloseModal }) => {
  useEffect(() => {
    const handleEscapeClick = event => {
      if (event.code === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscapeClick);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
      document.body.style.overflow = 'auto';
    };
  }, [handleCloseModal]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      handleCloseModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Content>
        <img src={modalData.largeImageURL} alt={modalData.tags} />
      </Content>
    </Overlay>
  );
};
