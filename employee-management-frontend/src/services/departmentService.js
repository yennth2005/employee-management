import axios from 'axios';

const API_URL = 'http://localhost:8000/api/departments';

export const getDepartments = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng ban:', error);
    throw error;
  }
};
