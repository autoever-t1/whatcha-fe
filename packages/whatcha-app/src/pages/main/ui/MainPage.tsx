import { MainHeader } from "./MainHeader";
import styles from "./MainPage.module.css";

export function MainPage() {
  return (
    <div className={styles.container}>
      <MainHeader />
    </div>
  );
}
