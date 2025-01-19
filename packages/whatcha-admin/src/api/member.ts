import client from './client';


//회원 정보 타입
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

//회원 나이 타입
interface AgeStatistics {
  ageRange: number;
  count: number;
}

interface AgeStatisticsResponse {
  statistics: AgeStatistics[];
}

//회원 성별 타입
interface GenderStatistics {
  gender: string;
  count: number;
}

interface GenderStatisticsResponse {
  statistics: GenderStatistics[];
}

export const getUserAgeStats = async (): Promise<AgeStatisticsResponse> => {
  try {
    const response = await client.get<AgeStatisticsResponse>('/admin/user/statistics/age');
    return response.data;
  } catch (error) {
    console.error('회원 나이 통계 조회 실패:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await client.get<User[]>('/admin/user');
    return response.data;
  } catch (error) {
    console.error('회원 목록 조회 실패:', error);
    throw error;
  }
};

export const getUserGenderStats = async (): Promise<GenderStatisticsResponse> => {
  try {
    const response = await client.get<GenderStatisticsResponse>('/admin/user/statistics/gender');
    return response.data;
  } catch (error) {
    console.error('회원 성별 통계 조회 실패:', error);
    throw error;
  }
};

// export const getUserAgeStats = async (): Promise<AgeStatisticsResponse> => {
//   try {
//     const response = await client.get<AgeStatisticsResponse>('/admin/user/statistics/age');
//     return response.data;
//   } catch (error) {
//     console.error('회원 나이 통계 조회 실패:', error);
//     throw error;
//   }
// };

// export const getAllUsers = async (): Promise<User[]> => {
//   try {
//     const response = await client.get<User[]>('/admin/user', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('회원 목록 조회 실패:', error);
//     throw error;
//   }
// };

// export const getUserGenderStats = async (): Promise<GenderStatisticsResponse> => {
//   try {
//     const response = await client.get<GenderStatisticsResponse>('/admin/user/statistics/gender', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('회원 성별 통계 조회 실패:', error);
//     throw error;
//   }
// };