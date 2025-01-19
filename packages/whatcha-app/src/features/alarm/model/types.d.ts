export interface AlarmCreateDTO {
  modelName: string;
  alertExpirationDate: string;
}

export interface AlarmListItemDTO {
  userCarAlertId: number;
  userId: number;
  modelId: number;
  modelName: string;
  alertExpirationDate: string;
}
