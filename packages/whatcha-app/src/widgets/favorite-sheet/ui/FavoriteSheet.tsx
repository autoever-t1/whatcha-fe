import { RangeInput } from "@shared/range-input";
import styles from "./FavoriteSheet.module.css";
import { useCallback, useState } from "react";
import GrandeurImg from "@common/assets/grandeur.png";

export function FavoriteSheet() {
  const [phase, setPhase] = useState(0);

  const handleClickNext = useCallback(() => {
    setPhase((prev) => (prev === 1 ? 0 : 1));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.question} font-h4`}>
          만약 차를 산다면
          <br />
          <span className={styles.strong}>예산</span>은 어느 정도인가요?
        </div>
        <div className={styles.content}>
          {phase === 0 ? (
            <div className="layout-vertical">
              <RangeInput
                from={{ value: "1000", unit: "만원", suffix: "부터" }}
                to={{ value: "1000", unit: "만원", suffix: "까지" }}
                dark
              />
            </div>
          ) : (
            <div className={styles.grid}>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
              <div className={styles["car-item"]}>
                <img src={GrandeurImg} alt="car" />
              </div>
            </div>
          )}
        </div>
        <button className="font-r-md" onClick={handleClickNext}>
          다음
        </button>
      </div>
    </div>
  );
}
