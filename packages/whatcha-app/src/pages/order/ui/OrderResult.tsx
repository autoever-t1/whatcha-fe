import styles from "./OrderResult.module.css";

export function OrderResult() {
  return (
    <div className={styles.container}>
      <div className={`${styles.message} font-h2`}>
        <span className="color-primary">주문완료</span> 되었습니다.
      </div>
    </div>
  );
}
