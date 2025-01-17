import Model1Img from "@common/assets/model/model1.png";
import Model2Img from "@common/assets/model/model2.png";
import Model3Img from "@common/assets/model/model3.png";
import Model4Img from "@common/assets/model/model4.png";
import Model5Img from "@common/assets/model/model5.png";
import Model6Img from "@common/assets/model/model6.png";
import Model7Img from "@common/assets/model/model7.png";
import Model8Img from "@common/assets/model/model8.png";
import Model9Img from "@common/assets/model/model9.png";
import Model10Img from "@common/assets/model/model10.png";
import Model11Img from "@common/assets/model/model11.png";
import Model12Img from "@common/assets/model/model12.png";
import Model13Img from "@common/assets/model/model13.png";
import Model14Img from "@common/assets/model/model14.png";
import Model15Img from "@common/assets/model/model15.png";
import Model16Img from "@common/assets/model/model16.png";
import { Option } from "./types";

export const models: { modelName: string; img: string }[] = [
  { modelName: "아반떼", img: Model1Img },
  { modelName: "쏘나타", img: Model2Img },
  { modelName: "그랜저", img: Model3Img },
  { modelName: "베뉴", img: Model4Img },
  { modelName: "싼타페", img: Model5Img },
  { modelName: "코나", img: Model6Img },
  { modelName: "투싼", img: Model7Img },
  { modelName: "펠리세이드", img: Model8Img },
  { modelName: "스타리아", img: Model9Img },
  { modelName: "캐스퍼", img: Model10Img },
  { modelName: "아이오닉6", img: Model11Img },
  { modelName: "G80", img: Model12Img },
  { modelName: "G90", img: Model13Img },
  { modelName: "GV70", img: Model14Img },
  { modelName: "GV80", img: Model15Img },
  { modelName: "G70", img: Model16Img },
];

export const options: Option[] = [
  { optionId: 0, optionName: "내비게이션", label: "hasNavigation" },
  { optionId: 1, optionName: "하이패스", label: "hasHiPass" },
  {
    optionId: 2,
    optionName: "열선 스티어링 휠",
    label: "hasHeatedSteeringWheel",
  },
  { optionId: 3, optionName: "열선시트(1열/2열)", label: "hasHeatedSeats" },
  { optionId: 4, optionName: "통풍시트(1열)", label: "hasVentilatedSeats" },
  { optionId: 5, optionName: "전동시트(1열)", label: "hasPowerSeats" },
  { optionId: 6, optionName: "가죽 시트", label: "hasLeatherSeats" },
  { optionId: 7, optionName: "전동식 트렁크", label: "hasPowerTrunk" },
  { optionId: 8, optionName: "선루프", label: "hasSunroof" },
  { optionId: 9, optionName: "헤드업 디스플레이", label: "hasHUD" },
  {
    optionId: 10,
    optionName: "서라운드 뷰 모니터",
    label: "hasSurroundViewMonitor",
  },
  { optionId: 11, optionName: "후방 모니터", label: "hasRearMonitor" },
  {
    optionId: 12,
    optionName: "후측방 경보 시스템",
    label: "hasBlindSpotWarning",
  },
  {
    optionId: 13,
    optionName: "차선 이탈 경보",
    label: "hasLaneDepartureWarning",
  },
  {
    optionId: 14,
    optionName: "스마트 크루즈 컨트롤",
    label: "hasSmartCruiseControl",
  },
  {
    optionId: 15,
    optionName: "전방 주차거리 경고",
    label: "hasFrontParkingWarning",
  },
];
