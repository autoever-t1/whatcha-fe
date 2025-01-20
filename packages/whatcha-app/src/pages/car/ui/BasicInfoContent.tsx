import { UsedCarDetailDTO } from "@/entities/used-car";
import styles from "./BasicInfoContent.module.css";
import { InfoGridItem } from "./InfoGridItem";

interface BasicInfoContentProps {
  car: UsedCarDetailDTO;
}

export function BasicInfoContent({ car }: BasicInfoContentProps) {
  return (
    <div className={styles.container}>
      <InfoGridItem name="차량등록일" value={car.registrationDate} />
      <InfoGridItem
        name="주행거리"
        value={`${parseInt(car.mileage).toLocaleString()}km`}
      />
      <InfoGridItem name="연료" value={car.fuelType} />
      <InfoGridItem
        name="배기량"
        value={`${car.engineCapacity.toLocaleString()}cc`}
      />
      <InfoGridItem name="외관컬러" value={car.exteriorColor} />
      <InfoGridItem name="내장컬러" value={car.interiorColor} />
    </div>
  );
}
