import { Car } from "./CarPage";
import styles from "./OptionContent.module.css";
import SeatIcon from "@common/assets/icons/seat.svg";
import SeatDisabledIcon from "@common/assets/icons/seat-disabled.svg";

interface OptionContentProps {
  car: Car;
}

interface OptionItemProps {
  abled: boolean;
}

function OptionItem({ abled }: OptionItemProps) {
  return (
    <div className={styles["option-item"]}>
      <div className={styles["icon-wrapper"]}>
        <img src={abled ? SeatIcon : SeatDisabledIcon} alt="Option" />
      </div>
      <div
        className={`${styles["option-name"]} font-r-xs ${
          !abled ? styles.disabled : ""
        }`}
      >
        가죽 시트
      </div>
    </div>
  );
}

export function OptionContent({ car }: OptionContentProps) {
  return (
    <div className={styles.container}>
      <OptionItem abled={car.options.option1} />
      <OptionItem abled={car.options.option2} />
      <OptionItem abled={car.options.option3} />
      <OptionItem abled={car.options.option4} />
      <OptionItem abled={car.options.option5} />
      <OptionItem abled={car.options.option6} />
      <OptionItem abled={car.options.option7} />
      <OptionItem abled={car.options.option8} />
      <OptionItem abled={car.options.option9} />
      <OptionItem abled={car.options.option10} />
      <OptionItem abled={car.options.option11} />
      <OptionItem abled={car.options.option12} />
      <OptionItem abled={car.options.option13} />
      <OptionItem abled={car.options.option14} />
      <OptionItem abled={car.options.option15} />
      <OptionItem abled={car.options.option16} />
    </div>
  );
}
