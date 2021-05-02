import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20681239-a14f4057e32edf906b8c27d2b';

const fetchPhotos = (query, page, perPage = 12) => {
  return axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}image_type=photo&orientation=horizontal&per_page=${perPage}`);
},

export default {fetchPhotos};