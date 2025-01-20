import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api/upload';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadImage(file),
  });
};