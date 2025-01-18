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
  price: number;
  registrationDate: string;
  vhclRegNo: string;
  couponInfo: CouponDTO | null;
  orderProcessInfo: OrderProcessDTO;
  orderInfo: {
    orderId: 16;
    usedCarId: 13;
    fullPayment: 18530000;
    deposit: 300000;
    errorMessage: null;
  };
  branchStoreInfo: {
    branchStoreId: 2;
    branchStoreName: "현대자동차 인증중고차센터 양산";
    location: "경남 양산시 하북면 삼동로 44";
    latitude: 35.497006;
    longitude: 129.095554;
    ownedCarCount: 242;
    phone: "1522-0880";
  };
}

export interface OrderListItemDTO {
  orderId: number;
  mainImage: string;
  modelName: string;
  process: number;
  orderDate: string;
}
