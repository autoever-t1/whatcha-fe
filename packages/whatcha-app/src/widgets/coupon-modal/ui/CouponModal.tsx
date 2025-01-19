import { BaseModal } from "@shared/base-modal";
import styles from "./CouponModal.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { CouponItem } from "@shared/coupon-item";
import { CouponDTO, getAllCoupon } from "@/entities/coupon";

interface CouponModalProps {
  onClickCoupon: (coupon: CouponDTO) => void;
  title: string;
  onClickBack: () => void;
}

export function CouponModal({
  onClickCoupon,
  title,
  onClickBack,
}: CouponModalProps) {
  const [couponList, setCouponList] = useState<CouponDTO[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(false);

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

  const getCoupons = useCallback(async (page: number) => {
    const response = await getAllCoupon(page);

    if (response.content === undefined) {
      setHasNextPage(false);
    } else {
      setCouponList((prev) => [...prev, ...response.content]);
      setHasNextPage(!response.last);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getCoupons(page);
  }, [getCoupons, page]);

  return (
    <BaseModal title={title} onClickBack={onClickBack}>
      <div className={styles.content}>
        {couponList.map((coupon, i) => (
          <CouponItem
            key={i}
            coupon={coupon}
            onClick={() => onClickCoupon(coupon)}
          />
        ))}
        <div style={{ height: "1px" }} ref={lastItemRef} />
      </div>
    </BaseModal>
  );
}
