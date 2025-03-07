import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 overflow-auto text-[var(--text)]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
