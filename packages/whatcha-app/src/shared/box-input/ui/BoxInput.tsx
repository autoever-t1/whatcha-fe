import styles from "./BoxInput.module.css";

interface BoxInputProps {
  value: string;
  unit: string;
}

export function BoxInput({ value, unit }: BoxInputProps) {
  return (
    <div className={styles.container}>
      <input type="number" value={value} className="font-r-sm" />
      <span className={`${styles.unit} font-r-sm`}>{unit}</span>
    </div>
  );
}
