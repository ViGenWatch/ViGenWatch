import axios from './axios';

export const deleteReferenceFolder = async (referenceId) => {
  try {
    const response = await axios.delete(`/api/reference/delete/${referenceId}`);
    return response;
  } catch (error) {
    return error.message;
  }
};

//role user 0x01
export const getListReferens = async () => {
  try {
    const response = await axios.get(`/api/reference/getlist/`);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const updateReferenceService = async (params) => {
  try {
    const { referenceId, status } = params;
    let data = status ? { require: true } : { status: false };
    const response = await axios.put(`/api/reference/update/${referenceId}`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};

//role user 0x02
export const getListReferensRoleAuthority = async () => {
  try {
    const response = await axios.get(`/api/reference/0x02/getlist/`);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const updateReferenceServiceRoleAuthority = async (params) => {
  try {
    const { referenceId, status, userId } = params;
    let data = userId ? { require: 0, status, userId } : { require: 0, status };
    const response = await axios.put(`/api/reference/0x02/update/${referenceId}`, data);
    return response;
  } catch (error) {
    return error.message;
  }
};

///////////////////////////////////////////

export const getReferenceContentFile = async (referenceId, fileName) => {
  try {
    const tokenString = sessionStorage.getItem('accessToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const response = await fetch(
      `http://localhost:5050/api/reference/content-file?referenceId=${referenceId}&fileName=${fileName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

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

export const downloadFile = async (referenceId, _fileName) => {
  try {
    const tokenString = sessionStorage.getItem('accessToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const response = await fetch(
      `http://localhost:5050/api/reference/download-file?referenceId=${referenceId}&fileName=${_fileName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentDisposition = response.headers.get('content-disposition');
    let filename = 'downloaded-file';

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1].replace(/['"]/g, ''));
      }
    } else {
      filename = _fileName;
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
