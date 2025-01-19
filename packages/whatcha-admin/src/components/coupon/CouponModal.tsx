import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AddCouponRequest} from '../../api/coupon';
import { useAddCoupon } from '../../hooks/useCoupon';


interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 초기값 설정
const CouponModal = ({ isOpen, onClose }: CouponModalProps): JSX.Element => {
  const { mutate: addCouponMutation } = useAddCoupon();

  const [formData, setFormData] = useState<AddCouponRequest>({
    couponCode: '',
    couponName: '',
    discountPercentage: null,
    discountAmount: null,
    maxDiscountAmount: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCouponMutation(formData);
      onClose();
    } catch (error) {
      console.error('쿠폰 등록 실패:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  쿠폰 등록
                </Dialog.Title>
                
                {/* 모달 입력 폼 */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      쿠폰명
                    </label>
                    <input
                      type="text"
                      name="couponName"
                      value={formData.couponName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      할인율 (%)
                    </label>
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      최대 할인 금액
                    </label>
                    <input
                      type="number"
                      name="maxDiscountAmount"
                      value={formData.maxDiscountAmount}
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-md"
                      required 
                    />
                  </div>

                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:duration-500 hover:bg-red-400"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                      등록
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CouponModal;