import styles from "./BasicInfoContent.module.css";
import { Car } from "./CarPage";
import { InfoGridItem } from "./InfoGridItem";

interface BasicInfoContentProps {
  car: Car;
}

export function BasicInfoContent({ car }: BasicInfoContentProps) {
  return (
    <div className={styles.container}>
      <InfoGridItem name="차량등록일" value={car.date} />
      <InfoGridItem
        name="주행거리"
        value={`${car.mileage.toLocaleString()}km`}
      />
      <InfoGridItem name="연료" value={car.fuel} />
      <InfoGridItem
        name="배기량"
        value={`${car.engineCapacity.toLocaleString()}cc`}
      />
      <InfoGridItem name="외관컬러" value={car.exteriorColor} />
      <InfoGridItem name="내장컬러" value={car.interiorColor} />
    </div>
  );
}
