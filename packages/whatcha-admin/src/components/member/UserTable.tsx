import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { format} from 'date-fns';
import { ko } from 'date-fns/locale';


interface User {
  userId: number;
  name: string;
  email: string;
  address: string;
  userType: string;
  phone: string;
  isNotificationAgreed: boolean;
  isLocationAgreed: boolean;
  createdAt: string;
  updatedAt: string;
}

const columns: GridColDef[] = [
  { field: 'userId', headerName: '회원 ID', width: 100 },
  { field: 'name', headerName: '이름', width: 120 },
  { field: 'email', headerName: '이메일', width: 200 },
  { field: 'phone', headerName: '연락처', width: 150 },
  { field: 'address', headerName: '주소', width: 250 },
  { field: 'userType', headerName: '회원 유형', width: 120 },
  { 
    field: 'isNotificationAgreed', 
    headerName: '알림 동의', 
    width: 120,
    renderCell: (params) => params.value ? '동의' : '미동의'
  },
  { 
    field: 'isLocationAgreed', 
    headerName: '위치 동의', 
    width: 120,
    renderCell: (params) => params.value ? '동의' : '미동의'
  },
  {
    field: 'createdAt',
    headerName: '가입일',
    width: 120,
    renderCell: (params) => format(new Date(params.value), 'yyyy-MM-dd', { locale: ko })
  },
];

const sampleData: User[] = [
  {
    userId: 1,
    name: "홍길동",
    email: "hong@example.com",
    address: "서울시 강남구",
    userType: "일반회원",
    phone: "010-1234-5678",
    isNotificationAgreed: true,
    isLocationAgreed: false,
    createdAt: "2022-12-12",
    updatedAt: "2024-03-14"
  },
  {
    userId: 2,
    name: "홍길동",
    email: "hong@example.com",
    address: "서울시 강남구",
    userType: "일반회원",
    phone: "010-1234-5678",
    isNotificationAgreed: true,
    isLocationAgreed: false,
    createdAt: "2021-06-12",
    updatedAt: "2024-03-14"
  },
  {
    userId: 3,
    name: "홍길동",
    email: "hong@example.com",
    address: "서울시 강남구",
    userType: "일반회원",
    phone: "010-1234-5678",
    isNotificationAgreed: true,
    isLocationAgreed: false,
    createdAt: "2023-06-12",
    updatedAt: "2024-03-14"
  },
  {
    userId: 4,
    name: "홍길동",
    email: "hong@example.com",
    address: "서울시 강남구",
    userType: "일반회원",
    phone: "010-1234-5678",
    isNotificationAgreed: true,
    isLocationAgreed: false,
    createdAt: "2022-12-12",
    updatedAt: "2024-03-14"
  },
  {
    userId: 5,
    name: "홍길동",
    email: "hong@example.com",
    address: "서울시 강남구",
    userType: "일반회원",
    phone: "010-1234-5678",
    isNotificationAgreed: true,
    isLocationAgreed: false,
    createdAt: "2022-08-12",
    updatedAt: "2024-03-14"
  },
];

function UserTable() {
  return (
    <div className="w-full">
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={sampleData}
          columns={columns}
          getRowId={(row) => row.userId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default UserTable;