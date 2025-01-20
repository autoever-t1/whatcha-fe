import { MainHeader } from "@shared/main-header";
import styles from "./OrderListPage.module.css";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";
import { getOrderList, OrderListItemDTO } from "@/features/order";

export function OrderListPage() {
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState<OrderListItemDTO[]>([]);

  const getOrders = useCallback(async () => {
    const response = await getOrderList();

    setOrderList(response);
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleClickBackButton = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title="주문 조회" onClickBack={handleClickBackButton} />
      <div className={styles.content}>
        {orderList.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
}
