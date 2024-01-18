import { Component } from 'react';
import { createPortal } from 'react-dom';
import '../../styles.css';

class Modal extends Component {
  modalRootEl = document.getElementById('modal-root');

  componentDidMount() {
    window.addEventListener('keydown', key => {
      if (key.code === 'Escape') {
        return this.props.onClose(false);
      }
    });
  }

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onOverlayClick();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal" onClick={this.onOverlayClick}>
          <img
            src={this.props.largeImage}
            className="modalImage"
            alt={this.props.alt}
          />
        </div>
      </div>,
      this.modalRootEl
    );
  }
}

export default Modal;
