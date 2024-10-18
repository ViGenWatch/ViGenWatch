import axios from './axios';
export const getFirstLoadDirTreeService = async (userName) => {
  try {
    const response = await axios.get(`/api/directory/tree/${userName}`);
    return response;
  } catch (error) {
    return error.message;
  }
};
