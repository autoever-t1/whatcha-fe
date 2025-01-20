import styles from "./BoxInput.module.css";

interface BoxInputProps {
  value: string;
  onChange: (value: string) => void;
  unit: string;
  dark?: boolean;
}

export function BoxInput({ value, onChange, unit, dark }: BoxInputProps) {
  return (
    <div className={`${styles.container} ${dark ? styles.dark : ""}`}>
      <input
        type="number"
        value={value}
        className="font-r-sm"
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={`${styles.unit} font-r-sm`}>{unit}</span>
    </div>
  );
}
