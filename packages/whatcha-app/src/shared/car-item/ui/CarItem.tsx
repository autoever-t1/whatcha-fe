import styles from "./CarItem.module.css";
import LikeIcon from "@common/assets/icons/like.svg";
import LikeFilledIcon from "@common/assets/icons/like-filled.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router";

interface Car {
  carId: number;
  img: string;
  model: string;
  date: string;
  mileage: number;
  vhclRegNo: string;
  price: number;
  likeCount: number;
}

interface CarItemProps {
  car: Car;
  liked: boolean;
}

export function CarItem({ car, liked }: CarItemProps) {
  const { carId, img, model, date, mileage, vhclRegNo, price, likeCount } = car;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/car/${carId}`);
  }, [navigate]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles["img-wrapper"]}>
        <img src={img} alt="car" />
      </div>
      <div className={styles.info}>
        <p className="font-b-md">{model}</p>
        <p
          className="font-r-sm"
          style={{ color: "var(--color-gray-600)" }}
        >{`${date} | ${mileage.toLocaleString()}km | ${vhclRegNo}`}</p>
        <div className="layout-line">
          <p className="font-b-lg">{price.toLocaleString()}만원</p>
          <button className={styles["like-button"]}>
            <div className={styles["icon-wrapper"]}>
              <img src={liked ? LikeFilledIcon : LikeIcon} alt="like" />
            </div>
            {likeCount}
          </button>
        </div>
      </div>
    </div>
  );
}
