import { Outlet } from "react-router-dom";
import SideMenu from "./components/common/SideMenu";

function App() {
  return (
    <div className="flex">
      <SideMenu />
      <main className="w-5/6 min-h-screen p-6 bg-gray-50">
          <Outlet />
      </main>
    </div>
  );
}

export default App;