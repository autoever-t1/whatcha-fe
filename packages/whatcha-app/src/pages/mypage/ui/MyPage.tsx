import { MainHeader } from "@shared/main-header";
import styles from "./MyPage.module.css";
import ArrowRightCircleIcon from "@common/assets/icons/arrow-right-circle.svg";
import { MenuItem } from "./MenuItem";
import BellRingingIcon from "@common/assets/icons/bell-ringing.svg";
import CarIcon from "@common/assets/icons/car.svg";
import CouponIcon from "@common/assets/icons/coupon.svg";
import LogoutIcon from "@common/assets/icons/logout.svg";
import OrderIcon from "@common/assets/icons/order.svg";

export function MyPage() {
  return (
    <div className={styles.container}>
      <div className={styles["name-box"]}>
        <span className="font-b-lg">김길동</span>{" "}
        <span className="font-r-lg">고객님</span>
      </div>
      <div className={styles["favorite-box"]}>
        <button className={`${styles["favorite-button"]} font-b-md`}>
          선호 매물
          <img src={ArrowRightCircleIcon} alt="arrowRightCircle" />
        </button>
        <div className={styles["favorite-item"]}>
          <p className="font-b-sm">모델</p>
          <p className="font-r-sm">그랜저 쏘나타 펠리세이드</p>
        </div>
        <div className={styles["favorite-item"]}>
          <p className="font-b-sm">예산</p>
          <p className="font-r-sm">1,000만원 ~ 3,000만원</p>
        </div>
      </div>
      <div className={styles["menu-box-wrapper"]}>
        <div className={styles["menu-box"]}>
          <MenuItem icon={CarIcon}>찜한 매물</MenuItem>
          <MenuItem icon={CouponIcon}>쿠폰함</MenuItem>
          <MenuItem icon={BellRingingIcon}>입고 알림 신청 내역</MenuItem>
          <MenuItem icon={OrderIcon}>주문 조회</MenuItem>
          <MenuItem icon={LogoutIcon}>로그아웃</MenuItem>
        </div>
      </div>
    </div>
  );
}
