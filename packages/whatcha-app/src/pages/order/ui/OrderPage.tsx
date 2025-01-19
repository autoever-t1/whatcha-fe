import { MainHeader } from "@shared/main-header";
import styles from "./OrderPage.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentBox } from "@shared/content-box";
import { BillContent } from "@shared/bill-content";
import { ProgressBar } from "./ProgressBar";
import { BottomButton } from "@shared/bottom-button";
import { PayModal } from "@widgets/pay-modal";
import { Contract } from "./Contract";
import { ReceiveMethod } from "./ReceiveMethod";
import { OrderResult } from "./OrderResult";
import { useNavigate, useParams } from "react-router";
import {
  BranchStoreDTO,
  chooseMethod,
  contract,
  fullPay,
  getOrder,
  OrderProcessDTO,
} from "@/features/order";
import { CouponDTO } from "@/entities/coupon";
import { UsedCarSmallListDto } from "@/entities/used-car";

export function OrderPage() {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = useMemo(() => {
    return parseInt(params.orderId!);
  }, [params]);

  const [usedCar, setUsedCar] = useState<UsedCarSmallListDto>();
  const [processInfo, setProcessInfo] = useState<OrderProcessDTO>();
  const [coupon, setCoupon] = useState<CouponDTO | null>(null);
  const [branch, setBranch] = useState<BranchStoreDTO>();

  const process = useMemo(() => {
    if (!processInfo) return -1;
    if (!processInfo.fullyPaid) return 1;
    if (!processInfo.contractSigned) return 2;
    if (!processInfo.deliveryService) return 3;
    return 4;
  }, [processInfo]);

  const contractData = useMemo(() => {
    return {
      name: sessionStorage.getItem("name") || "",
      vhclRegNo: usedCar?.vhclRegNo || "",
      date: usedCar?.registrationDate || "",
      model: usedCar?.modelName || "",
      price: usedCar?.price || 0,
    };
  }, [usedCar]);

  const fullPayPrice = useMemo(() => {
    if (usedCar) {
      return (
        usedCar.price -
        (coupon
          ? Math.min(
              coupon.maxDiscountAmount,
              Math.round((coupon.discountPercentage! / 100) * usedCar.price)
            )
          : 0) +
        1330000 +
        2500000
      );
    }

    return 0;
  }, [usedCar, coupon]);

  const [isPayModalOpen, setPayModalOpen] = useState(false);

  const getOrderData = useCallback(async (orderId: number) => {
    const response = await getOrder(orderId);

    setUsedCar({
      usedCarId: response.orderInfo.usedCarId,
      price: response.price,
      registrationDate: response.registrationDate,
      vhclRegNo: response.vhclRegNo,
      modelName: response.modelName,
      thumbnailUrl: response.mainImage,
      mileage: parseInt(response.mileage),
    });
    setProcessInfo(response.orderProcessInfo);
    response.orderInfo.fullPayment;
    setCoupon(response.couponInfo);
    setBranch(response.branchStoreInfo);
  }, []);

  useEffect(() => {
    getOrderData(orderId);
  }, [getOrderData, orderId]);

  const handleClickBackButton = useCallback(() => {
    navigate("/mypage/orders");
  }, [navigate]);

  const handleClickPayButton = useCallback(() => {
    if (process === 1) {
      setPayModalOpen(true);
    }
  }, [process]);

  const handleClickPayModalBackButton = useCallback(() => {
    setPayModalOpen(false);
  }, []);

  const handleClickPayModalNextButton = useCallback(async () => {
    await fullPay(orderId);

    setPayModalOpen(false);
    setProcessInfo((prev) => {
      return prev ? { ...prev, fullyPaid: true } : undefined;
    });
  }, [orderId]);

  const handleClickContract = useCallback(async () => {
    await contract(orderId);

    setProcessInfo((prev) => {
      return prev ? { ...prev, contractSigned: true } : undefined;
    });
  }, [orderId]);

  const handleClickMethodNext = useCallback(async () => {
    await chooseMethod(orderId);

    setProcessInfo((prev) => {
      return prev ? { ...prev, deliveryService: true } : undefined;
    });
  }, [orderId]);

  const title = useMemo(() => {
    if (process === 1) return "주문금액";
    else if (process === 2) return "";
    else if (process === 3) return "수령 방법";
    else if (process === 4) return "";
    else return "";
  }, [process]);

  const bottomButtonText = useMemo(() => {
    if (process === 1) return "잔금 결제하기";
    else if (process === 2) return "계약서 서명하기";
    else if (process === 3) return "수령 방법 선택하기";
    else return "";
  }, [process]);

  const handleClickBottomButton = useMemo(() => {
    if (process === 1) {
      return handleClickPayButton;
    } else if (process === 2) {
      return handleClickContract;
    } else if (process === 3) {
      return handleClickMethodNext;
    }
    return () => {};
  }, [
    process,
    handleClickPayButton,
    handleClickContract,
    handleClickMethodNext,
  ]);

  return (
    <div className={styles.container}>
      <MainHeader title="주문 현황" onClickBack={handleClickBackButton} />
      <div
        className={`${styles.content} ${
          process === 4 ? styles["last-process"] : ""
        }`}
      >
        <ProgressBar process={process} />
        <div className="layout-vertical">
          <ContentBox title={title}>
            {usedCar && process === 1 ? (
              <BillContent
                price={usedCar.price}
                canUpdateCoupon={false}
                coupon={coupon}
              />
            ) : usedCar && process === 2 ? (
              <Contract contract={contractData} />
            ) : branch && process === 3 ? (
              <ReceiveMethod
                fromLat={parseFloat(
                  sessionStorage.getItem("lat") || "37.48152"
                )}
                fromLng={parseFloat(
                  sessionStorage.getItem("lng") || "126.882625"
                )}
                toLat={branch.latitude}
                toLng={branch.longitude}
                address={branch.location}
              />
            ) : usedCar && process === 4 ? (
              <OrderResult usedCar={usedCar} />
            ) : (
              <></>
            )}
          </ContentBox>
          {usedCar && process === 4 && (
            <>
              <ContentBox title="주문금액">
                <BillContent
                  price={usedCar.price}
                  canUpdateCoupon={false}
                  coupon={coupon}
                />
              </ContentBox>
              <ContentBox title="계약서">
                <div
                  style={{
                    padding: "16px",
                    border: "1px solid var(--color-gray-200)",
                  }}
                >
                  <Contract contract={contractData} />
                </div>
              </ContentBox>
            </>
          )}
        </div>
      </div>
      {process < 4 && (
        <BottomButton onClick={handleClickBottomButton}>
          {bottomButtonText}
        </BottomButton>
      )}

      {isPayModalOpen && (
        <PayModal
          title="잔금 결제"
          price={fullPayPrice}
          onClickBack={handleClickPayModalBackButton}
          onClickNext={handleClickPayModalNextButton}
        />
      )}
    </div>
  );
}
