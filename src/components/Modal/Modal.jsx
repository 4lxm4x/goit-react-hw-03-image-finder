import { Component } from 'react';
import { createPortal } from 'react-dom';
import '../../styles.css';
// import { Component } from 'react';

// export default function Modal(largeImage, onOverlayClick) {
//   const modalRootEl = document.getElementById('modal-root');

//   return createPortal(
//     <div className="Overlay" onClick={onOverlayClick}>
//       <div className="Modal">
//         <img src={largeImage.largeImage} className="modalImage" />
//       </div>
//     </div>,
//     modalRootEl
//   );
// }

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
