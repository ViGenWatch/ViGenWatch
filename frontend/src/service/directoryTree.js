import axios from './axios';
export const getFirstLoadDirTreeService = async (userName) => {
  try {
    const response = await axios.get(`/api/directory/tree/${userName}`);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const getContentFile = async (data) => {
  try {
    const encodedPath = encodeURIComponent(data);
    const response = await fetch(`http://localhost:5050/api/execution/content-file?path=${encodedPath}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get reader from response body');
    }

    const decoder = new TextDecoder('utf-8');
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }

    return result;
  } catch (error) {
    return error.message;
  }
};
