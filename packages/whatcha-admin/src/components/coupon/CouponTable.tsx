import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCoupons } from '../../hooks/useCoupon';
import { useState } from 'react';

const columns: GridColDef[] = [
  { field: "couponId", 
    headerName: "쿠폰 ID", 
    width: 100 
  },
  { field: "couponCode", 
    headerName: "쿠폰 코드", 
    width: 150 
  },
  { field: "couponName", headerName: "쿠폰명", width: 200 },
  {
    field: "discountPercentage",
    headerName: "할인율",
    width: 120,
    renderCell: (params) => (params.value ? `${params.value}%` : "-"),
  },
  {
    field: "discountAmount",
    headerName: "할인금액",
    width: 120,
    renderCell: (params) =>
      params.value ? `${params.value.toLocaleString()}원` : "-",
  },
  {
    field: "maxDiscountAmount",
    headerName: "최대 할인금액",
    width: 150,
    renderCell: (params) => `${params.value.toLocaleString()}원`,
  },
];

function CouponTable() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { data, isLoading } = useCoupons(page, pageSize);
  
  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <div className="w-full">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data?.content ?? []}
          columns={columns}
          getRowId={(row) => row.couponId}
          loading={isLoading}
          rowCount={data?.totalElements ?? 0}
          paginationMode="server"
          pageSizeOptions={[10, 20, 30]}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={handlePaginationModelChange}
        />
      </div>
    </div>
  );
}

// function CouponTable() {
//   const [coupons, setCoupons] = useState<Coupon[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       setLoading(true);
//       try {
//         const data = await AllCoupon();
//         setCoupons(data || []);
//       } catch (err) {
//         setError('쿠폰 목록을 불러오는데 실패했습니다.');
//         setCoupons([]); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoupons();
//   }, []);

//   return (
//     <div className="w-full">
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={coupons}
//           columns={columns}
//           getRowId={(row) => row.couponId}
//           loading={loading}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 10 },
//             },
//           }}
//           pageSizeOptions={[10, 20, 30]}
//         />
//       </div>
//       {error && <p className="mt-2 text-red-500">{error}</p>}
//     </div>
//   );
// }

export default CouponTable;