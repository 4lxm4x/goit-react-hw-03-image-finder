import { Component } from 'react';
import { createPortal } from 'react-dom';
import '../../styles.css';

class Modal extends Component {
  modalRootEl = document.getElementById('modal-root');
  onOverlayClick = e => {
    if (e.currentTarget == e.target) {
      this.props.onOverlayClick();
    }
  };
  onEscDown = e => {
    console.log(e);
  };

  render() {
    return createPortal(
      <div
        className="Overlay"
        onClick={this.onOverlayClick}
        onKeyDown={this.onEscDown}
      >
        <div className="Modal">
          <img src={this.props.largeImage} className="modalImage" />
        </div>
      </div>,
      this.modalRootEl
    );
  }
}

export default Modal;
