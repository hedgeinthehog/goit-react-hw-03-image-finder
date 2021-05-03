import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  // Close modal on Esc button
  handleKeydown = event => {
    const { keyCode } = event;
    if (keyCode === 27) {
      this.props.onClose();
    }
  };

  // Close modal on backdrop click
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
