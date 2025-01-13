import styles from "./MainHeader.module.css";
import LogoImg from "@common/assets/logo.png";
import BellIcon from "@common/assets/icons/bell.svg";

export function MainHeader() {
  return (
    <div className={styles.container}>
      <div className={styles["logo-wrapper"]}>
        <img src={LogoImg} alt="logo" />
      </div>
      <div className={`${styles["page-title"]} font-b-lg`}>차량탐색</div>
      <button className={styles["icon-button"]}>
        <img src={BellIcon} alt="bellIcon" />
      </button>
    </div>
  );
}
