import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SidebarProvider, useSidebar } from "../hooks/useSidebar";

const SidebarToggle = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-40 md:hidden bg-blue-500 text-white p-2 rounded-md"
      aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
    >
      {isOpen ? (
        /* Close (X) icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        /* Hamburger menu icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
};

const RootLayoutContent = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 overflow-auto text-[var(--text)]">
        <SidebarToggle />
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => useSidebar().toggle()}
          />
        )}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const RootLayout = () => {
  return (
    <SidebarProvider>
      <RootLayoutContent />
    </SidebarProvider>
  );
};

export default RootLayout;
