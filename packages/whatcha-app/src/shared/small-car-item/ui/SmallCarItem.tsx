import { useCallback } from "react";
import styles from "./SmallCarItem.module.css";
import { useNavigate } from "react-router";

interface Car {
  carId: number;
  img: string;
  name: string;
  date: string;
  mileage: number;
  vhclRegNo: string;
  price: number;
}

interface SmallCarItemProps {
  car: Car;
  color?: "default" | "primary";
}

export function SmallCarItem({ car, color = "default" }: SmallCarItemProps) {
  const { carId, img, name, date, mileage, vhclRegNo, price } = car;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/car/${carId}`);
  }, [carId, navigate]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles["img-wrapper"]}>
        <img src={img} alt="car" />
      </div>
      <div className={styles.info}>
        <p
          className={`${styles.name} ${
            color === "primary" ? styles.primary : ""
          } font-b-sm`}
        >
          {name}
        </p>
        <p
          className={`${styles["sub-info"]} ${
            color === "primary" ? styles.primary : ""
          } font-r-xs`}
        >
          {date} | {`${mileage.toLocaleString()}km`} | {vhclRegNo}
        </p>
        <p
          className={`${styles.price} ${
            color === "primary" ? styles.primary : ""
          } font-b-sm`}
        >{`${(price / 1000).toLocaleString()}만원`}</p>
      </div>
    </div>
  );
}
