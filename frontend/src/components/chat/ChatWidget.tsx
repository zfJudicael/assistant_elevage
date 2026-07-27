// ChatWidget.jsx
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        /* Conteneur fixé en bas à droite */
        <div className="fixed bottom-5 right-5 z-50 flex items-end gap-2 pointer-events-auto">
            {/* Panneau du Chat : prend toute la hauteur disponible jusqu'en haut */}
            {isOpen && (
                <div className="h-[650px] max-h-[85vh] w-96 bg-white rounded-2xl shadow-2xl border flex flex-col pointer-events-auto overflow-hidden">
                    <ChatPanel />
                </div>
            )}

            {/* Bouton : reste à droite du panneau, calé en bas */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-14 h-14 rounded-full bg-green-900 text-white flex items-center justify-center shadow-lg hover:bg-green-800 transition-colors pointer-events-auto shrink-0"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
}
