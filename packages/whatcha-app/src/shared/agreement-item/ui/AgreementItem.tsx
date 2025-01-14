import styles from "./AgreementItem.module.css";
import CheckIcon from "@common/assets/icons/check.svg";
import CheckCheckedIcon from "@common/assets/icons/check-checked.svg";

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

export function AgreementItem({ label, checked, onClick }: AgreementItemProps) {
  return (
    <button
      className={`${styles.container} font-r-sm color-gray-600`}
      onClick={onClick}
    >
      <div className={styles["icon-wrapper"]}>
        <img src={checked ? CheckCheckedIcon : CheckIcon} alt="check" />
      </div>
      {label}
    </button>
  );
}
