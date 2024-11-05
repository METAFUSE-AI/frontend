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
  return axios.post(`${BASE_URL}/records`, recordData, {
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

// 특정 사용자의 기록 목록 조회
export const fetchRecords = (username) => {
  return axios.get(`${BASE_URL}/records/member/${username}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching records:', error);
      throw error;
    });
};

// 특정 사용자의 기록 ID로 조회
export const getRecordById = async (recordId) => {
  const response = await fetch(`${BASE_URL}/records/${recordId}`); // API URL로 요청
  if (!response.ok) {
    throw new Error('No record found for the provided ID.');
  }
  return await response.json(); // 기록 반환
};


// 기록 업데이트
export const updateRecord = (recordId, updatedData) => {
  return axios.put(`${BASE_URL}/records/${recordId}`, updatedData, {
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
export const deleteRecord = (recordId) => {
  return axios.delete(`${BASE_URL}/records/${recordId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting record:', error);
      throw error;
    });
};

// 랜덤 퀴즈 가져오기
export const fetchRandomQuizzes = async (limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes/random?count=${limit}`);
    console.log('Fetched quizzes response:', response.data);
    return response.data.map(quiz => ({
      id: quiz.id,
      question: quiz.question,
      options: quiz.options.split(','), // 옵션을 배열로 변환
      answer: quiz.answer,
      answerIndex: quiz.options.split(',').indexOf(quiz.answer), // 정답의 인덱스 추가
    }));
  } catch (error) {
    console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
    throw error; // 오류를 다시 던짐
  }
};

export const saveQuizAnswer = async ({ userId, totalCorrect }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/quizzes/answer`,
      { userId, totalCorrect },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("응답 오류 상태:", error.response.status);
      console.error("응답 오류 데이터:", error.response.data);
    } else {
      console.error("네트워크 또는 기타 오류:", error.message);
    }
    throw error;  // 오류가 발생한 경우 필요한 로직에 따라 다시 던질 수 있음
  }
};

// 사용자 회원가입 API 호출
export const registerUser = async ({ username, name, password }) => {
  const response = await fetch("http://localhost:8080/members/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, name }),
  });

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }
  return response.json();
};

// 사용자 로그인 API 호출
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/members/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // 성공적으로 로그인한 경우 응답 데이터 반환
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error; // 오류를 다시 던짐
  }
};
