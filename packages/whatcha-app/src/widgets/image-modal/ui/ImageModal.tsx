import { BaseModal } from "@/shared/base-modal";
import styles from "./ImageModal.module.css";
import { useCallback, useEffect, useState } from "react";
import { getImages, ImageDTO } from "@/entities/used-car";

interface ImageModalProps {
  usedCarId: number;
  onClickBack: () => void;
}

export function ImageModal({ usedCarId, onClickBack }: ImageModalProps) {
  const [images, setImages] = useState<ImageDTO[]>([]);

  const getImageList = useCallback(async (usedCarId: number) => {
    const response = await getImages(usedCarId);

    setImages(response);
  }, []);

  useEffect(() => {
    getImageList(usedCarId);
  }, [getImageList, usedCarId]);

  return (
    <BaseModal title="차량 이미지" onClickBack={onClickBack}>
      <div className={styles.content}>
        {images.map((image, i) => (
          <img src={image.image} alt={`image-${i}`} />
        ))}
      </div>
    </BaseModal>
  );
}
