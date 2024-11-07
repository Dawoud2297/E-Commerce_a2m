import PropTypes from "prop-types";
import { Component } from "react";
import ImageGallery from "react-image-gallery";

class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
      galleryFormat: [],
    };
  }

  onSlide = (currentIndex) => {
    this.setState({
      selectedImage: currentIndex,
    });
  };

  componentDidMount() {
    const images = this.props.gallery;
    const galleryFormat = images.map((image) => ({
      original: image,
      thumbnail: image,
    }));
    this.setState({ galleryFormat });
  }

  render() {
    const { galleryFormat } = this.state;
    return (
      <div className="product-gallery-container" data-testid='product-gallery'>
        <div className="image-carousel">
          <ImageGallery
            items={galleryFormat}
            showFullscreenButton={false}
            showPlayButton={galleryFormat.length >1 ? true : false}
            showThumbnails={galleryFormat.length <= 1 ? false : true} // Disable thumbnails
            thumbnailPosition="left"
            onSlide={this.onSlide}
          />
        </div>
      </div>
    );
  }
}

ProductImages.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductImages;
