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

export const logoutFunc = async () => {
  try {
    const response = await axios.get('/api/auth/logout');
    window.location.reload();
    sessionStorage.clear();
    localStorage.clear();
    return response;
  } catch (error) {
    return { success: 0, error: error.message };
  }
};

export const forgotPasswordService = async (data) => {
  try {
    const response = await axios.post('/api/auth/forgot-password', data);
    return response;
  } catch (error) {
    return { success: 0, error: error.message };
  }
};

export const checkTokenResetPasswordService = async (token) => {
  try {
    const response = await axios.get(`/api/auth/reset-password/${token}`);
    return response;
  } catch (error) {
    return { success: 0, error: error.message };
  }
};

export const resetPasswordService = async (data) => {
  try {
    const response = await axios.put(`/api/auth/update-password`, data);
    return response;
  } catch (error) {
    return { success: 0, error: error.message };
  }
};
