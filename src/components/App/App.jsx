import React from 'react';
import photosApi from '../../services/pixabay-api';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';

class App extends React.Component {
  state = {
    photos: [],
    searchQuery: '',
    currentPage: 1,
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
      .catch(console.log);
  };

  render() {
    const { photos } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handlQueryChange} />
        <ImageGallery photos={photos} />
        {/* <Loader />
        
        <Modal /> */}
        {photos.length > 0 && <Button onClick={this.fetchPhotos} />}
      </>
    );
  }
}

export default App;
