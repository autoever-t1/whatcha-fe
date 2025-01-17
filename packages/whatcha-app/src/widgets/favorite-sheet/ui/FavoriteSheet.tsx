import { RangeInput } from "@shared/range-input";
import styles from "./FavoriteSheet.module.css";
import { useCallback, useState } from "react";
import { updateBudget, updatePreference } from "@/entities/user";
import { models } from "@/entities/used-car";
import { FavoriteItem } from "./FavoriteItem";

interface FavoriteSheetProps {
  onClose: () => void;
}

export function FavoriteSheet({ onClose }: FavoriteSheetProps) {
  const [phase, setPhase] = useState(0);
  const [priceMin, setPriceMin] = useState("1000");
  const [priceMax, setPriceMax] = useState("10000");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleChangePriceMin = useCallback((value: string) => {
    setPriceMin(value);
  }, []);

  const handleChangePriceMax = useCallback((value: string) => {
    setPriceMax(value);
  }, []);

  const handleClickModel = useCallback(
    (modelName: string) => {
      const contains = selectedModels.find((model) => model === modelName);

      if (contains) {
        setSelectedModels((prev) =>
          prev.filter((model) => model !== modelName)
        );
      } else {
        if (selectedModels.length >= 3) return;

        setSelectedModels((prev) => [...prev, modelName]);
      }
    },
    [selectedModels]
  );

  const submitBudget = useCallback(async () => {
    const min = parseInt(priceMin);
    const max = parseInt(priceMax);

    if (isNaN(min) || isNaN(max)) return;

    await updateBudget(min, max);
    //TODO SharedPrefrence
    setPhase(1);
  }, [priceMin, priceMax]);

  const submitPreferences = useCallback(async () => {
    if (selectedModels.length < 3) return;
    await updatePreference(selectedModels);

    //TODO SharedPrefrence
    onClose();
  }, [selectedModels, onClose]);

  const handleClickNext = useCallback(() => {
    if (phase === 1 && selectedModels.length < 3) return;

    if (phase === 0) submitBudget();
    else submitPreferences();
  }, [phase, submitBudget, submitPreferences]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.question} font-h4`}>
          {phase === 0 ? (
            <>
              만약 차를 산다면
              <br />
              <span className={styles.strong}>예산</span>은 어느 정도인가요?
            </>
          ) : (
            <>
              선호하는 모델을 선택해주세요
              <br />{" "}
              <span
                className={styles.strong}
              >{`( ${selectedModels.length} / 3 )`}</span>{" "}
            </>
          )}
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
                <FavoriteItem
                  key={i}
                  model={model}
                  selected={Boolean(
                    selectedModels.find((m) => m === model.modelName)
                  )}
                  onClick={() => handleClickModel(model.modelName)}
                />
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
