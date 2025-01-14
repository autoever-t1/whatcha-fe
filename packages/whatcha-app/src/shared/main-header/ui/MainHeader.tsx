import styles from "./MainHeader.module.css";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";

interface MainHeaderProps {
  title: string;
}

export function MainHeader({ title }: MainHeaderProps) {
  return (
    <div className={styles.container}>
      <button className={styles["icon-button"]}>
        <img src={ArrowBackIcon} alt="Back" />
      </button>
      <div className={`${styles.title} font-r-lg`}>{title}</div>
    </div>
  );
}
