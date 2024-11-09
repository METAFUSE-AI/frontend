// api.js

import axios from "axios";

//BASE_URL = "http://localhost:8080";

BASE_URL = "http:10.106.3.58:8080";

// Test 관련 API 호출
export const createTest = (testData) => {
  return axios
    .post(`${BASE_URL}/tests/create`, testData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
};

export const instance = axios.create({
  headers: {
    // 불필요한 헤더가 있으면 여기에서 제거합니다.
    "X-React-Native-Project-Root": undefined,
  },
});

// Record 관련 API 호출

// 기록 생성
export const createRecord = (recordData) => {
  return axios
    .post(`${BASE_URL}/records`, recordData, {
      // /create 제거
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating record:", error);
      throw error;
    });
};

// 기록 목록 조회
export const fetchRecords = () => {
  return axios
    .get(`${BASE_URL}/records`) // /records URL로 GET 요청
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching records:", error);
      throw error;
    });
};

// 기록 조회
export const getRecordById = (id) => {
  return axios
    .get(`${BASE_URL}/records/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching record:", error);
      throw error;
    });
};

// 기록 업데이트
export const updateRecord = (id, recordData) => {
  return axios
    .put(`${BASE_URL}/records/${id}`, recordData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating record:", error);
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
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete record");
    }
  } catch (error) {
    // 에러 발생 시 상세 에러 메시지 로그
    console.error(
      "Error deleting record:",
      error.response ? error.response.data : error.message
    );
    throw error; // 에러를 호출한 쪽으로 다시 던짐
  }
};

// 기록응원 관련 API 호출
export const fetchEncouragementMessage = async () => {
  try {
    const response = await fetch("http://10.106.3.58:5000/encouragement"); // Flask 서버 주소
    if (!response.ok) {
      throw new Error("Failed to fetch encouragement message");
    }
    const data = await response.json();
    return data.message; // 백엔드에서 반환된 응원 메시지를 반환
  } catch (error) {
    console.error("Error fetching encouragement message:", error);
    return null; // 오류 발생 시 null 반환
  }
};

// 회원가입 API 호출
export const registerUser = async ({ username, name, password }) => {
  const response = await fetch(`${BASE_URL}/members/register`, {
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

// 로그인 API 호출
export const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/members/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return await response.json(); // 로그인 성공 시 응답 데이터 반환
  } catch (error) {
    throw new Error(error.message); // 에러 메시지 반환
  }
};

export async function checkUsername(username) {
  try {
    const response = await fetch(
      `${BASE_URL}/members/check?username=${username}`
    );

    if (response.ok) {
      const exists = await response.json();
      return exists;
    } else {
      throw new Error("서버 오류입니다.");
    }
  } catch (error) {
    throw new Error("오류 발생: " + error.message);
  }
}
