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
  process: number;
}

export function ProgressBar({ process }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles["progress-bar"]}>
        <div className={styles["progress-bar-background"]} />
        <div
          className={styles["progress-bar-foreground"]}
          style={{ width: `${Math.max(process, 0) * 25}%` }}
        />
        <div
          className={styles["car-pin"]}
          style={{ left: `calc(${Math.max(process, 0) * 25}% - 10px)` }}
        >
          <img src={CarSideIcon} alt="CarSide" />
        </div>

        <div className={styles["process-box"]}>
          {processes.map((processStr, i) => (
            <span
              className={`${styles.process} ${
                i === process ? "font-b-sm color-primary" : "font-r-xs"
              }`}
              style={{ left: `${i * 25}%` }}
              key={i}
            >
              {processStr}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
