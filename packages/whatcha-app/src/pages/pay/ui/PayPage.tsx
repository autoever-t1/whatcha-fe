import { MainHeader } from "@shared/main-header";
import styles from "./PayPage.module.css";
import { ContentBox } from "@shared/content-box";
import { CarInfo } from "./CarInfo";
import SampleImg from "@assets/sample-image.png";

export function PayPage() {
  return (
    <div className={styles.container}>
      <MainHeader title="계약금 결제" />
      <div className={styles.content}>
        <ContentBox title="주문자 정보" position="top">
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이름</span>
            <span className="font-r-sm color-gray-600">김철수</span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">이메일</span>
            <span className="font-r-sm color-gray-600">abc1234@gmail.com</span>
          </div>
          <div className="layout-line">
            <span className="font-r-sm color-gray-600">휴대전화번호</span>
            <span className="font-r-sm color-gray-600">010-1234-1234</span>
          </div>
        </ContentBox>
        <ContentBox title="차량 정보">
          <CarInfo
            car={{
              img: SampleImg,
              model: "2022 하이브리드 그랜저 하이브리드 르블랑",
              date: "23년 11월",
              mileage: 3456,
              price: 3450,
            }}
          />
          <p className="font-r-sm color-gray-600">
            부대비용이 포함되지 않은 차량 가격입니다.
          </p>
        </ContentBox>
      </div>
    </div>
  );
}
