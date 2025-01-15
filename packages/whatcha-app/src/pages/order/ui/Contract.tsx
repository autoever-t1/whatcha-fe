import styles from "./Contract.module.css";

interface Contract {
  name: string;
  vhclRegNo: string;
  model: string;
  date: string;
  price: number;
}

interface ContractProps {
  contract: Contract;
}

interface ContractItemProps {
  title: string;
  children: string;
}

export function Contract({ contract }: ContractProps) {
  const { name, vhclRegNo, model, date, price } = contract;
  return (
    <div className={styles.container}>
      <p className="font-b-md" style={{ textAlign: "center" }}>
        자동차매매계약서
      </p>
      <p className="font-r-sm">
        {"자동차 양도인 왓차(이하 <갑>이라 한다)과 양수인 "}
        <span className={styles.strong}>{name}</span>
        {
          "(이하 <을>이라 한다)은 아래 명기한 <갑>의 자동차를 다음과 같은 조건과 방법으로 매매할 것에 합의한다."
        }
      </p>
      <div className={styles["contract-item"]}>
        <p className="font-b-sm">{"제1조 (거래자동차의 표시)"}</p>
        <p className="font-r-sm">
          • 자동차등록번호: <span className={styles.strong}>{vhclRegNo}</span>
        </p>
        <p className="font-r-sm">
          • 자동차등록날짜: <span className={styles.strong}>{date}</span>
        </p>
        <p className="font-r-sm">
          • 자동차 모델명: <span className={styles.strong}>{model}</span>
        </p>
      </div>
      <div className={styles["contract-item"]}>
        <p className="font-b-sm">{"제2조 (매매금액)"}</p>
        <p className="font-r-sm">
          • 계약금: <span className={styles.strong}>300,000원</span>
        </p>
        <p className="font-r-sm">
          • 잔금:{" "}
          <span className={styles.strong}>
            {(price - 300000).toLocaleString()}원
          </span>
        </p>
      </div>
      <div className={styles["contract-item"]}>
        <p className="font-b-sm">{"제3조 (동시 이행)"}</p>
        <p className="font-r-sm">
          {
            "<갑>은 잔금을 수령받음과 동시에 <을>에게 본 자동차와 소유권이전등록의 절차에 필요한 서류를 인도하여야 한다."
          }
        </p>
      </div>
    </div>
  );
}
