import '../../styles.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li key={id} className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        largeimage={largeImageURL}
        onClick={onClick}
      />
    </li>
  );
}
