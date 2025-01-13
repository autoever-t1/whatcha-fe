import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: '상품번호', width: 150 },
  { field: 'carName', headerName: '차량명', width: 300 },
  { field: 'year', headerName: '연식', width: 100 },
  { field: 'mileage', headerName: '주행거리', width: 120 },
  { field: 'price', headerName: '판매가격', width: 120 },
  { field: 'location', headerName: '지역', width: 100 },
  { 
    field: 'status', 
    headerName: '상태', 
    width: 100,
    renderCell: (params) => (
      <span className={`px-2 py-1 text-xs rounded-full ${
        params.value === '판매중' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {params.value}
      </span>
    )
  },
];

const rows = [
  {
    id: 'GJK240627007167',
    carName: '2023 GV70 가솔린 2.5 터보 AWD',
    year: '2022년',
    mileage: '28,988km',
    price: '4,840만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJJ240620006906',
    carName: '2024 G80 가솔린 2.5 터보 AWD',
    year: '2023년',
    mileage: '12,960km',
    price: '5,880만원',
    location: '용인',
    status: '판매완료'
  },
  {
    id: 'HIG240814008259',
    carName: '2023 그랜저(IG) 하이브리드',
    year: '2022년',
    mileage: '47,819km',
    price: '3,530만원',
    location: '양산',
    status: '판매중'
  },
  {
    id: 'GJJ240906008810',
    carName: '2021 G80 가솔린 2.5 터보 AWD',
    year: '2020년',
    mileage: '77,458km',
    price: '3,800만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJK240627007167',
    carName: '2023 GV70 가솔린 2.5 터보 AWD',
    year: '2022년',
    mileage: '28,988km',
    price: '4,840만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJJ240620006906',
    carName: '2024 G80 가솔린 2.5 터보 AWD',
    year: '2023년',
    mileage: '12,960km',
    price: '5,880만원',
    location: '용인',
    status: '판매완료'
  },
  {
    id: 'HIG240814008259',
    carName: '2023 그랜저(IG) 하이브리드',
    year: '2022년',
    mileage: '47,819km',
    price: '3,530만원',
    location: '양산',
    status: '판매중'
  },
  {
    id: 'GJJ240906008810',
    carName: '2021 G80 가솔린 2.5 터보 AWD',
    year: '2020년',
    mileage: '77,458km',
    price: '3,800만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJK240627007167',
    carName: '2023 GV70 가솔린 2.5 터보 AWD',
    year: '2022년',
    mileage: '28,988km',
    price: '4,840만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJJ240620006906',
    carName: '2024 G80 가솔린 2.5 터보 AWD',
    year: '2023년',
    mileage: '12,960km',
    price: '5,880만원',
    location: '용인',
    status: '판매완료'
  },
  {
    id: 'HIG240814008259',
    carName: '2023 그랜저(IG) 하이브리드',
    year: '2022년',
    mileage: '47,819km',
    price: '3,530만원',
    location: '양산',
    status: '판매중'
  },
  {
    id: 'GJJ240906008810',
    carName: '2021 G80 가솔린 2.5 터보 AWD',
    year: '2020년',
    mileage: '77,458km',
    price: '3,800만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJK240627007167',
    carName: '2023 GV70 가솔린 2.5 터보 AWD',
    year: '2022년',
    mileage: '28,988km',
    price: '4,840만원',
    location: '용인',
    status: '판매중'
  },
  {
    id: 'GJJ240620006906',
    carName: '2024 G80 가솔린 2.5 터보 AWD',
    year: '2023년',
    mileage: '12,960km',
    price: '5,880만원',
    location: '용인',
    status: '판매완료'
  },
  {
    id: 'HIG240814008259',
    carName: '2023 그랜저(IG) 하이브리드',
    year: '2022년',
    mileage: '47,819km',
    price: '3,530만원',
    location: '양산',
    status: '판매중'
  },
  {
    id: 'GJJ240906008810',
    carName: '2021 G80 가솔린 2.5 터보 AWD',
    year: '2020년',
    mileage: '77,458km',
    price: '3,800만원',
    location: '용인',
    status: '판매중'
  },
];

function RecentTransaction() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default RecentTransaction;