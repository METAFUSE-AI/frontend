// ApiUtils.js
import axios from "axios";
import { UserContext } from "./UserContext";

const BASE_URL = "http://192.168.0.161:8080"; // base URL 설정

// axios 인스턴스 생성
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Test 관련 API 호출
export const createTest = (testData) => {
  return apiInstance
    .post("/tests/create", testData)
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
export const createRecord = async (recordData) => {
  try {
    const response = await apiInstance.post("/records", recordData);
    return response.data;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

// 기록 목록 조회
export const fetchRecords = () => {
  return apiInstance
    .get("/records")
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
export const fetchEncouragementMessage = async () => {
  try {
    const response = await fetch("http://192.168.0.161:5000/encouragement");
    if (!response.ok) {
      throw new Error("Failed to fetch encouragement message");
    }
    const data = await response.json();
    return data.message;
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
