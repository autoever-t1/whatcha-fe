import { authAxios } from "@/shared";
import {
  CreateOrderResultDTO,
  DepositDTO,
  OrderListItemDTO,
  OrderSheetDTO,
  PathReqDTO,
} from "../model/types";

export const createOrder = async (depositInfo: DepositDTO) => {
  const response = await authAxios.post<CreateOrderResultDTO>(
    `/api/order/deposit`,
    depositInfo
  );

  return response.data;
};

export const getOrder = async (orderId: number) => {
  const response = await authAxios.get<OrderSheetDTO>(`/api/order/${orderId}`);

  return response.data;
};

export const getOrderList = async () => {
  const response = await authAxios.get<OrderListItemDTO[]>(
    `/api/order/orderList`
  );

  return response.data;
};

export const fullPay = async (orderId: number) => {
  const response = await authAxios.post<void>(
    `api/order/${orderId}/fullPayment`
  );

  return response.data;
};

export const contract = async (orderId: number) => {
  const response = await authAxios.post<void>(
    `api/order/${orderId}/writeContract`
  );

  return response.data;
};

export const chooseMethod = async (orderId: number) => {
  const response = await authAxios.put<void>(
    `api/order/${orderId}/deliveryService`
  );

  return response.data;
};

export const getPathAPI = async (pathData: PathReqDTO) => {
  const response = await authAxios.post("api/order/path", pathData);

  return response.data;
};
