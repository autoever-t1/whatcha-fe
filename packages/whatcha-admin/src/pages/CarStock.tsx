import CarStockTable from '../components/carstock/CarStockTable';

function CarStock() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">매물 관리</h1>
        <p className="mt-1 text-gray-500">매물 현황</p>
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white rounded-lg shadow-sm">
          <CarStockTable />
        </div>
      </div>
  );
}

export default CarStock