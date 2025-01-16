import { MainHeader } from "@shared/main-header";
import styles from "./OrderListPage.module.css";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { OrderItem } from "./OrderItem";
import GrandeurImg from "@common/assets/grandeur.png";

export function OrderListPage() {
  const navigate = useNavigate();

  const handleClickBackButton = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title="주문 조회" onClickBack={handleClickBackButton} />
      <div className={styles.content}>
        {Array.from({ length: 20 }, (_, i) => i).map((_, i) => (
          <OrderItem
            key={i}
            order={{
              model: "그랜저 하이브리드 르블랑",
              process: 2,
              date: "2025-01-16",
              img: GrandeurImg,
            }}
          />
        ))}
      </div>
    </div>
  );
}
