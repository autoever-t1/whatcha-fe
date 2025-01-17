import { authAxios } from "@/shared";

export const updateBudget = async (budgetMin: number, budgetMax: number) => {
  await authAxios.put<void>(`/api/user/budget`, {
    budgetMin,
    budgetMax,
  });
};

export const updatePreference = async (preferences: string[]) => {
  await authAxios.put<void>(`/api/user/preference`, {
    preferenceModelId1: preferences[0],
    preferenceModelId2: preferences[1],
    preferenceModelId3: preferences[2],
  });
};
