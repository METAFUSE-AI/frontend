// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Spring Boot 서버 URL
  // headers: { 'Content-Type': 'application/json' } // 필요한 경우 추가
});

export default api;
