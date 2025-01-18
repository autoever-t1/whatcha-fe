import { authAxios } from "@/shared";
import {
  CreateOrderResultDTO,
  DepositDTO,
  OrderDTO,
  OrderListItemDTO,
} from "../model/types";

export const createOrder = async (depositInfo: DepositDTO) => {
  const response = await authAxios.post<CreateOrderResultDTO>(
    `/api/order/deposit`,
    depositInfo
  );

  return response.data;
};

export const getOrder = async (orderId: number) => {
  const response = await authAxios.get<OrderDTO[]>(`/api/order/${orderId}`);

  return response.data;
};

export const getOrderList = async () => {
  const response = await authAxios.get<OrderListItemDTO[]>(
    `/api/order/orderList`
  );

  return response.data;
};
