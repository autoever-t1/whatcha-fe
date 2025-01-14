function CarStock() {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">매물 관리</h1>
      <p className="mt-1 mb-8 text-gray-500">매물 현황</p>
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-3">
          <h2 className="mb-4 text-lg font-semibold">매물 통계</h2>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">매물 관리</h2>
        </div>
      </div>
    </div>
  );
}

export default CarStock