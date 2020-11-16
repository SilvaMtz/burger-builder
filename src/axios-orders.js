import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-73765.firebaseio.com/'
});

export default instance;