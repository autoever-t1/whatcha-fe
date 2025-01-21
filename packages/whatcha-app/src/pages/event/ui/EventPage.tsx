import { Roulette } from "@/widgets/roulette";
import styles from "./EventPage.module.css";
import Logo from "@common/assets/logo.png";
import { CouponItem } from "@/shared/coupon-item";
import { useCallback, useState } from "react";
import { createCoupon, hasNewCoupon } from "@/entities/coupon";
import { SimpleDialog, SimpleDialogProps } from "@/widgets/simple-dialog";
import ArrowBackIcon from "@common/assets/icons/arrow-back.svg";
import { useNavigate } from "react-router";

export function EventPage() {
  const navigate = useNavigate();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const canSpin = await hasNewCoupon();

      if (canSpin) {
        const newPrizeNumber = Math.floor(Math.random() * 4);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      }
    }
  };

  const makeCoupon = useCallback(async (couponCode: string) => {
    await createCoupon(couponCode);

    setDialog({
      message: "쿠폰이 발급되었습니다",
      positiveLabel: "확인",
      onClickPositive: () => {
        setDialog(null);
      },
    });
  }, []);

  const handleClickBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSpinStop = useCallback(async () => {
    setMustSpin(false);
    makeCoupon(`RANDOM${prizeNumber * 5 + 5}`);
  }, [prizeNumber, makeCoupon]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleClickBackButton}>
          <img src={ArrowBackIcon} alt="Back" />
        </button>
      </div>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" />
        </div>
        <div>
          <p className="font-h4">왓차 출시 기념</p>
          <p className="font-h3">신규회원 쿠폰 이벤트 1</p>
        </div>

        <div className={`${styles.banner} font-r-sm`}>
          룰렛 돌리고 최대 20% 할인쿠폰 받으세요!
        </div>
        <div className={`${styles.period} font-r-sm`}>
          이벤트 기간: ~ 2025.03.01
        </div>
        <div className={styles["roulette-wrapper"]}>
          <Roulette
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            onSpinClick={handleSpinClick}
            onSpinStop={handleSpinStop}
          />
        </div>
      </div>
      <div className={styles["second-box"]}>
        <div className="color-gray-50">
          <p className="font-h4">왓차 출시 기념</p>
          <p className="font-h3">
            신규회원 쿠폰 이벤트 <span className="color-secondary">2</span>
          </p>
        </div>
        <p className="font-r-sm color-gray-50">
          무료로 쿠폰 코드 등록하고 10% 할인쿠폰 받으세요!
        </p>
        <CouponItem
          coupon={{
            userCouponId: 1,
            couponName: "[신규회원] 웰컴 10% 할인 쿠폰",
            discountPercentage: 10,
            maxDiscountAmount: 100000,
            expiryDate: "2025-02-01",
          }}
        />
        <p
          className="font-r-sm color-gray-400"
          style={{ textDecoration: "underline" }}
        >
          마이 페이지 {">"} 쿠폰함에서
          <br />
          <span className="font-r-md color-secondary">WelcomeWhatcha</span>{" "}
          입력하고 쿠폰 등록
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p className="font-r-sm color-gray-600">
            대상: 왓차 신규 회원 (1인 1회 사용가능)
          </p>
          <p className="font-r-sm color-gray-600">
            할인율: 10% (할인한도 10만원)
          </p>
          <p className="font-r-sm color-gray-600">
            사용범위: 모든 중고차 구매 서비스
          </p>
          <p className="font-r-sm color-gray-600">
            유의사항: 이벤트는 상황에 따라 사전 공지 없이 종료될 수 있습니다.
          </p>
        </div>
      </div>

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          positiveLabel={dialog.positiveLabel}
          onClickPositive={dialog.onClickPositive}
        />
      )}
    </div>
  );
}
