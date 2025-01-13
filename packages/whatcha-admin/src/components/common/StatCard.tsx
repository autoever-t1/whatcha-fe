  interface StatCardProps {
    title: string;
    value: string | number;
    percent?: number;
    icon?: React.ReactNode;
  }
  
  function StatCard({ title, value, percent, icon }: StatCardProps) {

    //숫자 단위 포매팅팅
    const formatNumber = (num: string | number) => {
      if (typeof num === 'number') {
        return num.toLocaleString();
      }
      const parsed = parseInt(num);
      return isNaN(parsed) ? num : parsed.toLocaleString();
    };

    return (
      <div className="p-6 transition-shadow-lg duration-300 bg-white shadow-md rounded-xl hover:shadow-lg min-h-[160px] h-full relative">
        {icon && (
          <div className="absolute p-2 text-gray-900 bg-gray-200 rounded-lg top-5 right-5">
            {icon}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center justify-between pt-10">
            <span className="text-2xl font-bold text-gray-900">{formatNumber(value)}</span>
            {percent && (
              <span 
                className={`px-2.5 py-1 text-sm rounded-lg ${
                  percent > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {percent > 0 ? '+' : ''}{percent}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default StatCard;