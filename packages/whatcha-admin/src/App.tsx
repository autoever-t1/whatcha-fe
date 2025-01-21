import { Outlet } from "react-router-dom";
import SideMenu from "./components/common/SideMenu";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Logout from "./components/common/Logout";
import { ToastContainer } from 'react-toastify';
import { NotificationHandler } from './components/common/NotificationHandler';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, 
      // staleTime: 3 * 60 * 1000, 
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <div className="flex">
        <ProtectedRoute>
          <NotificationHandler />
          <Logout />
          <SideMenu />
          <main className="ml-[16.666667%] flex-1 min-h-screen p-6 bg-gray-50">
            <Outlet />
          </main>
        </ProtectedRoute>
      </div>
    </QueryClientProvider>
  );
}

export default App;