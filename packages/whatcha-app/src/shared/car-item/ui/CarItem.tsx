import styles from "./CarItem.module.css";
import LikeIcon from "@common/assets/icons/like.svg";
import LikeFilledIcon from "@common/assets/icons/like-filled.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { UsedCarListDto } from "@/entities/used-car";

interface CarItemProps {
  car: UsedCarListDto;
  onClickLike: () => void;
}

export function CarItem({ car, onClickLike }: CarItemProps) {
  const {
    usedCarId,
    mainImage,
    modelName,
    registrationDate,
    mileage,
    vhclRegNo,
    price,
    likeCount,
    isLiked,
  } = car;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/car/${usedCarId}`);
  }, [navigate, usedCarId]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles["img-wrapper"]}>
        <img src={mainImage} alt="car" />
      </div>
      <div className={styles.info}>
        <p className="font-b-md">{modelName}</p>
        <p
          className="font-r-sm"
          style={{ color: "var(--color-gray-600)" }}
        >{`${registrationDate} | ${parseInt(
          mileage
        ).toLocaleString()}km | ${vhclRegNo}`}</p>
        <div className="layout-line">
          <p className="font-b-lg">{(price / 10000).toLocaleString()}만원</p>
          <button
            className={styles["like-button"]}
            onClick={(e) => {
              e.stopPropagation();
              onClickLike();
            }}
          >
            <div className={styles["icon-wrapper"]}>
              <img src={isLiked ? LikeFilledIcon : LikeIcon} alt="like" />
            </div>
            {likeCount}
          </button>
        </div>
      </div>
    </div>
  );
}
