import { Outlet } from "react-router-dom";
import SideMenu from "./components/common/SideMenu";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


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
    <div className="flex">
      <SideMenu />
      <main className="w-5/6 min-h-screen p-6 bg-gray-50">
          <Outlet />
      </main>
    </div>
    </QueryClientProvider>
  );
}

export default App;