import { useUploadImage } from '../../hooks/useUpload';
import { useState } from 'react';

interface MainImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function MainImageUpload({ onImageUpload }: MainImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: uploadImage, isPending } = useUploadImage();
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  
    const formData = new FormData();
    formData.append('images', file); 

    uploadImage(file, {
      onSuccess: (imageUrl) => {
        onImageUpload(imageUrl);
      },
      onError: (error) => {
        console.error('이미지 업로드 실패:', error);
        setErrorMessage('이미지 업로드에 실패했습니다.');
        URL.revokeObjectURL(previewUrl);
        setPreview(null); 
      }
    });
  };

  return (
    <div className="space-y-2" onClick={(e) => e.preventDefault()}>
    <div className="flex flex-col items-center gap-4">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="object-cover h-48 rounded-lg w-70"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
    <label className="inline-block cursor-pointer"
    onClick={(e) => e.stopPropagation()}>
      <div 
        className="px-2 py-2 text-sm font-medium bg-gray-600 rounded-md text-gray-50 hover:bg-gray-700 whitespace-nowrap"
      >
        이미지 업로드
      </div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </label>

      {isPending && (
        <p className="text-sm text-center text-gray-500">이미지 업로드 중...</p>
      )}
      {errorMessage && (
        <p className="text-sm text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}