import styles from "./MainHeader.module.css";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";

interface MainHeaderProps {
  title: string;
}

export function MainHeader({ title }: MainHeaderProps) {
  return (
    <div className={`${styles.container} font-r-lg`}>
      <button className={styles["icon-button"]}>
        <img src={ArrowBackIcon} alt="Back" />
      </button>
      {title}
    </div>
  );
}
