import React from 'react';
import photosApi from '../../services/pixabay-api';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';

class App extends React.Component {
  state = {
    photos: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
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
        console.log(hits);
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

  render() {
    const { photos, isLoading } = this.state;
    const existPhotosToShow = photos.length > 0;

    return (
      <>
        <Searchbar onSubmit={this.handlQueryChange} />
        <ImageGallery photos={photos} />
        {/*     
        <Modal /> */}
        {isLoading && <Loader />}
        {existPhotosToShow && !isLoading && (
          <Button onClick={this.fetchPhotos} />
        )}
      </>
    );
  }
}

export default App;
