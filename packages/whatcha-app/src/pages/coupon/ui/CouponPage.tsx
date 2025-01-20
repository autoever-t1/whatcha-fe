import { ContentBox } from "@shared/content-box";
import styles from "./CouponPage.module.css";
import { MainButton } from "@shared/main-button";
import { MainHeader } from "@shared/main-header";
import { CouponItem } from "@shared/coupon-item";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { CouponDTO, createCoupon, getAllCoupon } from "@/entities/coupon";
import { SimpleDialog, SimpleDialogProps } from "@/widgets/simple-dialog";
import { AxiosError } from "axios";

export function CouponPage() {
  const navigate = useNavigate();

  const [couponList, setCouponList] = useState<CouponDTO[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [dialog, setDialog] = useState<SimpleDialogProps | null>(null);

  const isCouponCodeValid = useMemo(() => {
    return couponCode.trim().length > 0;
  }, [couponCode]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  const getCouponList = async () => {
    const response = await getAllCoupon(page);

    if (response.content === undefined) {
      setHasNextPage(false);
    } else {
      setCouponList((prev) => [...prev, ...response.content]);
      setHasNextPage(!response.last);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getCouponList();
  }, [page]);

  const handleClickBack = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  const handleChangeCouponCode: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setCouponCode(e.target.value);
    }, []);

  const handleClickSubmitButton = useCallback(async () => {
    try {
      await createCoupon(couponCode);
      window.location.href = window.location.href;
    } catch (e) {
      const error = e as AxiosError;
      if (error.status === 500) {
        setDialog({
          message: "존재하지 않는 쿠폰 코드입니다",
          positiveLabel: "확인",
          onClickPositive: () => {
            setDialog(null);
          },
        });
      }
    }
  }, [couponCode, navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title="쿠폰함" onClickBack={handleClickBack} />
      <div className={styles.content}>
        <ContentBox title="새 쿠폰 등록" position="top">
          <input
            className={`${styles["new-input"]} font-r-md`}
            value={couponCode}
            onChange={handleChangeCouponCode}
          />
          <div className={styles["button-wrapper"]}>
            <MainButton
              disabled={!isCouponCodeValid}
              onClick={handleClickSubmitButton}
            >
              쿠폰 등록
            </MainButton>
          </div>
        </ContentBox>
        <div className={styles["bottom-box"]}>
          <div className={`${styles["box-title"]} font-b-md`}>
            보유 중인 쿠폰
          </div>
          {couponList.map((coupon) => (
            <CouponItem key={coupon.userCouponId} coupon={coupon} />
          ))}
          <div ref={lastItemRef} style={{ flex: "10px 0 0" }} />
        </div>
      </div>

      {dialog && (
        <SimpleDialog
          message={dialog.message}
          onClickPositive={dialog.onClickPositive}
          positiveLabel={dialog.positiveLabel}
        />
      )}
    </div>
  );
}
