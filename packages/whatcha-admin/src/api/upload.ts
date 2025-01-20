import client from './client';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('images', file);  

  const response = await client.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};