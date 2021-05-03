import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '20681239-a14f4057e32edf906b8c27d2b';

const Api = {
  fetchPhotos({ query, page, perPage = 12 }) {
    return axios
      .get(
        `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
      )
      .then(response => response.data);
  },
};

export default Api;
