import axios from './axios';

export const signInService = async (data) => {
  try {
    const response = await axios.post('/api/auth/login', data);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const signUpService = async (data) => {
  try {
    const response = await axios.post('/api/auth/create', data);
    return response;
  } catch (error) {
    return { success: 0, error: error.message };
  }
};

export const getUserAccount = async (data) => {
  try {
    const response = await axios.post('/api/auth/account', data);
    return response;
  } catch (error) {
    return { success: 0, error: error.message };
  }
};
