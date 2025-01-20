import { AlarmListItemDTO } from "@/features/alarm";
import styles from "./AlarmItem.module.css";
import CloseIcon from "@common/assets/icons/close.svg";
import { useMemo } from "react";
import { models } from "@/entities/used-car";

interface AlarmItemProps {
  alarm: AlarmListItemDTO;
  onDelete: () => void;
}

export function AlarmItem({ alarm, onDelete }: AlarmItemProps) {
  const img = useMemo(() => {
    return (
      models.find((model) => alarm.modelName.includes(model.modelName))?.img ||
      ""
    );
  }, [alarm]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles["img-wrapper"]}>
          <img src={img} alt="modelImg" />
        </div>
        <div className={styles["info-wrapper"]}>
          <div className={styles.info}>
            <p className="font-b-md">{alarm.modelName}</p>
            <p className="font-r-sm color-gray-400">
              ~ {alarm.alertExpirationDate}
            </p>
          </div>
          <button className={styles["icon-button"]} onClick={onDelete}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
      </div>
    </div>
  );
}
