import { useState, type KeyboardEvent } from "react";
import { PlusCircle, Image, FileText, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function MessageInput({ conversationId }: { conversationId: number }) {
    const { sendMessage } = useApp();
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!text.trim() || sending) return;
        setSending(true);
        try {
            await sendMessage(conversationId, text.trim());
            setText("");
        } finally {
            setSending(false);
        }
    };

    const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-gray-100 p-3">
            <div className="bg-gray-50 rounded-xl px-3 py-2">
                <textarea
                    className="w-full bg-transparent resize-none text-sm outline-none"
                    placeholder="Tapez un message ou partagez un rapport..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKey}
                    rows={1}
                />
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="flex gap-3 text-gray-500">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <PlusCircle size={20} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <Image size={20} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <FileText size={20} />
                    </button>
                </div>
                <button
                    className="p-2 rounded-lg bg-green-800 text-white hover:bg-green-900 disabled:opacity-50"
                    onClick={handleSend}
                    disabled={!text.trim() || sending}
                >
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
}
