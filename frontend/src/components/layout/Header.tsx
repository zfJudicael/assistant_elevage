import { Bell, User, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Header() {
    const { searchQuery, setSearchQuery, notifications } = useApp();

    return (
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-80">
                <Search size={16} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none flex-1"
                />
            </div>
            <div className="flex items-center gap-2">
                <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Bell size={20} />
                    {notifications > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[10px] rounded-full">
                            {notifications}
                        </span>
                    )}
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <User size={20} />
                </button>
            </div>
        </header>
    );
}
