import styles from "./Roulette.module.css";
import { Wheel } from "react-custom-roulette";
import {
  StyleType,
  WheelData,
} from "react-custom-roulette/dist/components/Wheel/types";

const primaryType: StyleType = {
  backgroundColor: "#f8fafc",
  // textColor?: string; // Optional
  // fontFamily?: string; // Optional
  // fontSize?: number; // Optional
  // fontWeight?: number | string; // Optional
  // fontStyle?: string; // Optional
};

const secondaryType: StyleType = {
  backgroundColor: "#e2e8f0",
};

const data: WheelData[] = [
  {
    option: "20%",
    optionSize: 1,
    style: primaryType,
  },
  {
    option: "15%",
    optionSize: 1,
    style: secondaryType,
  },
  {
    option: "10%",
    optionSize: 1,
    style: primaryType,
  },
  {
    option: "5%",
    optionSize: 1,
    style: secondaryType,
  },
];

interface RouletteProps {
  mustSpin: boolean;
  prizeNumber: number;
  onSpinClick: () => void;
  onSpinStop: () => void;
}

export function Roulette({
  mustSpin,
  prizeNumber,
  onSpinClick,
  onSpinStop,
}: RouletteProps) {
  return (
    <div className={styles.container}>
      <Wheel
        textColors={["#024caa"]}
        fontSize={24}
        spinDuration={0.3}
        fontFamily="Pretendard"
        radiusLineWidth={0}
        outerBorderWidth={16}
        outerBorderColor="#ec8305"
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onSpinStop}
      />

      <button onClick={onSpinClick} className="font-b-md">
        SPIN
      </button>
    </div>
  );
}
