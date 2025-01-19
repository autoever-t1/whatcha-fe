import { MainHeader } from "@shared/main-header";
import styles from "./FavoritePage.module.css";
import { ContentBox } from "@shared/content-box";
import { BadgeButton } from "@shared/badge-button";
import { RangeInput } from "@shared/range-input";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BottomButton } from "@/shared/bottom-button";
import { models } from "@/entities/used-car";
import { updateBudget, updatePreference } from "@/entities/user";

export function FavoritePage() {
  const navigate = useNavigate();

  const [selectedModels, setSelectedModels] = useState<string[]>(() => {
    const prefer1 = sessionStorage.getItem("pm1");
    const prefer2 = sessionStorage.getItem("pm2");
    const prefer3 = sessionStorage.getItem("pm3");

    if (prefer1 && prefer2 && prefer3) return [prefer1, prefer2, prefer3];
    return [];
  });
  const [budgetMin, setBudgetMin] = useState<string>(
    sessionStorage.getItem("bmin") || ""
  );
  const [budgetMax, setBudgetMax] = useState<string>(
    sessionStorage.getItem("bmax") || ""
  );

  const budgetMinInt = useMemo(() => {
    return isNaN(parseInt(budgetMin)) ? 0 : parseInt(budgetMin);
  }, [budgetMin]);

  const budgetMaxInt = useMemo(() => {
    return isNaN(parseInt(budgetMax)) ? 0 : parseInt(budgetMax);
  }, [budgetMax]);

  const canUpdate = useMemo(() => {
    return (
      selectedModels.length === 3 &&
      budgetMin.length > 0 &&
      budgetMax.length > 0
    );
  }, [selectedModels, budgetMax, budgetMin]);

  const handleChangeBudgetMin = useCallback((value: string) => {
    setBudgetMin(
      isNaN(parseInt(value)) ? "0" : String(parseInt(value) * 10000)
    );
  }, []);

  const handleChangeBudgetMax = useCallback((value: string) => {
    setBudgetMax(
      isNaN(parseInt(value)) ? "0" : String(parseInt(value) * 10000)
    );
  }, []);

  const handleClickModel = useCallback(
    (modelName: string) => {
      if (selectedModels.includes(modelName)) {
        setSelectedModels((prev) => prev.filter((m) => m !== modelName));
      } else {
        if (selectedModels.length === 3) return;
        setSelectedModels((prev) => [...prev, modelName]);
      }
    },
    [selectedModels]
  );

  const handleClickBack = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  const handleClickUpdate = useCallback(async () => {
    await updateBudget(budgetMinInt, budgetMaxInt);

    sessionStorage.setItem("bmin", String(budgetMinInt));
    sessionStorage.setItem("bmax", String(budgetMaxInt));

    await updatePreference(selectedModels);

    sessionStorage.setItem("pm1", selectedModels[0]);
    sessionStorage.setItem("pm2", selectedModels[1]);
    sessionStorage.setItem("pm3", selectedModels[2]);
  }, [selectedModels, budgetMinInt, budgetMaxInt]);

  return (
    <div className={styles.container}>
      <MainHeader title="선호 매물 수정" onClickBack={handleClickBack} />
      <div className={styles.content}>
        <ContentBox title={`모델 (${selectedModels.length}/3)`} position="top">
          <div className={styles.grid}>
            {models.map((model, i) => (
              <BadgeButton
                key={i}
                selected={selectedModels.includes(model.modelName)}
                onClick={() => handleClickModel(model.modelName)}
              >
                {model.modelName}
              </BadgeButton>
            ))}
          </div>
        </ContentBox>
        <ContentBox title="예산">
          <RangeInput
            from={{
              value: String(budgetMinInt / 10000),
              onChange: handleChangeBudgetMin,
              unit: "만원",
              suffix: "부터",
            }}
            to={{
              value: String(budgetMaxInt / 10000),
              onChange: handleChangeBudgetMax,
              unit: "만원",
              suffix: "까지",
            }}
          />
        </ContentBox>
      </div>
      <BottomButton disabled={!canUpdate} onClick={handleClickUpdate}>
        수정
      </BottomButton>
    </div>
  );
}
