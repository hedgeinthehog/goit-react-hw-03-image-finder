import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ photos, onClick }) => (
  <ul className={styles.gallery} onClick={onClick}>
    {photos.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

ImageGallery.defaultProps = {
  onClick: () => {},
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }),
  ).isRequired,
  onClick: PropTypes.func,
};

export default ImageGallery;
