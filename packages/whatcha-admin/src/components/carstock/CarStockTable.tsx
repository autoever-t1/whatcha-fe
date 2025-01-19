import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useBranchStores, useBranchStoreUsedCars } from '../../hooks/useCarStock';

const columns: GridColDef[] = [
  { field: 'usedCarId', headerName: 'ID', width: 50 },
  { field: 'modelName', headerName: '모델명', width: 300 },
  { 
    field: 'price', 
    headerName: '가격', 
    width: 130,
    renderCell: (params) => (
        <span>{params.value?.toLocaleString()}원</span>
      )
  },
  { field: 'registrationDate', headerName: '등록일', width: 130 },
  { field: 'mileage', headerName: '주행거리', width: 130,
    renderCell: (params) => (
        <span>{params.value?.toLocaleString()}km</span>
      )
   },
  { field: 'status', headerName: '상태', width: 130 },
];

function CarStockTable() {
    const [selectedBranch, setSelectedBranch] = useState<number>(0);
    const { data: branches = [] } = useBranchStores();
    const { data: usedCars = [], isLoading } = useBranchStoreUsedCars(selectedBranch);
  
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">매물 관리</h2>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(Number(e.target.value))}
              className="px-3 py-2 border rounded-md"
            >
              <option value={0}>지점 선택</option>
              {branches.map((branch) => (
                <option key={branch.branchStoreId} value={branch.branchStoreId}>
                  {branch.branchStoreName}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={usedCars}
              columns={columns}
              getRowId={(row) => row.usedCarId}
              loading={isLoading}
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default CarStockTable;