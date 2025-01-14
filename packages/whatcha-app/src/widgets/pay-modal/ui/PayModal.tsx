import { MainHeader } from "@shared/main-header";
import styles from "./PayModal.module.css";
import { BottomButton } from "@shared/bottom-button";
import { AgreementItem } from "@shared/agreement-item";

interface PayModalProps {
  title: string;
  price: number;
  onClickBack: () => void;
}

export function PayModal({ title, price, onClickBack }: PayModalProps) {
  return (
    <div className={styles.container}>
      <MainHeader title={title} onClickBack={onClickBack} />
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
            <p className="font-r-sm color-gray-400">박상연</p>
          </div>
          <input className="font-r-sm" type="text" placeholder="카드번호" />
          <input
            className="font-r-sm"
            type="text"
            placeholder="유효기간(월/년)"
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
          checked={false}
          onClick={() => {}}
        />
      </div>
      <BottomButton>결제하기</BottomButton>
    </div>
  );
}
