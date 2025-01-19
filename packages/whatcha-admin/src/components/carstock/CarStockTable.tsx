import { useState,useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useBranchStores, useBranchStoreUsedCars } from '../../hooks/useCarStock';

const columns: GridColDef[] = [
  { field: 'vhclRegNo', headerName: '차량 번호', width: 120 },
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
  { field: 'status', headerName: '상태', width: 130,
    renderCell: (params) => (
      <span className={`px-2 py-1.5 text-xs rounded-lg ${
        params.value === '구매 가능' 
          ? 'bg-blue-200 text-blue-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {params.value}
      </span>
    )
   },
];

function CarStockTable() {
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchField, setSearchField] = useState('vhclRegNo');
  const { data: branches = [] } = useBranchStores();
  const { data: usedCars = [], isLoading } = useBranchStoreUsedCars(selectedBranch);

  const filteredCars = useMemo(() => {
    if (!searchValue) return usedCars;
    return usedCars.filter(car => {
      const searchTarget = String(car[searchField]).toLowerCase();
      return searchTarget.includes(searchValue.toLowerCase());
    });
  }, [usedCars, searchValue, searchField]);

    const CustomNoRowsOverlay = () => (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">
          {selectedBranch === 0 
            ? "지점을 선택해주세요" 
            : "등록된 매물이 없습니다"}
        </p>
      </div>
    );
  
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">매물 관리</h2>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="px-2 py-2 border rounded-md"
                >
                  <option value="vhclRegNo">차량 번호</option>
                  <option value="modelName">모델명</option>
                </select>
                <input
                  type="text"
                  placeholder={`${
                    searchField === 'vhclRegNo' ? '차량번호' : '모델명'
                  } 검색`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-48 px-3 py-2 border rounded-md"
                />
              </div>
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
          </div>
          
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredCars}
              columns={columns}
              getRowId={(row) => row.usedCarId}
              loading={isLoading}
              disableRowSelectionOnClick
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </div>
        </div>
      </div>
    );
}
  
  export default CarStockTable;