import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import '../../styles.css';

class ImageGallery extends Component {
  state = { isModalOpen: false, modalImageURL: '' };

  toggleModal = e => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    if (e) {
      const modalImage = e.target.attributes.largeimage.value;

      this.setState({
        modalImageURL: modalImage,
      });

      return modalImage;
    }
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
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
