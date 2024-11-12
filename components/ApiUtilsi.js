
import axios from "axios";
const BASE_URL = 'http://localhost:8080'; // 서버 주소
//const BASE_URL = 'http://172.30.1.36:8080'; // 서버 주소
//const BASE_URL = 'http://10.105.0.201:8080'; // 서버 주소
export const createTest = async (testData) => {
  const response = await fetch(`${BASE_URL}/tests/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  });

  if (!response.ok) {
    throw new Error('Error creating test');
  }

  return await response.json();
};

// Record 관련 API 호출

// 기록 생성
export const createRecord = async (recordData) => {
  const response = await fetch(`${BASE_URL}/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recordData),
  });

  if (!response.ok) {
    throw new Error('Error creating record');
  }

  return await response.json();
};

// 특정 사용자의 기록 목록 조회
export const fetchRecords = async (username) => {
  const response = await fetch(`${BASE_URL}/records/member/${username}`);

  if (!response.ok) {
    throw new Error('Error fetching records');
  }

  return await response.json();
};

// 특정 사용자의 기록 ID로 조회
export const getRecordById = async (recordId) => {
  const response = await fetch(`${BASE_URL}/records/${recordId}`);

  if (!response.ok) {
    throw new Error('No record found for the provided ID');
  }

  return await response.json();
};

// 기록 업데이트
export const updateRecord = async (recordId, updatedData) => {
  const response = await fetch(`${BASE_URL}/records/${recordId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Error updating record');
  }

  return await response.json();
};

// 기록 삭제
export const deleteRecord = async (recordId) => {
  const response = await fetch(`${BASE_URL}/records/${recordId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting record');
  }

  return await response.json();
};

// 랜덤 퀴즈 가져오기
export const fetchRandomQuizzes = async (limit) => {
  try {
    const response = await fetch(`${BASE_URL}/quizzes/random?count=${limit}`);

    if (!response.ok) {
      throw new Error('Error fetching random quizzes');
    }

    const data = await response.json();
    return data.map(quiz => ({
      id: quiz.id,
      question: quiz.question,
      options: quiz.options.split(','), // 옵션을 배열로 변환
      answer: quiz.answer,
      answerIndex: quiz.options.split(',').indexOf(quiz.answer), // 정답의 인덱스 추가
    }));
  } catch (error) {
    console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 퀴즈 응답 저장
export const saveQuizAnswer = async ({ userId, totalCorrect }) => {
  try {
    const response = await fetch(`${BASE_URL}/quizzes/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, totalCorrect }),
    });

    if (!response.ok) {
      throw new Error('Error saving quiz answer');
    }

    return await response.json();
  } catch (error) {
    console.error('퀴즈 응답 저장 중 오류 발생:', error);
    throw error;
  }
};

// 사용자 회원가입 API 호출
export const registerUser = async ({ username, name, password }) => {
  const response = await fetch(`${BASE_URL}/members/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, name }),
  });

  if (!response.ok) {
    throw new Error('회원가입 실패');
  }

  return await response.json();
};

// 사용자 로그인 API 호출
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/members/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('로그인 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error;
  }
};

// 처음에 배열로 테스트 결과를 받아오는 함수
// 테스트 결과를 username으로 받아오는 함수
export const getTestResultsByUsername = async (username) => {
  const apiUrl = `${BASE_URL}/tests/${username}`; // memberId 대신 username 사용

  try {
    const response = await axios.get(apiUrl);
    return response.data; // 테스트 결과 배열 반환
  } catch (error) {
    console.error("Failed to fetch test results:", error);
    throw error; // 에러 던지기
  }
};

export const fetchTestScores = async (testId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tests/${testId}/scores`);
    return response.data;
  } catch (error) {
    console.error("Error fetching score summary:", error);
    throw error;  // 오류 발생 시 다시 던져서 상위에서 처리하도록 함
  }
};



