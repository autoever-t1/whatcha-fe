import { UsedCarSmallListDto } from "@/entities/used-car";
import styles from "./OrderResult.module.css";
import { SmallCarItem } from "@/shared/small-car-item";

interface OrderResultProps {
  usedCar: UsedCarSmallListDto;
}

export function OrderResult({ usedCar }: OrderResultProps) {
  console.log(usedCar);
  return (
    <div className={styles.container}>
      <div className={`${styles.message} font-h2`}>
        <span className="color-primary">주문완료</span> 되었습니다.
      </div>
      <SmallCarItem car={usedCar} />
    </div>
  );
}
