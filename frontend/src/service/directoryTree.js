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
    const tokenString = sessionStorage.getItem('accessToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const encodedPath = encodeURIComponent(data);
    const response = await fetch(`http://localhost:5050/api/execution/content-file?path=${encodedPath}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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

export const downloadFile = async (filePath) => {
  try {
    const tokenString = sessionStorage.getItem('accessToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const encodedPath = encodeURIComponent(filePath);
    const response = await fetch(`http://localhost:5050/api/execution/download-file?filePath=${encodedPath}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentDisposition = response.headers.get('content-disposition');
    let filename = 'downloaded-file';

    console.log(contentDisposition);

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1].replace(/['"]/g, ''));
      }
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Error downloading file:', error);
    return error.message;
  }
};
