import { CouponDTO } from "@/entities/coupon";

export interface DepositDTO {
  usedCarId: number;
  fullPayment: number;
  deposit: number;
  userCouponId: number | null;
}

export interface CreateOrderResultDTO {
  orderId: number;
}

export interface OrderProcessDTO {
  orderProcessId: number;
  orderId: number;
  depositPaid: boolean;
  contractSigned: boolean;
  deliveryService: boolean;
  fullyPaid: boolean;
  deliveryCompleted: boolean;
  errorMessage: string;
}

export interface OrderDTO {
  orderId: number;
  usedCarId: number;
  fullPayment: number;
  deposit: number;
  errorMessage: string;
}

export interface BranchStoreDTO {
  branchStoreId: number;
  branchStoreName: string;
  location: string;
  latitude: number;
  longitude: number;
  ownedCarCount: number;
  phone: string;
}

export interface OrderSheetDTO {
  price: number;
  registrationDate: string;
  vhclRegNo: string;
  modelName: string;
  mainImage: string;
  mileage: string;
  couponInfo: CouponDTO | null;
  orderProcessInfo: OrderProcessDTO;
  orderInfo: OrderDTO;
  branchStoreInfo: BranchStoreDTO;
}

export interface OrderListItemDTO {
  orderId: number;
  mainImage: string;
  modelName: string;
  process: number;
  orderDate: string;
}

export interface PathReqDTO {
  fromLng: number;
  fromLat: number;
  toLng: number;
  toLat: number;
}
