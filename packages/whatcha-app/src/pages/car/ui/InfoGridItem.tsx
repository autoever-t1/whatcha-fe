import styles from "./InfoGridItem.module.css";

interface InfoGridItemProps {
  name: string;
  value: string;
}

export function InfoGridItem({ name, value }: InfoGridItemProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.name} font-r-md`}>{name}</div>
      <div className="font-b-md">{value}</div>
    </div>
  );
}
