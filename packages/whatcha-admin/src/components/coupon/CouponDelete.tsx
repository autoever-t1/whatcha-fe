import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDeleteCoupon } from '../../hooks/useCoupon'

interface CouponDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    couponIds: number[];
  }

export default function CouponDelete({ isOpen, onClose, couponIds }: CouponDeleteProps) {
  const { mutate: deleteCouponMutation } = useDeleteCoupon()

  const handleDelete = async () => {
    try {
      await Promise.all(couponIds.map(id => deleteCouponMutation(id)));
      onClose();
    } catch (error) {
      console.error('쿠폰 삭제 실패:', error);
    }
  };


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                쿠폰 삭제
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  선택한 {couponIds.length}개의 쿠폰을 삭제하시겠습니까?
                </p>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={onClose}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}