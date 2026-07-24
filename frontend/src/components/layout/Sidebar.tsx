import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Component, Settings, HelpCircle, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { RoosterLogo } from "./AkohoHeader";

const navItems = [
    { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { to: "/groups", label: "Groupes", icon: Component },
    // { to: "/health", label: "Santé", icon: HeartPulse },
    // { to: "/messages", label: "Messages", icon: MessageSquare },
];

export default function Sidebar() {
    const { currentUser, currentUserLoading } = useApp();
    const navigate = useNavigate();

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <Link
                to="/"
                className="flex items-center gap-2 justify-center px-5 py-4 border-b border-gray-100"
            >
                <RoosterLogo />
                <div className="flex flex-col leading-tight">
                    <span className="font-serif text-2xl font-semibold text-primary">
                        Taiza Akoho
                    </span>
                </div>
            </Link>

            {/* Profil */}
            <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                    {currentUserLoading ? (
                        <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
                    ) : currentUser?.avatar ? (
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-green-800 text-white rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 text-md font-bold ">
                            LI
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                            {currentUserLoading ? "…" : currentUser?.name || "Lorem Ipsum"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {currentUserLoading ? "" : currentUser?.role || "Technicien "}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
              font-medium transition-all duration-200 text-left
              ${isActive ? "bg-green-800 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`
                        }
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Enregistrer + pied de page */}
            <div className="px-3 py-4 border-t border-gray-100 space-y-1">
                <button
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-green-800 text-white hover:bg-green-900 mb-2"
                    onClick={() => navigate("/register-batch")}
                >
                    <Plus size={16} />
                    Enregistrer un nouveau lot
                </button>

                <NavLink
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                    <Settings size={16} />
                    Paramètres
                </NavLink>
                <NavLink
                    to="/support"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                    <HelpCircle size={16} />
                    Support
                </NavLink>
            </div>
        </aside>
    );
}
