import { ChangeEventHandler, useCallback, useState } from "react";
import styles from "./InstallmentCalculator.module.css";
import { calculateEMI } from "../model/constant";

interface InstallmentCalculatorProps {
  price?: number;
  defaultValue: {
    originalAmount: number;
    advanceAmount: number;
    interestRate: number;
    period: number;
  };
}

export function InstallmentCalculator({
  price,
  defaultValue,
}: InstallmentCalculatorProps) {
  const [originalAmount, setOriginalAmount] = useState<string | number>(
    price
      ? (defaultValue.originalAmount - 10000000) / 10000
      : defaultValue.originalAmount / 10000
  );
  const [advanceAmount, setAdvanceAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(defaultValue.interestRate);
  const [period, setPeriod] = useState(defaultValue.period);

  const handleOriginalAmountChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const value = isNaN(parseInt(event.target.value))
          ? 0
          : parseInt(event.target.value);

        if (price) {
          setAdvanceAmount(
            parseInt(((price - value * 10000) / 10000).toFixed())
          );
        }

        setOriginalAmount(event.target.value);
      },
      [price]
    );

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
      {price && (
        <div className={`${styles["input-wrapper"]} font-r-md`}>
          <span>선수금</span>
          <input
            disabled
            type="number"
            value={advanceAmount}
            onChange={handleAdvanceAmountChange}
          />
          <span>만원</span>
        </div>
      )}

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
          {calculateEMI(
            originalAmount as number,
            interestRate,
            period
          ).toLocaleString()}
          원
        </span>
      </div>
    </div>
  );
}
