import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Set initial state based on screen size
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if screen is larger than mobile breakpoint (768px for md)
    const isMediumScreen = window.matchMedia("(min-width: 768px)").matches;
    setIsOpen(isMediumScreen);

    // Update state when window is resized
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => {
      setIsOpen(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
