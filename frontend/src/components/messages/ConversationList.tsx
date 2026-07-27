import { Edit } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ConversationList() {
    const { conversations, technicians, activeConversation, setActiveConversation } = useApp();

    const itemClass = (isActive: boolean) =>
        `flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 ${
            isActive ? "bg-green-50" : "hover:bg-gray-50"
        }`;

    return (
        <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Discussions</h2>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Edit size={18} />
                </button>
            </div>

            {conversations.map((conv) => (
                <div
                    key={conv.id}
                    className={itemClass(activeConversation === conv.id)}
                    onClick={() => setActiveConversation(conv.id)}
                >
                    <div
                        className="w-10 h-10 flex items-center justify-center rounded-full text-lg flex-shrink-0"
                        style={{ backgroundColor: conv.iconBg }}
                    >
                        {conv.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 truncate">
                                {conv.name}
                            </span>
                            <span
                                className={`text-xs flex-shrink-0 ${conv.isLive ? "text-red-500 font-semibold" : "text-gray-400"}`}
                            >
                                {conv.time}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                    </div>
                </div>
            ))}

            <p className="px-4 py-2 text-xs font-semibold text-gray-400">TECHNICIENS</p>
            {technicians.map((tech) => (
                <div
                    key={tech.id}
                    className={itemClass(activeConversation === tech.id)}
                    onClick={() => setActiveConversation(tech.id)}
                >
                    <div className="relative flex-shrink-0">
                        <img
                            src={tech.avatar}
                            alt={tech.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        {tech.online && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 truncate block">
                            {tech.name}
                        </span>
                        <p className="text-xs text-gray-500 truncate">{tech.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
