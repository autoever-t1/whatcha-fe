import { useSearchParams } from "react-router";
import styles from "./ListPage.module.css";
import { MainHeader } from "@shared/main-header";
import { CarItem } from "@shared/car-item";
import SampleImg from "@assets/sample-image.png";
import { useMemo } from "react";

export function ListPage() {
  const [searchParams] = useSearchParams();

  const type = useMemo(() => {
    return searchParams.get("type");
  }, [searchParams]);

  const keyword = useMemo(() => {
    return type && type === "search" ? searchParams.get("keyword") : null;
  }, [type]);

  const headerTitle = useMemo(() => {
    return type === "search" && keyword ? keyword : "";
  }, [type, keyword]);

  return (
    <div className={styles.container}>
      <MainHeader title={headerTitle} />
      {type && (
        <div className={styles.content}>
          <div className={styles.list}>
            <CarItem
              car={{
                img: SampleImg,
                model: "2020 그랜저 가솔린 2.5 프리미엄 초이스",
                date: "23년 11월",
                vhclRegNo: "123가4567",
                mileage: 1000,
                price: 3450,
                likeCount: 134,
              }}
              liked
            />
            <CarItem
              car={{
                img: SampleImg,
                model: "2020 그랜저 가솔린 2.5 프리미엄 초이스",
                date: "23년 11월",
                vhclRegNo: "123가4567",
                mileage: 1000,
                price: 3450,
                likeCount: 134,
              }}
              liked={false}
            />
            <CarItem
              car={{
                img: SampleImg,
                model: "2020 그랜저 가솔린 2.5 프리미엄 초이스",
                date: "23년 11월",
                vhclRegNo: "123가4567",
                mileage: 1000,
                price: 3450,
                likeCount: 134,
              }}
              liked
            />
          </div>
        </div>
      )}
    </div>
  );
}
