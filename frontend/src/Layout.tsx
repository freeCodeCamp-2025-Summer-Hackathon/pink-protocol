import { Outlet } from "react-router-dom";
import { Sidebar } from "./pages/sidebar/Sidebar";

export const Layout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar/>
      <main className="flex-1 p-8">
        <Outlet/>
      </main>
    </div>
  );
};
