import '../../styles.css';

export default function ImageGalleryItem({ id, webformatURL, tags, onClick }) {
  return (
    <li key={id} className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  );
}
