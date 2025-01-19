export interface UsedCarDetailDTO {
  modelName: string;
  price: number;
  registrationDate: string; //최초등록
  mileage: string; //주행거리
  fuelType: string; //연료
  engineCapacity: number; //배기량
  exteriorColor: string; //외관컬러
  interiorColor: string; //내장컬러
  modelType: string; //차종
  passengerCapacity: number; //승차인원
  driveType: string; //구동방식
  vhclRegNo: string; //차량번호
  years: string; //연식
  transmission: string; //변속기
  status: string; //-> default는 구매 가능
  goodsNo: string; //carNumber
  mainImage: string;
  likeCount: number;
  factoryPrice: number; // 해당 모델 신차 가격
  comparePrice: number; // 신차 가격이랑 판매 가격 차이
  branchStoreName: string;
  location: string;
  latitude: number;
  longitude: number;
  phone: string;
  hasNavigation: boolean;
  hasHiPass: boolean;
  hasHeatedSteeringWheel: boolean;
  hasHeatedSeats: boolean;
  hasVentilatedSeats: boolean;
  hasPowerSeats: boolean;
  hasLeatherSeats: boolean;
  hasPowerTrunk: boolean;
  hasSunroof: boolean;
  hasHUD: boolean;
  hasSurroundViewMonitor: boolean;
  hasRearMonitor: boolean;
  hasBlindSpotWarning: boolean;
  hasLaneDepartureWarning: boolean;
  hasSmartCruiseControl: boolean;
  hasFrontParkingWarning: boolean;
  isLiked: boolean;
}

export interface UsedCarPayDTO {
  modelName: string;
  registrationDate: string;
  mileage: string;
  price: number;
}

export interface UsedCarListDto {
  usedCarId: number;
  modelName: string;
  price: number;
  registrationDate: string;
  mileage: string;
  modelType: string;
  vhclRegNo: string;
  years: number;
  status: string;
  goodsNo: string;
  mainImage: string;
  likeCount: number;
  isLiked: boolean;
}

export interface UsedCarSmallListDto {
  usedCarId: number;
  mainImage: string;
  modelName: string;
  registrationDate: string;
  mileage: number;
  vhclRegNo: string;
  price: number;
}

export interface Option {
  optionId: number;
  optionName: string;
  icon: string;
  label:
    | "hasNavigation"
    | "hasHiPass"
    | "hasHeatedSteeringWheel"
    | "hasHeatedSeats"
    | "hasVentilatedSeats"
    | "hasPowerSeats"
    | "hasLeatherSeats"
    | "hasPowerTrunk"
    | "hasSunroof"
    | "hasHUD"
    | "hasSurroundViewMonitor"
    | "hasRearMonitor"
    | "hasBlindSpotWarning"
    | "hasLaneDepartureWarning"
    | "hasSmartCruiseControl"
    | "hasFrontParkingWarning";
}
