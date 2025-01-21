import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('at');
    navigate('/login');
  };

  return (
    <div className="absolute z-50 p-4 right-2 top-2">
      <button
        onClick={handleLogout}
        className="px-2 py-1.5 text-sm font-medium text-white bg-gray-400 rounded-lg duration-300 hover:bg-gray-500"
      >
        로그아웃
      </button>
    </div>
  );
};

export default Logout;