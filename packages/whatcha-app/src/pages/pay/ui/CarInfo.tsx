import { UsedCarDetailDTO } from "@/entities/used-car";
import styles from "./CarInfo.module.css";

interface CarInfoProps {
  car: UsedCarDetailDTO;
}

export function CarInfo({ car }: CarInfoProps) {
  const { mainImage, modelName, registrationDate, mileage, price } = car;
  return (
    <div className={styles.container}>
      <div className={styles["img-wrapper"]}>
        <img src={mainImage} alt="Img" />
      </div>
      <div className={styles.info}>
        <p className="font-r-sm">{modelName}</p>
        <p className="font-r-sm color-gray-400">
          {registrationDate} {parseInt(mileage).toLocaleString()}km
        </p>
        <p className="font-b-md">{(price / 10000).toLocaleString()}만원</p>
      </div>
    </div>
  );
}
