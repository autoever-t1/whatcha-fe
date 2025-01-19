import {
  UIEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./CarPage.module.css";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";
import { BottomButton } from "@shared/bottom-button";
import { RotateView } from "@widgets/rotate-view";
import { useNavigate, useParams } from "react-router";
import {
  getUsedCarDetail,
  likeUsedCar,
  UsedCarDetailDTO,
} from "@/entities/used-car";
import { ContentBox } from "@/shared/content-box";
import { InnerBox } from "@/shared/inner-box";
import { BasicInfoContent } from "./BasicInfoContent";
import { OptionContent } from "./OptionContent";
import { InstallmentCalculator } from "@/widgets/installment-calculator";
import { Footer } from "@/shared/footer";
import { calculateEMI } from "@/widgets/installment-calculator/model/constant";
import LikeIcon from "@common/assets/icons/like.svg";
import LikeFilledIcon from "@common/assets/icons/like-filled.svg";

export function CarPage() {
  const navigate = useNavigate();
  const params = useParams();
  const usedCarId = useMemo(() => {
    return params.carId ? parseInt(params.carId) : 0;
  }, [params]);

  const [car, setCar] = useState<UsedCarDetailDTO>();
  const [isTop, setTop] = useState(true);

  const getCar = useCallback(async () => {
    if (params.carId && parseInt(params.carId)) {
      const response = await getUsedCarDetail(parseInt(params.carId));

      setCar(response);
    }
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

  const handleClickPayButton = useCallback(() => {
    navigate(`/pay/${usedCarId}`);
  }, [navigate, usedCarId]);

  const handleClickLikeButton = useCallback(async () => {
    const response = await likeUsedCar(usedCarId);

    setCar((prev) => {
      if (prev) return { ...prev, isLiked: response };
      else return prev;
    });
  }, [usedCarId]);

  return (
    <div className={styles.container}>
      <div className={styles.content} onScroll={handleContentScroll}>
        <div className={`${styles.header} ${isTop ? styles.top : ""}`}>
          <button
            className={styles["icon-button"]}
            onClick={handleClickBackButton}
          >
            <img src={ArrowBackIcon} alt="Back" />
          </button>
          {car?.vhclRegNo}
        </div>
        {car && (
          <>
            <div className={styles["car-img"]}>
              <RotateView goodsNo={car?.goodsNo} />
              <button
                className={styles["like-button"]}
                onClick={handleClickLikeButton}
              >
                <img src={car.isLiked ? LikeFilledIcon : LikeIcon} alt="Like" />
              </button>
            </div>
            <div className={styles["inner-content"]}>
              <ContentBox title={car.modelName}>
                <div>
                  <p className={`${styles["sub-info"]} font-r-md`}>
                    {car.registrationDate}{" "}
                    {parseInt(car.mileage).toLocaleString()}km
                  </p>
                  <div className={styles["price-wrapper"]}>
                    <p className={`${styles.price} font-b-lg`}>
                      {car.price / 10000}만원
                    </p>
                    <div className={`${styles.badge} font-r-sm`}>
                      할부{" "}
                      <span className="font-b-sm">
                        {(
                          calculateEMI(car.price / 10000, 5, 48) / 10000
                        ).toFixed()}
                        만원
                      </span>
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
                <p className="font-r-md">
                  {car.vhclRegNo}은(는)
                  <br />
                  신차 가격 대비{" "}
                  <span className={`${styles.diff} font-b-md`}>
                    {(car.comparePrice * -1).toLocaleString()}
                  </span>
                  원 절약할 수 있어요
                </p>
                <InnerBox>
                  <div className={styles.vertical}>
                    <p className="font-b-md">{car.modelName}</p>
                    <div className="layout-line">
                      <span className="font-r-md">신차가</span>
                      <span className="font-r-md">
                        {car.factoryPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </InnerBox>
              </ContentBox>
              <ContentBox title="옵션 정보">
                <OptionContent car={car} />
                <p className={`${styles["option-description"]} font-r-sm`}>
                  탈부착이 가능한 옵션 품목은 중고차 특성상, 이전 차주의 반납
                  여부와 사용감에 따라 제공되지 않을 수 있습니다.
                </p>
              </ContentBox>
              <ContentBox title="할부 계산기">
                <InstallmentCalculator
                  price={car.price}
                  defaultValue={{
                    originalAmount: car.price,
                    advanceAmount: 0,
                    interestRate: 5.0,
                    period: 48,
                  }}
                />
                <p className={`${styles["option-description"]} font-r-sm`}>
                  할부 한도 조회로 고객님의 신용도가 하락하지 않습니다.
                </p>
                <p className={`${styles["option-description"]} font-r-sm`}>
                  본인인증을 통해 고객님의 실제 개인 할부 한도를 조회하고 적용해
                  볼 수 있습니다.
                </p>
                <p className={`${styles["option-description"]} font-r-sm`}>
                  조회 프로세스를 완료하면 위 할부 계산기에서 고객님의 실제 예상
                  월 납입금액을 확인하실 수 있습니다.
                </p>
              </ContentBox>
              <ContentBox title="총 견적 합계">
                <div className="layout-line">
                  <span className="font-r-md">총 차량 구매 예상 비용</span>
                  <span className="font-b-md">
                    {(car.price + 2000000).toLocaleString()}원
                  </span>
                </div>
                <InnerBox>
                  <div className={styles.vertical}>
                    <div className="layout-line color-gray-600">
                      <span className="font-r-md">차량가격</span>
                      <span className="font-r-md">
                        {car.price.toLocaleString()}원
                      </span>
                    </div>
                    <div className="layout-line color-gray-600">
                      <span className="font-r-md">관리비용(매도비)</span>
                      <span className="font-r-md">
                        {(100 * 10000).toLocaleString()}원
                      </span>
                    </div>
                    <div className="layout-line color-gray-600">
                      <span className="font-r-md">탁송료</span>
                      <span className="font-r-md">
                        {(100 * 10000).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </InnerBox>
                <div className="layout-line">
                  <span className="font-r-md">이전등록비</span>
                  <span className="font-b-md">
                    {(200 * 10000).toLocaleString()}원
                  </span>
                </div>
                <div className="layout-line">
                  <span className="font-r-md">이전등록대행 수수료</span>
                  <span className="font-b-md">
                    {(3 * 10000).toLocaleString()}원
                  </span>
                </div>
                <div className="div-line" />
                <div className="layout-line">
                  <span className="font-b-lg">총 견적 합계</span>
                  <span className="font-b-lg color-primary">
                    {(car.price + 403 * 10000).toLocaleString()}원
                  </span>
                </div>
              </ContentBox>
              <Footer />
            </div>
          </>
        )}
      </div>
      <BottomButton onClick={handleClickPayButton}>
        계약금 결제하기
      </BottomButton>
    </div>
  );
}
