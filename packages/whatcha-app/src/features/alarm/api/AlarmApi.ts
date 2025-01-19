import { authAxios } from "@/shared";
import { AlarmCreateDTO, AlarmListItemDTO } from "../model/types";

export const createAlarm = async (newAlarmInfo: AlarmCreateDTO) => {
  const response = await authAxios.post<void>(
    `/api/interest/alert-cars`,
    newAlarmInfo
  );

  return response.data;
};

export const getAlarms = async () => {
  const response = await authAxios.get<AlarmListItemDTO[]>(
    `api/interest/alert-cars`
  );

  return response.data;
};
