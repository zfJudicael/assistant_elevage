import { Phone, Video, MoreVertical } from "lucide-react";
import { useApp } from "../../context/AppContext";
import MessageInput from "./MessageInput";
import Spinner from "../ui/Spinner";

export default function ChatWindow() {
    const {
        conversations,
        technicians,
        messagesByConversation,
        messagesLoading,
        activeConversation,
    } = useApp();

    const allConvs = [...conversations, ...technicians];
    const conv = allConvs.find((c) => c.id === activeConversation);
    const msgs = activeConversation != null ? messagesByConversation[activeConversation] || [] : [];

    if (!conv) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                Select a conversation
            </div>
        );
    }

    const isConversation = "isAlert" in conv;

    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    {isConversation && (conv as any).isAlert ? (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-xl">
                            ⚠️
                        </div>
                    ) : (conv as any).avatar ? (
                        <img
                            src={(conv as any).avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : null}
                    <div>
                        <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                        {(conv as any).activeTechnicians && (
                            <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                                {(conv as any).activeTechnicians} Techniciens actifs
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 text-gray-500">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <Phone size={18} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <Video size={18} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <div className="text-center text-xs text-gray-400 font-medium">AUJOURD'HUI</div>

                {messagesLoading && msgs.length === 0 ? (
                    <Spinner label="Chargement des messages..." />
                ) : (
                    msgs.map((msg) => {
                        if (msg.type === "automated") {
                            return (
                                <div
                                    key={msg.id}
                                    className="bg-red-50 border border-red-100 rounded-lg p-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-600 text-sm font-bold">
                                            📊 {msg.title}
                                        </span>
                                        <button className="ml-auto text-xs text-green-700 font-medium hover:underline">
                                            {msg.actionLabel}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{msg.subtitle}</p>
                                </div>
                            );
                        }

                        if (msg.isMe) {
                            return (
                                <div key={msg.id} className="flex justify-end gap-2">
                                    <div>
                                        <p className="text-xs text-gray-400 text-right mb-1">
                                            {msg.time} <strong>{msg.sender}</strong>
                                        </p>
                                        <div className="bg-green-800 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2 max-w-sm">
                                            {msg.text}
                                        </div>
                                    </div>
                                    {msg.avatar && (
                                        <img
                                            src={msg.avatar}
                                            alt=""
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={msg.id} className="flex gap-2">
                                {msg.avatar && (
                                    <img
                                        src={msg.avatar}
                                        alt=""
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">
                                        <strong className="text-gray-700">{msg.sender}</strong>{" "}
                                        {msg.time}
                                    </p>
                                    {msg.type === "image" ? (
                                        <img
                                            src={msg.image}
                                            alt=""
                                            className="max-w-xs rounded-lg"
                                        />
                                    ) : (
                                        <div className="bg-gray-100 text-gray-800 text-sm rounded-2xl rounded-tl-sm px-4 py-2 max-w-sm">
                                            {msg.text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <MessageInput conversationId={conv.id} />
        </div>
    );
}
