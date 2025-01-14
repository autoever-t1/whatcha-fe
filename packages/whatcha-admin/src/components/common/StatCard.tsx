import { motion } from 'framer-motion';  
  
  interface StatCardProps {
    title: string;
    value: string | number;
    percent?: number;
    icon?: React.ReactNode;
    index?: number;
  }
  
  function StatCard({ title, value, percent, icon, index = 0 }: StatCardProps) {

    const formatNumber = (num: string | number) => {
      if (typeof num === 'number') {
        return num.toLocaleString();
      }
      const parsed = parseInt(num);
      return isNaN(parsed) ? num : parsed.toLocaleString();
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut"
        }}
        className="p-5 transition-shadow-lg duration-300 bg-white shadow-md rounded-xl hover:shadow-lg min-h-[160px] h-full relative"
      >
        {icon && (
          <div className="absolute p-2 text-gray-900 bg-gray-200 rounded-lg top-5 right-5">
            {icon}
          </div>
        )}
        <div className="space-y-7">
          <div>
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center justify-between pt-10">
            <span className="text-xl font-bold text-gray-900">{formatNumber(value)}</span>
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
      </motion.div>
    );
  }
  
  export default StatCard;