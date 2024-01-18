import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import '../../styles.css';

class ImageGallery extends Component {
  state = { isModalOpen: false, modalImageURL: '', modalAlt: '' };

  toggleModal = clickedImage => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    if (clickedImage) {
      this.setState({
        modalImageURL: clickedImage.target.attributes.largeimage.value,
        modalAlt: clickedImage.target.alt,
      });

      // return modalImage;
    }

    document.addEventListener('keydown', key => {
      if (key.code === 'Escape') {
        this.setState({ isModalOpen: false });
      }
    });
  };

  render() {
    return (
      <div>
        <ul className="ImageGallery">
          {this.props.images.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  onClick={this.toggleModal}
                />
              );
            }
          )}
        </ul>
        {this.state.isModalOpen && (
          <Modal
            largeImage={this.state.modalImageURL}
            onOverlayClick={this.toggleModal}
            alt={this.state.modalAlt}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
