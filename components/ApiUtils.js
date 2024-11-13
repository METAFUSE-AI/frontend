// ApiUtils.js
import axios from "axios";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const BASE_URL = "http://10.106.1.162:8080"; // base URL 설정

// axios 인스턴스 생성
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  headers: {
    // 불필요한 헤더가 있으면 여기에서 제거합니다.
    "X-React-Native-Project-Root": undefined,
  },
});

// Test 관련 API 호출
export const createTest = async (testData) => {
  try {
    const response = await apiInstance.post("/tests/create", testData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating test:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 테스트 결과를 username으로 받아오는 함수
export const getTestResultsByUsername = async (username) => {
  const apiUrl = `/tests/${username}`; // memberId 대신 username 사용

  try {
    const response = await apiInstance.get(apiUrl);
    return response.data; // 테스트 결과 배열 반환
  } catch (error) {
    console.error(
      "Failed to fetch test results:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 테스트 점수 조회
export const fetchTestScores = async (testId) => {
  try {
    const response = await apiInstance.get(`/tests/${testId}/scores`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching score summary:",
      error.response?.data || error.message
    );
    throw error; // 오류 발생 시 다시 던져서 상위에서 처리하도록 함
  }
};

// Record 관련 API 호출
// 기록 생성
export const createRecord = async (recordData) => {
  try {
    const response = await apiInstance.post("/records/create", recordData);
    return response.data;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

export const fetchRecords = (username) => {
  console.log("Fetching records for username:", username);  // username 값 확인
  return apiInstance
    .get(`/records/member/${username}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching records:", error);
      throw error;
    });
};


// 기록 조회
export const getRecordById = (id) => {
  return apiInstance
    .get(`/records/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching record:", error);
      throw error;
    });
};

// 기록 업데이트
export const updateRecord = async (id, recordData) => {
  try {
    const response = await apiInstance.put(`/records/${id}`, recordData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating record:",
      error.response?.data || error.message || error
    );
    throw error;
  }
};

// 기록 삭제
export const deleteRecord = async (id) => {
  try {
    const response = await apiInstance.delete(`/records/${id}`);
    if (response.status === 204) {
      return true;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete record");
    }
  } catch (error) {
    console.error(
      "Error deleting record:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 기록응원 관련 API 호출
export const fetchEncouragementMessage = async (username) => {
  try {
    const response = await axios.get("http://10.106.1.162:5000/encouragement", {
      params: { username: username },
    });

    if (response.data && response.data.message) {
      return response.data.message;
    } else {
      throw new Error("No encouragement message found.");
    }
  } catch (error) {
    console.error("Error fetching encouragement message:", error);
    return null;
  }
};


// 회원가입 API 호출
export const registerUser = async ({ username, name, password }) => {
  try {
    const response = await apiInstance.post("/members/register", {
      username,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "회원가입 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 로그인 API 호출
export const loginUser = async ({ username, password }) => {
  try {
    const response = await apiInstance.post("/members/login", {
      username,
      password,
    });

    if (response.status === 200) {
      const data = response.data;
      const { setUser } = useContext(UserContext);
      setUser({ username: data.username });
      return data;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(
      "로그인 실패:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.message);
  }
};
