import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // 서버 주소

// Test 관련 API 호출
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

// Record 관련 API 호출

// 기록 생성
export const createRecord = (recordData) => {
  return axios.post(`${BASE_URL}/records/create`, recordData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error creating record:', error);
    throw error;
  });
};

// 기록 목록 조회
export const fetchRecords = (url) => {
  return axios.get(`${BASE_URL}${url}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching records:', error);
      throw error;
    });
};

// 기록 조회
export const getRecordById = (id) => {
  return axios.get(`${BASE_URL}/records/${id}`)
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching record:', error);
    throw error;
  });
};

// 기록 업데이트
export const updateRecord = (id, recordData) => {
  return axios.put(`${BASE_URL}/records/${id}`, recordData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error updating record:', error);
    throw error;
  });
};

// 기록 삭제
export const deleteRecord = (id) => {
  return axios.delete(`${BASE_URL}/records/${id}`)
  .then(response => response.status === 204) // HTTP 204 No Content
  .catch(error => {
    console.error('Error deleting record:', error);
    throw error;
  });
};
