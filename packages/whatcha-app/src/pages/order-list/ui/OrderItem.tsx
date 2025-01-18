import { useNavigate } from "react-router";
import styles from "./OrderItem.module.css";
import { useCallback } from "react";
import { OrderListItemDTO } from "@/features/order";

const processMessages: string[] = [
  "",
  "잔금 결제 전",
  "계약서 작성 중",
  "수령 방법 선택 중",
  "주문 완료",
];

interface OrderItemProps {
  order: OrderListItemDTO;
}

export function OrderItem({ order }: OrderItemProps) {
  const { orderId, modelName, process, orderDate, mainImage } = order;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/order/${orderId}`);
  }, [orderId, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content} onClick={handleClick}>
        <div className={styles["img-wrapper"]}>
          <img src={mainImage} alt="CarImg" />
        </div>
        <div className={styles.info}>
          <p className="font-b-md">{modelName}</p>
          <p className="font-b-md color-primary">{processMessages[process]}</p>
          <p className="font-r-sm color-gray-600">{orderDate}</p>
        </div>
      </div>
    </div>
  );
}
