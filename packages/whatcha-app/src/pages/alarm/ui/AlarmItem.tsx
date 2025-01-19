import { AlarmListItemDTO } from "@/features/alarm";
import styles from "./AlarmItem.module.css";
import CloseIcon from "@common/assets/icons/close.svg";

interface AlarmItemProps {
  alarm: AlarmListItemDTO;
}

export function AlarmItem({ alarm }: AlarmItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className="font-b-md">{alarm.modelName}</p>
        <p className="font-r-sm color-gray-400">
          ~ {alarm.alertExpirationDate}
        </p>
        <button className={styles["icon-button"]}>
          <img src={CloseIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
}
