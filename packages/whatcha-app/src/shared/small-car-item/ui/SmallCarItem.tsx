import styles from "./SmallCarItem.module.css";

interface Car {
  img: string;
  name: string;
  date: string;
  mileage: number;
  vhclRegNo: string;
  price: number;
}

interface SmallCarItemProps {
  car: Car;
}

export function SmallCarItem({ car }: SmallCarItemProps) {
  const { img, name, date, mileage, vhclRegNo, price } = car;

  return (
    <div className={styles.container}>
      <div className={styles["img-wrapper"]}>
        <img src={img} alt="car" />
      </div>
      <div className={styles.info}>
        <p className={`${styles.name} font-b-sm`}>{name}</p>
        <p className={`${styles["sub-info"]} font-r-xs`}>
          {date} | {`${mileage.toLocaleString()}km`} | {vhclRegNo}
        </p>
        <p className={`${styles.price} font-b-sm`}>{`${(
          price / 1000
        ).toLocaleString()}만원`}</p>
      </div>
    </div>
  );
}
