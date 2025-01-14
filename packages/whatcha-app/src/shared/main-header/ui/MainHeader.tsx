import styles from "./MainHeader.module.css";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";

interface MainHeaderProps {
  title: string;
  onClickBack?: () => void;
}

export function MainHeader({ title, onClickBack }: MainHeaderProps) {
  return (
    <div className={`${styles.container} font-r-lg`}>
      <button className={styles["icon-button"]} onClick={onClickBack}>
        <img src={ArrowBackIcon} alt="Back" />
      </button>
      {title}
    </div>
  );
}
