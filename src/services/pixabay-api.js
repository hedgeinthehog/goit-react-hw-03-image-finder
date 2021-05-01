// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12
// Pixabay API поддерживает пагинацию, по умолчанию параметр page равен 1.
// Пусть в ответе приходит по 12 объектов, установлено в параметре per_page.
//Не забудь что при поиске по новому ключевому слову, необходимо сбрасывать значение page в 1.

// В ответе от апи приходит массив объектов, в которых тебе интересны только следущие свойства.

// id - уникальный идентификатор
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение для модального окна
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20681239-a14f4057e32edf906b8c27d2b';
const fetchPhotos = (query, page, perPage = 12) => {
  return axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}image_type=photo&orientation=horizontal&per_page=${perPage}`);
},

export default {fetchPhotos};