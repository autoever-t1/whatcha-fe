import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Coupon, AllCoupon } from '../../api/coupon';

const columns: GridColDef[] = [
  { field: 'couponId', headerName: '쿠폰 ID', width: 100 },
  { field: 'couponCode', headerName: '쿠폰 코드', width: 150 },
  { field: 'couponName', headerName: '쿠폰명', width: 200 },
  { 
    field: 'discountPercentage',
    headerName: '할인율',
    width: 120,
    renderCell: (params) => params.value ? `${params.value}%` : '-'
  },
  {
    field: 'discountAmount', 
    headerName: '할인금액',
    width: 120,
    renderCell: (params) => params.value ? `${params.value.toLocaleString()}원` : '-'
  },
  {
    field: 'maxDiscountAmount',
    headerName: '최대 할인금액',
    width: 150,
    renderCell: (params) => `${params.value.toLocaleString()}원`
  }
];

// const sampleRows = [
//   {
//     couponId: 1,
//     couponCode: "SAVE10",
//     couponName: "10% 할인 쿠폰",
//     discountPercentage: 15,
//     discountAmount: null,
//     maxDiscountAmount: 200000
//   },
//   {
//     couponId: 2,
//     couponCode: "SAVE10",
//     couponName: "10% 할인 쿠폰",
//     discountPercentage: 29,
//     discountAmount: null,
//     maxDiscountAmount: 500000
//   },
//   {
//     couponId: 3,
//     couponCode: "SAVE10",
//     couponName: "10% 할인 쿠폰",
//     discountPercentage: 12,
//     discountAmount: null,
//     maxDiscountAmount: 400000
//   },
//   {
//     couponId: 4,
//     couponCode: "SAVE10",
//     couponName: "10% 할인 쿠폰",
//     discountPercentage: 21,
//     discountAmount: null,
//     maxDiscountAmount: 2000
//   }
// ];

function CouponTable() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const data = await AllCoupon();
        setCoupons(data || []);
      } catch (err) {
        setError('쿠폰 목록을 불러오는데 실패했습니다.');
        setCoupons([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="w-full">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={coupons}
          columns={columns}
          getRowId={(row) => row.couponId}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
        />
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default CouponTable;