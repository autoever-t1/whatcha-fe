import styles from "./CarInfo.module.css";

interface Car {
  img: string;
  model: string;
  date: string;
  mileage: number;
  price: number;
}

interface CarInfoProps {
  car: Car;
}

export function CarInfo({ car }: CarInfoProps) {
  const { img, model, date, mileage, price } = car;
  return (
    <div className={styles.container}>
      <div className={styles["img-wrapper"]}>
        <img src={img} alt="Img" />
      </div>
      <div className={styles.info}>
        <p className="font-r-sm">{model}</p>
        <p className="font-r-sm color-gray-400">
          {date} {mileage.toLocaleString()}km
        </p>
        <p className="font-b-md">{price.toLocaleString()}만원</p>
      </div>
    </div>
  );
}
