import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTradeHistory } from '../../hooks/useDashboard';


const columns: GridColDef[] = [
  { field: 'goodsNo', headerName: '상품번호', width: 150 },
  { field: 'modelName', headerName: '차량명', width: 300 },
  { field: 'years', headerName: '연식', width: 100 },
   { field: 'price', 
    headerName: '판매가격', 
    width: 120,
    renderCell: (params) => `${params.value.toLocaleString()}원`
    },
  { field: 'modelType', headerName: '차종', width: 100 },
  { 
    field: 'status', 
    headerName: '상태', 
    width: 100,
    renderCell: (params) => (
      <span className={`px-2 py-1.5 text-xs rounded-lg ${
        params.value === '판매중' 
          ? 'bg-blue-200 text-blue-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {params.value}
      </span>
    )
  },
];


function RecentTransaction() {
  const { data = [], isLoading } = useTradeHistory();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.goodsNo}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20},
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}


export default RecentTransaction;