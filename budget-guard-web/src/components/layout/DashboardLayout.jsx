import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}