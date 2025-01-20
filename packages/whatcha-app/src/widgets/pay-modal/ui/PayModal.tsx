import styles from "./PayModal.module.css";
import { BottomButton } from "@shared/bottom-button";
import { AgreementItem } from "@shared/agreement-item";
import { BaseModal } from "@shared/base-modal";
import { useMemo, useState } from "react";

interface PayModalProps {
  title: string;
  price: number;
  onClickBack: () => void;
  onClickNext: () => void;
}

export function PayModal({
  title,
  price,
  onClickBack,
  onClickNext,
}: PayModalProps) {
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [agree, setAgree] = useState(false);

  const canNext = useMemo(() => {
    return cardNum.length > 0 && date.length > 0 && agree;
  }, [cardNum, date, agree]);

  return (
    <BaseModal title={title} onClickBack={onClickBack}>
      <div className={styles.content}>
        <div className="layout-line">
          <span className="font-r-md">결제금액</span>
          <span className="font-b-md color-primary">
            {price.toLocaleString()}원
          </span>
        </div>
        <div>
          <p className="font-r-md">결제카드 정보 입력</p>
          <p className="font-r-xs color-gray-400">
            차량 계약자 명의의 신용카드 외 결제 불가
          </p>
        </div>
        <div className={styles["input-box"]}>
          <div className={styles["disabled-input"]}>
            <p className="font-b-sm color-gray-600">성명</p>
            <p className="font-r-sm color-gray-400">
              {sessionStorage.getItem("name")}
            </p>
          </div>
          <input
            className="font-r-sm"
            type="text"
            placeholder="카드번호"
            value={cardNum}
            onChange={(e) => setCardNum(e.target.value)}
          />
          <input
            className="font-r-sm"
            type="text"
            placeholder="유효기간(월/년)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p className="font-r-md">약관동의</p>
          <p className="font-r-xs color-gray-400">
            약관 동의 후, '결제하기' 버튼을 눌러주세요.
          </p>
        </div>
        <AgreementItem
          label="모든 약관에 동의합니다. (필수)"
          checked={agree}
          onClick={() => {
            setAgree((prev) => !prev);
          }}
        />
      </div>
      <BottomButton disabled={!canNext} onClick={onClickNext}>
        결제하기
      </BottomButton>
    </BaseModal>
  );
}
