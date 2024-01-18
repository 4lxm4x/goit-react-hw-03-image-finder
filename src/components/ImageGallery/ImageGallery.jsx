import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import '../../styles.css';

class ImageGallery extends Component {
  state = { isModalOpen: false, modalImageURL: '', modalAlt: '' };

  toggleModal = clickedImage => {
    this.setState(prevState => {
      return {
        isModalOpen: !prevState.isModalOpen,
      };
    });

    if (clickedImage) {
      this.setState({
        modalImageURL: clickedImage.target.attributes.largeimage.value, // отут макаронина просто треш. но я не знаю куда запхать URL большого изображения
        modalAlt: clickedImage.target.alt,
      });
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
                  key={id}
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
            onClose={close => this.setState({ isModalOpen: close })}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
