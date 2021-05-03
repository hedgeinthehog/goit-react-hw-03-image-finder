import React from 'react';
import photosApi from '../../services/pixabay-api';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';

class App extends React.Component {
  state = {
    photos: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    showModal: false,
    pickedPhotoUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (searchQuery !== prevState.searchQuery) {
      this.fetchPhotos();
    }
  }

  handlQueryChange = query => {
    this.setState({ photos: [], searchQuery: query, currentPage: 1 });
  };

  fetchPhotos = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { query: searchQuery, page: currentPage };

    this.setState({ isLoading: true });

    photosApi
      .fetchPhotos(options)
      .then(({ hits }) => {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(console.log)
      .finally(() => this.setState({ isLoading: false }));
  };

  openModal = event => {
    const { target } = event;
    if (target.nodeName === 'IMG') {
      this.setState({ showModal: true, pickedPhotoUrl: target.dataset.source });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false, pickedPhotoUrl: '' });
  };

  render() {
    const { photos, isLoading, showModal, pickedPhotoUrl } = this.state;
    const existPhotosToShow = photos.length > 0;

    return (
      <>
        <Searchbar onSubmit={this.handlQueryChange} />
        <ImageGallery photos={photos} onClick={this.openModal} />
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={pickedPhotoUrl} alt="" />
          </Modal>
        )}
        {isLoading && <Loader />}
        {existPhotosToShow && !isLoading && (
          <Button onClick={this.fetchPhotos} />
        )}
      </>
    );
  }
}

export default App;
