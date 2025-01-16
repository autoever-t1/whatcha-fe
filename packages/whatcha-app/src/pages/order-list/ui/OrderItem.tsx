import { useNavigate } from "react-router";
import styles from "./OrderItem.module.css";
import { useCallback } from "react";

const processMessages: string[] = [
  "",
  "잔금 결제 전",
  "계약서 작성 중",
  "수령 방법 선택 중",
  "주문 완료",
];

interface Order {
  orderId: number;
  model: string;
  process: number;
  date: string;
  img: string;
}

interface OrderItemProps {
  order: Order;
}

export function OrderItem({ order }: OrderItemProps) {
  const { orderId, model, process, date, img } = order;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/order/${orderId}`);
  }, [orderId, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content} onClick={handleClick}>
        <div className={styles["img-wrapper"]}>
          <img src={img} alt="CarImg" />
        </div>
        <div className={styles.info}>
          <p className="font-b-md">{model}</p>
          <p className="font-b-lg color-primary">{processMessages[process]}</p>
          <p className="font-r-sm color-gray-600">{date}</p>
        </div>
      </div>
    </div>
  );
}
