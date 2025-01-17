import client from './client';

export interface User {
  userId: number;
  email: string;
  name: string;
  address: string;
  userType: string;
  ageGroup: number;
  phone: string;
  budgetMin: number;
  budgetMax: number;
  isNotificationAgreed: boolean;
  isLocationAgreed: boolean;
  preferenceModelId1: number;
  preferenceModelId2: number;
  preferenceModelId3: number;
  latitude: number;
  longitude: number;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await client.get<User[]>('/admin/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('회원 목록 조회 실패:', error);
    throw error;
  }
};