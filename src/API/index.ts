import axios from 'axios';

const baseURL = (() => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://some-domain.com/api' //
  } else {
    return 'https://jsonplaceholder.typicode.com' //
  }
})();

export const axiosInstance = axios.create({
  baseURL,
  timeout: 6000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
});
