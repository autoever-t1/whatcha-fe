import styles from "./AlarmItem.module.css";
import CloseIcon from "@common/assets/icons/close.svg";

interface Alarm {
  model: string;
  expireDate: string;
}

interface AlarmItemProps {
  alarm: Alarm;
}

export function AlarmItem({ alarm }: AlarmItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className="font-b-md">{alarm.model}</p>
        <p className="font-r-sm color-gray-400">~ {alarm.expireDate}</p>
        <button className={styles["icon-button"]}>
          <img src={CloseIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
}
