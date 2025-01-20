import styles from "./OptionContent.module.css";
import { Option, options, UsedCarDetailDTO } from "@/entities/used-car";

interface OptionContentProps {
  car: UsedCarDetailDTO;
}

interface OptionItemProps {
  abled: boolean;
  option: Option;
}

function OptionItem({ abled, option }: OptionItemProps) {
  return (
    <div className={styles["option-item"]}>
      <div
        className={`${styles["icon-wrapper"]} ${abled ? "" : styles.disabled}`}
      >
        <img src={option.icon} alt="Option" />
      </div>
      <div
        className={`${styles["option-name"]} font-r-sm ${
          !abled ? styles.disabled : ""
        }`}
      >
        {option.optionName}
      </div>
    </div>
  );
}

export function OptionContent({ car }: OptionContentProps) {
  return (
    <div className={styles.container}>
      {options.map((option, i) => (
        <OptionItem abled={car[option.label]} option={option} key={`o-${i}`} />
      ))}
    </div>
  );
}
