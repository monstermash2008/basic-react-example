import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
