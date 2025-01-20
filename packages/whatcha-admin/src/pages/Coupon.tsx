import { useState } from 'react';
import CouponTable from "../components/coupon/CouponTable";
import CouponModal from "../components/coupon/CouponModal";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import CouponDelete from '../components/coupon/CouponDelete';

function Coupon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const handleDelete = (couponIds: number[]) => {
    setSelectedCouponIds(couponIds);
  };

  const handleDeleteClick = () => {
    if (selectedCouponIds.length > 0) {
      setIsDeleteModalOpen(true);
    }
  };

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
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-2 py-1.5 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                <PlusIcon className="w-3 h-3 mr-1" />
                쿠폰 등록
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={selectedCouponIds.length === 0}
                className={`inline-flex items-center px-2 py-1.5 text-sm duration-400 font-semibold text-white rounded-md
          ${
            selectedCouponIds.length === 0
              ? "bg-gray-400 cursor-not-allowed duration-300"
              : "bg-red-500 hover:bg-red-600 duration-300" 
          }`}
              >
                <TrashIcon className="w-3 h-3 mr-1" />
                쿠폰 삭제 ({selectedCouponIds.length})
              </button>
            </div>
          </div>
          <CouponTable onDelete={handleDelete} />
        </div>
      </div>
      <CouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CouponDelete
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCouponIds([]);
        }}
        couponIds={selectedCouponIds}
      />
    </div>
  );
}

export default Coupon