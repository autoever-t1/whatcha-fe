import client from './client';

// 쿠폰 타입
export interface Coupon {
  couponId: number;
  couponCode: string;
  couponName: string;
  discountPercentage: number | null;
  discountAmount: number | null;
  maxDiscountAmount: number;
}

export interface AddCouponRequest {
  couponCode: string;
  couponName: string;
  discountPercentage: number | null;
  discountAmount: number | null;
  maxDiscountAmount: number;
}

// 쿠폰 등록 API
export const addCoupon = async (couponData: AddCouponRequest): Promise<void> => {
  try {
    await client.post('/admin/coupon', couponData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  } catch (error) {
    console.error('쿠폰 등록 실패:', error);
    throw error;
  }
};

interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
}

// 쿠폰 전체 조회 api
export const AllCoupon = async (): Promise<Coupon[]> => {
  try {
    const response = await client.get<PaginatedResponse<Coupon>>('/admin/coupon', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.content; // content 배열만 반환
  } catch (error) {
    console.error('쿠폰 목록 조회 실패:', error);
    throw error;
  }
};