import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import '../../styles.css';

class ImageGallery extends Component {
  state = { isModalOpen: false, modalImageURL: '', modalAlt: '' };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        isModalOpen: !prevState.isModalOpen,
      };
    });
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState(
      {
        modalImageURL: largeImageURL,
        modalAlt: tags,
      },
      () => this.toggleModal()
    );
  };

  render() {
    return (
      <div>
        <ul className="ImageGallery">
          {this.props.images.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  onClick={() => this.handleImageClick(largeImageURL, tags)}
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
            onClose={close => this.setState({ isModalOpen: close })}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
