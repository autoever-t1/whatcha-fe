import { ContentBox } from "@shared/content-box";
import { Banner } from "./Banner";
import { MainHeader } from "./MainHeader";
import styles from "./MainPage.module.css";
import { SmallCarItem } from "@shared/small-car-item";
import { InstallmentCalculator } from "@widgets/installment-calculator";
import { Footer } from "@shared/footer";
import { FavoriteSheet } from "@widgets/favorite-sheet";
import { useCallback, useEffect, useState } from "react";
import {
  getRecommemdationsApi,
  getTop5Api,
  UsedCarSmallListDto,
} from "@/entities/used-car";

export function MainPage() {
  console.log(location.href);
  const [isFavoriteSheetOpen, setFavoriteSheetOpen] = useState(false);
  const [recommendations, setRecommnedations] = useState<UsedCarSmallListDto[]>(
    []
  );
  const [top5, setTop5] = useState<UsedCarSmallListDto[]>([]);

  const getRecommendations = useCallback(async () => {
    const response = await getRecommemdationsApi();

    setRecommnedations(response);
  }, []);

  const getTop5 = useCallback(async () => {
    const response = await getTop5Api();

    setTop5(response);
  }, []);

  useEffect(() => {
    console.log("asdf");
    console.log(window.AndroidInterface.getLatitude());
    console.log(window.AndroidInterface.getLongitude());

    if (window.AndroidInterface && !Boolean(sessionStorage.getItem("at"))) {
      const ai = window.AndroidInterface;
      ai.log("Connect to AndroidInterface");

      sessionStorage.setItem("at", ai.getToken());
      sessionStorage.setItem("bmin", String(ai.getBudgetMin()));
      sessionStorage.setItem("bmax", String(ai.getBudgetMax()));
      sessionStorage.setItem("pm1", ai.getPrefer1());
      sessionStorage.setItem("pm2", ai.getPrefer2());
      sessionStorage.setItem("pm3", ai.getPrefer3());
      sessionStorage.setItem("name", ai.getName());
      sessionStorage.setItem("email", ai.getEmail());
      sessionStorage.setItem("phone", ai.getPhone());
      sessionStorage.setItem("lat", String(ai.getLatitude()));
      sessionStorage.setItem("lng", String(ai.getLongitude()));
    }

    getRecommendations();
    getTop5();

    if (!sessionStorage.getItem("pm1")) setFavoriteSheetOpen(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setFavoriteSheetOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.content}>
        <div className={styles["banner-wrapper"]}>
          <Banner />
        </div>
        <ContentBox title="이런 차 어때요?">
          <div className={styles.list}>
            {recommendations.map((car) => (
              <SmallCarItem key={`r-${car.usedCarId}`} car={car} />
            ))}
          </div>
        </ContentBox>
        <ContentBox title="할부 계산기">
          <InstallmentCalculator
            defaultValue={{
              originalAmount: 50000000,
              advanceAmount: 0,
              interestRate: 5,
              period: 48,
            }}
          />
        </ContentBox>
        <ContentBox title="TOP 5 매물" color="primary">
          <div className={styles.list}>
            {top5.map((car) => (
              <SmallCarItem
                key={`r-${car.usedCarId}`}
                car={car}
                color="primary"
              />
            ))}
          </div>
        </ContentBox>
        <Footer />
      </div>

      {isFavoriteSheetOpen && <FavoriteSheet onClose={handleCloseSheet} />}
    </div>
  );
}
