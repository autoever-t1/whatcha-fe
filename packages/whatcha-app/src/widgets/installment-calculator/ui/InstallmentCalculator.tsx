import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import styles from "./InstallmentCalculator.module.css";

interface InstallmentCalculatorProps {
  defaultValue: {
    originalAmount: number;
    advanceAmount: number;
    interestRate: number;
    period: number;
  };
}

export function InstallmentCalculator({
  defaultValue,
}: InstallmentCalculatorProps) {
  const [originalAmount, setOriginalAmount] = useState(
    defaultValue.originalAmount
  );
  const [advanceAmount, setAdvanceAmount] = useState(
    defaultValue.advanceAmount
  );
  const [interestRate, setInterestRate] = useState(defaultValue.interestRate);
  const [period, setPeriod] = useState(defaultValue.period);

  const handleOriginalAmountChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      const value = isNaN(parseInt(event.target.value))
        ? 0
        : parseInt(event.target.value);
      setOriginalAmount(value);
    }, []);

  const handleAdvanceAmountChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      const value = isNaN(parseInt(event.target.value))
        ? 0
        : parseInt(event.target.value);
      setAdvanceAmount(value);
    }, []);

  const handleInterestRateChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      const value = isNaN(parseFloat(event.target.value))
        ? 0
        : parseFloat(event.target.value);
      setInterestRate(value);
    }, []);

  const handlePeriodChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = isNaN(parseInt(event.target.value))
        ? 0
        : parseInt(event.target.value);
      setPeriod(value);
    },
    []
  );

  const result = useMemo(() => {
    return 2000;
  }, []);

  return (
    <div className={styles.container}>
      <p className="font-r-sm">
        단순 계산기로 사용되며 실제 고객 신용도에 따라
        <br />월 할부 금액은 변경될 수 있습니다.
      </p>
      <div className={`${styles["input-wrapper"]} font-r-md`}>
        <span>할부원금</span>
        <input
          type="number"
          value={originalAmount}
          onChange={handleOriginalAmountChange}
        />
        <span>만원</span>
      </div>
      <div className={`${styles["input-wrapper"]} font-r-md`}>
        <span>선수금</span>
        <input
          type="number"
          value={advanceAmount}
          onChange={handleAdvanceAmountChange}
        />
        <span>만원</span>
      </div>
      <div className={`${styles["input-wrapper"]} font-r-md`}>
        <span>금리</span>
        <input
          type="number"
          value={interestRate}
          onChange={handleInterestRateChange}
        />
        <span>%</span>
      </div>
      <div className={`${styles["input-wrapper"]} font-r-md`}>
        <span>기간</span>
        <input type="number" value={period} onChange={handlePeriodChange} />
        <span>개월</span>
      </div>
      <div className={styles.result}>
        <span className="font-b-md">예상 월 납입금액</span>
        <span className={`${styles["result-value"]} font-b-lg`}>
          {result.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
