import styles from "./InfoGridItem.module.css";

interface InfoGridItemProps {
  name: string;
  value: string;
}

export function InfoGridItem({ name, value }: InfoGridItemProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.name} font-r-sm`}>{name}</div>
      <div className="font-b-sm">{value}</div>
    </div>
  );
}
