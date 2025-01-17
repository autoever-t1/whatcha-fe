import {
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./CarPage.module.css";
import ArrowBackWhiteIcon from "@common/assets/icons/arrow-back-white.svg";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";
import { ContentBox } from "@shared/content-box";
import { InnerBox } from "@shared/inner-box";
import { BasicInfoContent } from "./BasicInfoContent";
import { OptionContent } from "./OptionContent";
import { InstallmentCalculator } from "@widgets/installment-calculator";
import { Footer } from "@shared/footer";
import { BottomButton } from "@shared/bottom-button";
import { RotateView } from "@widgets/rotate-view";
import { useNavigate } from "react-router";

export interface Car {
  vhclRegNo: string;
  model: string;
  date: string;
  mileage: number;
  price: number;
  newCarPrice: number;
  fuel: string;
  engineCapacity: number;
  exteriorColor: string;
  interiorColor: string;
  options: {
    option1: boolean;
    option2: boolean;
    option3: boolean;
    option4: boolean;
    option5: boolean;
    option6: boolean;
    option7: boolean;
    option8: boolean;
    option9: boolean;
    option10: boolean;
    option11: boolean;
    option12: boolean;
    option13: boolean;
    option14: boolean;
    option15: boolean;
    option16: boolean;
  };
}

export function CarPage() {
  const navigate = useNavigate();

  const [car, setCar] = useState<Car>();
  const [isTop, setTop] = useState(true);

  const priceDiff = useMemo(() => {
    return car ? car.newCarPrice - car.price : 0;
  }, [car]);

  const getCar = useCallback(async () => {
    const car: Car = {
      vhclRegNo: "123가4567",
      model: "BMW 320d",
      date: "2021-01-01",
      mileage: 10000,
      price: 3000,
      newCarPrice: 5000,
      fuel: "가솔린",
      engineCapacity: 3333,
      exteriorColor: "미드나잇 블랙 펄",
      interiorColor: "블랙모노톤",
      options: {
        option1: true,
        option2: false,
        option3: true,
        option4: false,
        option5: true,
        option6: false,
        option7: true,
        option8: false,
        option9: true,
        option10: false,
        option11: true,
        option12: false,
        option13: true,
        option14: false,
        option15: true,
        option16: false,
      },
    };

    setCar(car);
  }, []);

  useEffect(() => {
    getCar();
  }, []);

  const handleClickBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleContentScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const scrollTop = (e.target as HTMLDivElement).scrollTop;

      if (scrollTop >= 20) setTop(false);
      else setTop(true);
    },
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.content} onScroll={handleContentScroll}>
        <div className={`${styles.header} ${isTop ? styles.top : ""}`}>
          <button
            className={styles["icon-button"]}
            onClick={handleClickBackButton}
          >
            <img src={isTop ? ArrowBackWhiteIcon : ArrowBackIcon} alt="Back" />
          </button>
          {car?.vhclRegNo}
        </div>
        <div className={styles["car-img"]}>
          {/* <img src={SampleImg} alt="Car" />
          <div className={styles.gradient} /> */}
          <RotateView />
        </div>
        {car && (
          <div className={styles["inner-content"]}>
            <ContentBox title={car.model}>
              <div>
                <p className={`${styles["sub-info"]} font-r-sm`}>
                  {car.date} {car.mileage}km
                </p>
                <div className={styles["price-wrapper"]}>
                  <p className={`${styles.price} font-b-lg`}>{car.price}만원</p>
                  <div className={`${styles.badge} font-r-xs`}>
                    할부 <span className="font-b-xs">50만원</span>
                  </div>
                </div>
              </div>
            </ContentBox>
            <ContentBox title="기본 정보">
              <InnerBox>
                <BasicInfoContent car={car} />
              </InnerBox>
            </ContentBox>
            <ContentBox title="신차가격대비">
              <p className="font-r-sm">
                {car.vhclRegNo}은(는)
                <br />
                신차 가격 대비{" "}
                <span className={`${styles.diff} font-b-sm`}>
                  {(priceDiff * 10000).toLocaleString()}
                </span>
                원 절약할 수 있어요
              </p>
              <InnerBox>
                <div className={styles.vertical}>
                  <p className="font-b-sm">{car.model}</p>
                  <div className="layout-line">
                    <span className="font-r-sm">신차가</span>
                    <span className="font-r-sm">
                      {(car.newCarPrice * 10000).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </InnerBox>
            </ContentBox>
            <ContentBox title="옵션 정보">
              <OptionContent car={car} />
              <p className={`${styles["option-description"]} font-r-xs`}>
                탈부착이 가능한 옵션 품목은 중고차 특성상, 이전 차주의 반납
                여부와 사용감에 따라 제공되지 않을 수 있습니다.
              </p>
            </ContentBox>
            <ContentBox title="할부 계산기">
              <InstallmentCalculator
                defaultValue={{
                  originalAmount: 0,
                  advanceAmount: 0,
                  interestRate: 0,
                  period: 0,
                }}
              />
              <p className={`${styles["option-description"]} font-r-xs`}>
                할부 한도 조회로 고객님의 신용도가 하락하지 않습니다.
              </p>
              <p className={`${styles["option-description"]} font-r-xs`}>
                본인인증을 통해 고객님의 실제 개인 할부 한도를 조회하고 적용해
                볼 수 있습니다.
              </p>
              <p className={`${styles["option-description"]} font-r-xs`}>
                조회 프로세스를 완료하면 위 할부 계산기에서 고객님의 실제 예상
                월 납입금액을 확인하실 수 있습니다.
              </p>
            </ContentBox>
            <ContentBox title="총 견적 합계">
              <div className="layout-line">
                <span className="font-r-sm">총 차량 구매 예상 비용</span>
                <span className="font-b-sm">
                  {((car.price + 200) * 10000).toLocaleString()}원
                </span>
              </div>
              <InnerBox>
                <div className={styles.vertical}>
                  <div
                    className="layout-line"
                    style={{ color: "var(--color-gray-600)" }}
                  >
                    <span className="font-r-sm">차량가격</span>
                    <span className="font-r-sm">
                      {(car.price * 10000).toLocaleString()}원
                    </span>
                  </div>
                  <div
                    className="layout-line"
                    style={{ color: "var(--color-gray-600)" }}
                  >
                    <span className="font-r-sm">관리비용(매도비)</span>
                    <span className="font-r-sm">
                      {(100 * 10000).toLocaleString()}원
                    </span>
                  </div>
                  <div
                    className="layout-line"
                    style={{ color: "var(--color-gray-600)" }}
                  >
                    <span className="font-r-sm">탁송료</span>
                    <span className="font-r-sm">
                      {(100 * 10000).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </InnerBox>
              <div className="layout-line">
                <span className="font-r-sm">이전등록비</span>
                <span className="font-b-sm">
                  {(200 * 10000).toLocaleString()}원
                </span>
              </div>
              <div className="layout-line">
                <span className="font-r-sm">이전등록대행 수수료</span>
                <span className="font-b-sm">
                  {(3 * 10000).toLocaleString()}원
                </span>
              </div>
              <div className="div-line" />
              <div className="layout-line">
                <span className="font-b-md">총 견적 합계</span>
                <span
                  className="font-b-md"
                  style={{ color: "var(--color-primary)" }}
                >
                  {((car.price + 403) * 10000).toLocaleString()}원
                </span>
              </div>
            </ContentBox>
            <Footer />
          </div>
        )}
      </div>
      <BottomButton>계약금 결제하기</BottomButton>
    </div>
  );
}
