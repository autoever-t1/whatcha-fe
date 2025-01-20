import { DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import { useCoupons } from '../../hooks/useCoupon';
import { useState} from 'react';

interface CouponTableProps {
  onDelete: (couponIds: number[]) => void;
}

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

function CouponTable({ onDelete }: CouponTableProps) {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { data, isLoading } = useCoupons(page, pageSize);
  
  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const handleSelectionChange = (newSelectionModel: GridRowSelectionModel) => {
    setSelectionModel(newSelectionModel);
    onDelete(newSelectionModel as number[]); // 선택된 쿠폰 ID 전달
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
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={handlePaginationModelChange}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={selectionModel}
        />
      </div>
    </div>
  );
}

export default CouponTable;