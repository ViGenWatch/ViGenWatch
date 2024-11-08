import axios from './axios';

export const getListReferens = async () => {
  try {
    const response = await axios.get(`/api/reference/getlist/`);
    return response;
  } catch (error) {
    return error.message;
  }
};
