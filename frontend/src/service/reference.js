import axios from './axios';

export const getListReferens = async (data) => {
  try {
    const response = await axios.get(`/api/reference/getlist/${data}`);
    return response;
  } catch (error) {
    return error.message;
  }
};
