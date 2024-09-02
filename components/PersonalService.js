// PersonalService.js
import api from './api';

export const getAllPersonals = async () => {
  try {
    const response = await api.get('/personals');
    return response.data;
  } catch (error) {
    console.error('Error fetching personals:', error);
    throw error;
  }
};

export const createPersonal = async (personal) => {
  try {
    const response = await api.post('/personals', personal);
    return response.data;
  } catch (error) {
    console.error('Error creating personal:', error);
    throw error;
  }
};

// 기타 CRUD 메소드 추가 가능
