import { authAxios } from "@/shared";
import { CreateOrderResultDTO, DepositDTO } from "../model/types";

export const createOrder = async (depositInfo: DepositDTO) => {
  const response = await authAxios.post<CreateOrderResultDTO>(
    `/api/order/deposit`,
    depositInfo
  );

  return response.data;
};
