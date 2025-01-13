import { BoxInput } from "@shared/box-input";
import styles from "./RangeInput.module.css";

interface RangeInputItem {
  value: string;
  unit: string;
  suffix: string;
}

interface RangeInputProps {
  from: RangeInputItem;
  to: RangeInputItem;
}

export function RangeInput({ from, to }: RangeInputProps) {
  return (
    <>
      <div className={styles.container}>
        <BoxInput value={from.value} unit={from.unit} />
        <div className={`${styles.suffix} font-r-sm`}>{from.suffix}</div>
      </div>
      <div className={styles.container}>
        <BoxInput value={to.value} unit={to.unit} />
        <div className={`${styles.suffix} font-r-sm`}>{to.suffix}</div>
      </div>
    </>
  );
}
