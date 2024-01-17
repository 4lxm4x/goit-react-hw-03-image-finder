import { createPortal } from 'react-dom';
// import { Component } from 'react';

export default function Modal(largeImage, alt) {
  const modalRootEl = document.getElementById('modal-root');
  return createPortal(
    <div class="overlay">
      <div class="modal">
        <img src={largeImage} alt={alt} />
      </div>
    </div>,
    modalRootEl
  );
}
