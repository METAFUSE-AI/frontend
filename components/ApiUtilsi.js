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
    console.error('Error creating test:', error);
    throw error;
  });
};

// Record 관련 API 호출

// 기록 생성
export const createRecord = (recordData) => {
  return axios.post(`${BASE_URL}/records`, recordData, {  // /create 제거
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
export const fetchRecords = () => {
  return axios.get(`${BASE_URL}/records`) // /records URL로 GET 요청
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
export const deleteRecord = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/records/${id}`);
    
    // 상태 코드가 204인 경우 삭제 성공으로 처리
    if (response.status === 204) {
      return true;
    } else {
      // 상태 코드가 204가 아닌 경우 에러 발생
      console.error('Unexpected response status:', response.status);
      throw new Error('Failed to delete record');
    }
  } catch (error) {
    // 에러 발생 시 상세 에러 메시지 로그
    console.error('Error deleting record:', error.response ? error.response.data : error.message);
    throw error; // 에러를 호출한 쪽으로 다시 던짐
  }
};

// 랜덤 퀴즈 가져오기
export const fetchRandomQuizzes = (limit = 10) => {
  return axios.get(`${BASE_URL}/quizzes/random?limit=${limit}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching random quizzes:', error);
      throw error;
    });
};

// 퀴즈 답변 저장
export const createQuizAnswer = (answerData) => {
  return axios.post(`${BASE_URL}/quiz-answers`, answerData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error saving quiz answer:', error);
    throw error;
  });
};
