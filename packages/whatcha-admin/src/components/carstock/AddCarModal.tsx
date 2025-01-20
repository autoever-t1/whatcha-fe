import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useRegisterCar } from '../../hooks/useCarStock';
import { CarRegistrationData } from '../../api/carstock';
import { format, parse } from 'date-fns';
import { CircularProgress } from '@mui/material';
import MainImageUpload from './MainImageUpload';


interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchStoreId: number;
}

export default function AddCarModal({ isOpen, onClose, branchStoreId }: AddCarModalProps) {
  const { mutate, isPending } = useRegisterCar(branchStoreId);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CarRegistrationData>({
    driveType: "AWD",
    engineCapacity: 2300,  
    exteriorColor: "",   
    fuelType: "가솔린",   
    goodsNo: "",
    interiorColor: "",   
    mainImage: "",
    mileage: "",   
    modelName: "",   
    modelType: "SUV",   
    passengerCapacity: 5,   
    price: 0,
    registrationDate: "",   
    transmission: "자동",   
    vhclRegNo: "",   
    years: "2023",
    model: {    
      modelName: "",    
      modelType: "SUV",    
      factoryPrice: 0,    
      orderCount: 0  
    },
    option: {    
      hasNavigation: false,    
      hasHiPass: false,    
      hasHeatedSteeringWheel: false,    
      hasHeatedSeats: false,    
      hasVentilatedSeats: false,    
      hasPowerSeats: false,    
      hasLeatherSeats: false,    
      hasPowerTrunk: false,    
      hasSunroof: false,    
      hasHUD: false,    
      hasSurroundViewMonitor: false,    
      hasRearMonitor: false,    
      hasBlindSpotWarning: false,    
      hasLaneDepartureWarning: false,    
      hasSmartCruiseControl: false,    
      hasFrontParkingWarning: false  
    },
    branchStoreId: 1,
    colorId: 1
  });

  const optionLabels: Record<string, string> = {
    hasNavigation: "내비게이션",
    hasHiPass: "하이패스",
    hasHeatedSteeringWheel: "열선 스티어링 휠",
    hasHeatedSeats: "열선 시트",
    hasVentilatedSeats: "통풍 시트",
    hasPowerSeats: "전동 시트",
    hasLeatherSeats: "가죽 시트",
    hasPowerTrunk: "전동 트렁크",
    hasSunroof: "선루프",
    hasHUD: "헤드업 디스플레이",
    hasSurroundViewMonitor: "서라운드 뷰 모니터",
    hasRearMonitor: "후방 모니터",
    hasBlindSpotWarning: "후측방 경보",
    hasLaneDepartureWarning: "차선이탈 경고",
    hasSmartCruiseControl: "스마트 크루즈",
    hasFrontParkingWarning: "전방 주차 경고"
  };

  const goodsNoLabels: Record<string, string> = {
    HIG240814008259: "그랜저 화이트",
    GJK240927009126: "GV70 화이트",
    HDN240905008745: "쏘나타 블랙",
    HCN240905008744: "아반떼 화이트",
    GJJ240927009085: "G80 블랙",
    HIG241011009528: "그랜저 블랙",
    GJX241118010497: "GV80 화이트",
    HLX240913008920: "팰리세이드 화이트",
    HMX240902008668: "싼타페 블랙",
    HOS241126010697: "코나 화이트",
    HCN241219011138: "아반떼 블랙",
    HNX240919008990: "투싼 블랙",
    GJX250109011485: "GV80 블랙",
    HAX250103011412: "캐스퍼 그레이",
    GJJ240403005183: "G80터보 블루",
    HUS241202010790: "스타리아 블랙",
  };

  const colorLabels: Record<string, string> = {
    1: "화이트",
    2: "베이지",
    3: "실버",
    4: "그레이",
    5: "블랙",
    6: "브라운",
    7: "레드",
    8: "오렌지",
    9: "옐로우",
    10: "그린",
    11: "블루",
    12: "퍼플",

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type} = e.target;
  
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          // @ts-ignore
          ...prev[parent],
          [child]: type === 'number' ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    };
  };
    
  // const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     model: {
  //       ...prev.model,
  //       [name]: value
  //     }
  //   }));
  // };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      option: {
        ...prev.option,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    mutate(formData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        setError("차량 등록에 실패했습니다.");
        console.error("등록 실패:", error);
      }
    });
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    return format(new Date(date), 'yyyy.MM.dd');
  };
  
  const parseDate = (dateString: string) => {
    if (!dateString) return '';
    const date = parse(dateString, 'yyyy.MM.dd', new Date());
    return format(date, 'yyyy-MM-dd'); 
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-4xl p-6 bg-white rounded-lg max-h-[90vh] overflow-y-auto scrollbar-none">
          
          <Dialog.Title className="mb-4 text-lg font-medium text-gray-900">
            차량 등록
          </Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 space-y-6"
          >
            {/* 기본 정보 */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 mb-6 space-y-4 bg-gray-100 rounded-md ">
                <h3 className="text-lg font-medium text-gray-700">기본 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      구동방식
                    </label>
                    <select
                      name="driveType"
                      value={formData.driveType}
                      onChange={handleInputChange}
                      className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-md"
                      required
                    >
                      <option value="AWD">AWD</option>
                      <option value="2WD">2WD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      차량번호판
                    </label>
                    <input
                      type="text"
                      name="vhclRegNo"
                      value={formData.vhclRegNo}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </div>
                  <label className="block text-base font-medium text-gray-700">
                    360view
                    <select
                      name="goodsNo"
                      value={formData.goodsNo}
                      onChange={handleInputChange}
                      className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-md"
                      required
                    >
                      <option value="">선택하세요</option>
                      {Object.entries(goodsNoLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      모델명
                    </label>
                    <input
                      type="text"
                      name="modelName"
                      value={formData.modelName}
                      onChange={(e) => {
                        const updatedValue = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          modelName: updatedValue,
                          model: {
                            ...prev.model,
                            modelName: updatedValue,
                          },
                        }));
                      }}
                      className="inputcss"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      차량
                    </label>
                    <select
                      name="modelType"
                      value={formData.modelType}
                      onChange={(e) => {
                        const updatedValue = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          modelType: updatedValue,
                          model: {
                            ...prev.model,
                            modelType: updatedValue,
                          },
                        }));
                      }}
                      className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-md"
                      required
                    >
                      <option value="SUV">SUV</option>
                      <option value="승용">승용</option>
                      <option value="승합">승합</option>
                      <option value="EV">EV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      연식
                    </label>
                    <input
                      type="number"
                      name="years"
                      value={formData.years}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      등록일
                    </label>
                    <input
                      type="date"
                      name="registrationDate"
                      value={parseDate(formData.registrationDate)}
                      onChange={(e) => {
                        const formattedDate = formatDate(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          registrationDate: formattedDate,
                        }));
                      }}
                      className="inputcss"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      차량 가격 (원)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      신차 출고가 (원)
                    </label>
                    <input
                      type="number"
                      name="model.factoryPrice"
                      value={formData.model.factoryPrice}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      배기량 (cc)
                    </label>
                    <input
                      type="number"
                      name="engineCapacity"
                      value={formData.engineCapacity}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <label className="block text-base font-medium text-gray-700">
                    외장색상
                    <input
                      type="text"
                      name="exteriorColor"
                      value={formData.exteriorColor}
                      onChange={handleInputChange}
                      className="inputcss"
                      placeholder="색상 ex) 크리미 화이트 펄"
                      required
                    />
                  </label>
                  <label className="block text-base font-medium text-gray-700">
                    내장색상
                    <input
                      type="text"
                      name="interiorColor"
                      value={formData.interiorColor}
                      onChange={handleInputChange}
                      className="inputcss"
                      placeholder="색상 ex) 베이지"
                      required
                    />
                  </label>
                  <label className="block text-base font-medium text-gray-700">
                    색상 코드
                    <select
                      name="colorId"
                      value={formData.colorId}
                      onChange={handleInputChange}
                      className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-md"
                      required
                    >
                      <option value="">선택하세요</option>
                      {Object.entries(colorLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <label className="block text-base font-medium text-gray-700">
                    주행거리(km)
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </label>

                  <label className="block text-base font-medium text-gray-700">
                    승차인원
                    <input
                      type="number"
                      name="passengerCapacity"
                      value={formData.passengerCapacity}
                      onChange={handleInputChange}
                      className="inputcss"
                      required
                    />
                  </label>
                  <label className="block text-base font-medium text-gray-700">
                    차종
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-md"
                      required
                    >
                      <option value="가솔린">가솔린</option>
                      <option value="하이브리드">하이브리드</option>
                      <option value="가솔린">가솔린</option>
                      <option value="전기">전기</option>
                    </select>
                  </label>
                  <label className="block text-base font-medium text-gray-700">
                    변속기
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="block w-full p-1 mt-1 border-gray-300 rounded-md shadow-md"
                      required
                    >
                      <option value="자동">자동</option>
                      <option value="수동">수동</option>
                    </select>
                  </label>
                </div>
                <label className="block text-lg font-medium text-gray-700">
                  메인 이미지
                  <MainImageUpload
                    onImageUpload={(imageUrl) => {
                      setFormData((prev) => ({
                        ...prev,
                        mainImage: imageUrl,
                      }));
                    }}
                  />
                </label>
              </div>

              {/* 옵션 섹션 */}
              <div className="p-4 mb-2 space-y-4 bg-gray-100 rounded-md">
                <h3 className="block text-base font-medium text-gray-700">
                  옵션 정보
                </h3>
                <div className="grid grid-cols-4 gap-4 text-lg font-semibold">
                  {Object.entries(formData.option).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={key}
                        checked={value}
                        onChange={handleOptionChange}
                        className="w-5 h-5 transition-colors duration-200 border-2 border-gray-300 rounded-full appearance-none checked:bg-blue-400 hover:border-purple-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {optionLabels[key] || key}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="block text-base font-medium text-gray-700">
                  지점 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="branchStoreId"
                    value={formData.branchStoreId}
                    onChange={handleInputChange}
                    className="w-full border-2 rounded-md hover:bg-gray-100 focus:ring-gray-200"
                    required
                  >
                    <option value={1}>현대자동차 인증중고센터 용인</option>
                    <option value={2}>현대자동차 인증중고센터 양산</option>
                    <option value={3}>현대자동차 인증중고센터 군산</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sticky p-2 mt-2 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {error && (
                  <div className="ml-1 text-base font-medium text-red-600">
                    ⚠️ {error}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-red-50"
                  disabled={isPending}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 disabled:opacity-50 min-w-[100px]"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <CircularProgress size={16} thickness={4} className="text-red-700" />
                      등록 중...
                    </span>
                  ) : (
                    "등록하기"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

          {isPending && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <CircularProgress />
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}