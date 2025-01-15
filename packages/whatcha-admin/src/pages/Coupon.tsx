import { useState } from 'react';
import CouponTable from "../components/coupon/CouponTable";
import CouponModal from "../components/coupon/CouponModal";
import { PlusIcon } from '@heroicons/react/24/outline';


function Coupon() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">쿠폰 관리</h1>
        <p className="mt-1 text-gray-500">쿠폰 현황</p>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">쿠폰 관리</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-2 py-1 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              쿠폰 등록
            </button>
          </div>
          <CouponTable />
        </div>
      </div>
      <CouponModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default Coupon