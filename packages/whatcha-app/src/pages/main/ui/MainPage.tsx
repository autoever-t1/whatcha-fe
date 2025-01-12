import { ContentBox } from "@shared/content-box";
import { Banner } from "./Banner";
import { MainHeader } from "./MainHeader";
import styles from "./MainPage.module.css";
import { SmallCarItem } from "@shared/small-car-item";
import SampleImg from "@assets/sample-image.png";

export function MainPage() {
  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.content}>
        <div className={styles["banner-wrapper"]}>
          <Banner />
        </div>
        <ContentBox title="이런 차 어때요?">
          <div className={styles.list}>
            {[1, 2, 3, 4, 5].map((item) => (
              <SmallCarItem
                key={item}
                car={{
                  img: SampleImg,
                  name: "아반떼아반떼아반떼아반떼아반떼아반떼아반떼아반떼아반떼",
                  date: "23년 11월",
                  mileage: 10000,
                  vhclRegNo: "12가1234",
                  price: 15000000,
                }}
              />
            ))}
          </div>
        </ContentBox>
      </div>
    </div>
  );
}
