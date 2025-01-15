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
  dark?: boolean;
}

export function RangeInput({ from, to, dark }: RangeInputProps) {
  return (
    <>
      <div className={`${styles.container} ${dark ? styles.dark : ""}`}>
        <BoxInput value={from.value} unit={from.unit} dark={dark} />
        <div className={`${styles.suffix} font-r-sm`}>{from.suffix}</div>
      </div>
      <div className={`${styles.container} ${dark ? styles.dark : ""}`}>
        <BoxInput value={to.value} unit={to.unit} dark={dark} />
        <div className={`${styles.suffix} font-r-sm`}>{to.suffix}</div>
      </div>
    </>
  );
}
