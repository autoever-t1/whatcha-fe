import { useCallback } from "react";
import styles from "./SmallCarItem.module.css";
import { useNavigate } from "react-router";
import { UsedCarSmallListDto } from "@/entities/used-car";

interface SmallCarItemProps {
  car: UsedCarSmallListDto;
  color?: "default" | "primary";
}

export function SmallCarItem({ car, color = "default" }: SmallCarItemProps) {
  const {
    usedCarId,
    mainImage,
    modelName,
    registrationDate,
    mileage,
    vhclRegNo,
    price,
  } = car;

  console.log(mainImage);

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/car/${usedCarId}`);
  }, [usedCarId, navigate]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles["img-wrapper"]}>
        <img src={mainImage} alt="car" />
      </div>
      <div className={styles.info}>
        <p
          className={`${styles.name} ${
            color === "primary" ? styles.primary : ""
          } font-b-sm`}
        >
          {modelName}
        </p>
        <p
          className={`${styles["sub-info"]} ${
            color === "primary" ? styles.primary : ""
          } font-r-xs`}
        >
          {registrationDate} | {`${mileage.toLocaleString()}km`} | {vhclRegNo}
        </p>
        <p
          className={`${styles.price} ${
            color === "primary" ? styles.primary : ""
          } font-b-sm`}
        >{`${(price / 10000).toLocaleString()}만원`}</p>
      </div>
    </div>
  );
}
