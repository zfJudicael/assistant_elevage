import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  HeartPulse,
  Component
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">

        {/* ---- Logo ---- */}
        <div className="px-5 py-5 border-b border-gray-100">
            <h1 className="text-xl font-bold text-green-800 tracking-tight">
            Taiza Akoho
            </h1>
        </div>

        {/* ---- Profil ---- */}
        <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                        Jhon Doe
                    </p>
                    <p className="text-xs text-gray-500 truncate">Poultry Technician</p>
                  </div>
                </div>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
            <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                font-medium transition-all duration-200 text-left 
                ${
                isActive ? "bg-green-800 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`
            }
            >
                <LayoutDashboard/>
                Dashboard
            </NavLink>

            <NavLink
            to="/group"
            className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                font-medium transition-all duration-200 text-left 
                ${
                isActive ? "bg-green-800 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`
            }
            >
                <Component />
                Groups
            </NavLink>

            <NavLink
            to="/health"
            className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                font-medium transition-all duration-200 text-left 
                ${
                isActive ? "bg-green-800 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`
            }
            >
                <HeartPulse />
                Santé
            </NavLink>
        </nav>
    </aside>
  );
}