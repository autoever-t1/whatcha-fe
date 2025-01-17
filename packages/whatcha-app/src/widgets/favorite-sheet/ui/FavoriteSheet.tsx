import { RangeInput } from "@shared/range-input";
import styles from "./FavoriteSheet.module.css";
import { useCallback, useState } from "react";
import { updateBudget } from "@/entities/user";
import { models } from "@/entities/used-car";

interface FavoriteSheetProps {
  onClose: () => void;
}

export function FavoriteSheet({ onClose }: FavoriteSheetProps) {
  const [phase, setPhase] = useState(0);
  const [priceMin, setPriceMin] = useState("1000");
  const [priceMax, setPriceMax] = useState("10000");

  const handleChangePriceMin = useCallback((value: string) => {
    setPriceMin(value);
  }, []);

  const handleChangePriceMax = useCallback((value: string) => {
    setPriceMax(value);
  }, []);

  const submitBudget = useCallback(async () => {
    const min = parseInt(priceMin);
    const max = parseInt(priceMax);

    if (isNaN(min) || isNaN(max)) return;

    await updateBudget(min, max);
    setPhase(1);
  }, [priceMin, priceMax]);

  const handleClickNext = useCallback(() => {
    if (phase === 0) submitBudget();
    else onClose();
  }, [phase, onClose]);

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
                from={{
                  value: String(priceMin),
                  onChange: handleChangePriceMin,
                  unit: "만원",
                  suffix: "부터",
                }}
                to={{
                  value: String(priceMax),
                  onChange: handleChangePriceMax,
                  unit: "만원",
                  suffix: "까지",
                }}
                dark
              />
            </div>
          ) : (
            <div className={styles.grid}>
              {models.map((model, i) => (
                <div key={i} className={styles["car-item"]}>
                  <img src={model.img} alt="car" />
                </div>
              ))}
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
