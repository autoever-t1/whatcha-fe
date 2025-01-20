import styles from "./FavoriteItem.module.css";

interface FavoriteItemProps {
  model: { modelName: string; img: string };
  selected: boolean;
  onClick: () => void;
}

export function FavoriteItem({ model, selected, onClick }: FavoriteItemProps) {
  return (
    <div
      className={`${styles["car-item"]} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles["car-item-img-wrapper"]}>
        <img src={model.img} alt="car" />
      </div>
      <p
        className={`font-r-xs ${
          selected ? "color-secondary" : "color-gray-50"
        } `}
      >
        {model.modelName}
      </p>
    </div>
  );
}
