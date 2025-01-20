import styles from "./MyPage.module.css";
import ArrowRightCircleIcon from "@common/assets/icons/arrow-right-circle.svg";
import { MenuItem } from "./MenuItem";
import BellRingingIcon from "@common/assets/icons/bell-ringing.svg";
import CarIcon from "@common/assets/icons/car.svg";
import CouponIcon from "@common/assets/icons/coupon.svg";
import LogoutIcon from "@common/assets/icons/logout.svg";
import OrderIcon from "@common/assets/icons/order.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export function MyPage() {
  const navigate = useNavigate();

  const handleClickFavorite = useCallback(() => {
    navigate("/mypage/favorite");
  }, [navigate]);

  const handleClickLike = useCallback(() => {
    navigate("/list?type=like");
  }, [navigate]);

  const handleClickCoupon = useCallback(() => {
    navigate("/mypage/coupon");
  }, [navigate]);

  const handleClickAlarm = useCallback(() => {
    navigate("/mypage/alarm");
  }, [navigate]);

  const handleClickOrder = useCallback(() => {
    navigate("/mypage/orders");
  }, [navigate]);

  const handleClickLogout = useCallback(() => {
    if (window.AndroidInterface) {
      window.AndroidInterface.clearAllDataAndRedirect();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["name-box"]}>
        <span className="font-b-lg">{sessionStorage.getItem("name")}</span>{" "}
        <span className="font-r-lg">고객님</span>
      </div>
      <div className={styles["favorite-box"]}>
        <button
          className={`${styles["favorite-button"]} font-b-md`}
          onClick={handleClickFavorite}
        >
          선호 매물
          <img src={ArrowRightCircleIcon} alt="arrowRightCircle" />
        </button>
        <div className={styles["favorite-item"]}>
          <p className="font-b-sm">모델</p>
          <p className="font-r-sm">
            {sessionStorage.getItem("pm1")} {sessionStorage.getItem("pm2")}{" "}
            {sessionStorage.getItem("pm3")}
          </p>
        </div>
        <div className={styles["favorite-item"]}>
          <p className="font-b-sm">예산</p>
          <p className="font-r-sm">
            {(
              parseInt(sessionStorage.getItem("bmin")!) / 10000
            ).toLocaleString()}
            만원 ~{" "}
            {(
              parseInt(sessionStorage.getItem("bmax")!) / 10000
            ).toLocaleString()}
            만원
          </p>
        </div>
      </div>
      <div className={styles["menu-box-wrapper"]}>
        <div className={styles["menu-box"]}>
          <MenuItem icon={CarIcon} onClick={handleClickLike}>
            찜한 매물
          </MenuItem>
          <MenuItem icon={CouponIcon} onClick={handleClickCoupon}>
            쿠폰함
          </MenuItem>
          <MenuItem icon={BellRingingIcon} onClick={handleClickAlarm}>
            입고 알림 신청 내역
          </MenuItem>
          <MenuItem icon={OrderIcon} onClick={handleClickOrder}>
            주문 조회
          </MenuItem>
          <MenuItem icon={LogoutIcon} onClick={handleClickLogout}>
            로그아웃
          </MenuItem>
        </div>
      </div>
    </div>
  );
}
