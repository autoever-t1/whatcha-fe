import ContractDateChart from '../components/order/ContractDateChart';

function Order() {
  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
        <p className="mt-1 mb-8 text-gray-500">주문 현황</p>
      </div>

      {/* 차트 영역 */}
      <div className="mb-8 bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">날짜별 계약 건수</h2>
          <ContractDateChart />
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">거래 내역</h2>
        </div>
      </div>
    </div>
  );
}

export default Order;