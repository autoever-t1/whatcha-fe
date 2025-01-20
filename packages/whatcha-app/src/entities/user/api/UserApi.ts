import { authAxios } from "@/shared";

export const updateBudget = async (budgetMin: number, budgetMax: number) => {
  await authAxios.put<void>(`/api/user/budget`, {
    budgetMin,
    budgetMax,
  });
};

export const updatePreference = async (preferences: string[]) => {
  await authAxios.put<void>(`/api/user/preference`, {
    preferenceModel1: preferences[0],
    preferenceModel2: preferences[1],
    preferenceModel3: preferences[2],
  });
};

export const getNewAccessToken = async () => {
  return await authAxios.post("api/user/reissue-token");
};
