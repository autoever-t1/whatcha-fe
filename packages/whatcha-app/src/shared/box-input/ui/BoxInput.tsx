import styles from "./BoxInput.module.css";

interface BoxInputProps {
  value: string;
  unit: string;
  dark?: boolean;
}

export function BoxInput({ value, unit, dark }: BoxInputProps) {
  return (
    <div className={`${styles.container} ${dark ? styles.dark : ""}`}>
      <input type="number" value={value} className="font-r-sm" />
      <span className={`${styles.unit} font-r-sm`}>{unit}</span>
    </div>
  );
}
