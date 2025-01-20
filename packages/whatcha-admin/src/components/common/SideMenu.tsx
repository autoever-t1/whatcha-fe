import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  TicketIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: '대시보드', path: '/', icon: <HomeIcon className="w-6 h-6" /> },
  { name: '주문 관리', path: '/order', icon: <ShoppingCartIcon className="w-6 h-6" /> },
  { name: '회원 관리', path: '/member', icon: <UserGroupIcon className="w-6 h-6" /> },
  { name: '쿠폰 관리', path: '/coupon', icon: <TicketIcon className="w-6 h-6" /> },
  { name: '매물 관리', path: '/stock', icon: <TruckIcon className="w-6 h-6" /> },
];

function SideMenu() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 w-1/6 min-h-screen bg-white border-gray-100">
      <div className="p-6 text-center">
        <span className='text-3xl font-extrabold text-blue-900'>WHAT</span>
        <span className='text-3xl font-extrabold text-gray-900'>CHA</span>
        
        
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-10 py-3 text-gray-700 hover:bg-gray-50 ${
              location.pathname === item.path ? 'bg-gray-100' : ''
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SideMenu;