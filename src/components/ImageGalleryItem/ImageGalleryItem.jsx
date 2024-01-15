import '../../styles.css';

export default function ImageGalleryItem({ id, webformatURL, tags }) {
  return (
    <li key={id} className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}
