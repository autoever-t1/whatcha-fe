import styles from "./ProgressBar.module.css";
import CarSideIcon from "@common/assets/icons/car-side.svg";

const processes = [
  "계약금 결제",
  "잔금 결제",
  "계약서 작성",
  "수령 방법",
  "주문 완료",
];

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles["progress-bar"]}>
        <div className={styles["progress-bar-background"]} />
        <div
          className={styles["progress-bar-foreground"]}
          style={{ width: `${progress * 25}%` }}
        />
        <div
          className={styles["car-pin"]}
          style={{ left: `calc(${progress * 25}% - 10px)` }}
        >
          <img src={CarSideIcon} alt="CarSide" />
        </div>

        <div className={styles["process-box"]}>
          {processes.map((process, i) => (
            <span
              className={`${styles.process} ${
                i === progress ? "font-b-sm color-primary" : "font-r-xs"
              }`}
              style={{ left: `${i * 25}%` }}
              key={i}
            >
              {process}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
