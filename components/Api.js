import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // 서버 주소

export const createTest = (testData) => {
  return axios.post(`${BASE_URL}/tests/create`, testData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
};
