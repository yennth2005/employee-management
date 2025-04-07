// src/services/positionService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error.response?.data || error.message);
    throw error;
  }
};

export const getPositions = async (filterDepartmentId) => {
  try {
    const params = filterDepartmentId ? { department_id: filterDepartmentId } : {};
    const response = await axios.get(`${API_BASE_URL}/positions`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching positions:', error.response?.data || error.message);
    throw error;
  }
};

export const createPosition = async (positionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/positions`, positionData);
    return response.data;
  } catch (error) {
    console.error('Error creating position:', error.response?.data || error.message);
    throw error;
  }
};

export const updatePosition = async (id, positionData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/positions/${id}`, positionData);
    return response.data;
  } catch (error) {
    console.error('Error updating position:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePosition = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/positions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting position:', error.response?.data || error.message);
    throw error;
  }
};

export const importPositionsFromExcel = async (formData) => {
  try {
    await axios.post(`${API_BASE_URL}/positions/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return true;
  } catch (error) {
    console.error('Error importing positions:', error);
    throw error;
  }
};