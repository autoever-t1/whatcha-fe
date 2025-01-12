import { Banner } from "./Banner";
import { MainHeader } from "./MainHeader";
import styles from "./MainPage.module.css";

export function MainPage() {
  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.content}>
        <div className={styles["banner-wrapper"]}>
          <Banner />
        </div>
      </div>
    </div>
  );
}
