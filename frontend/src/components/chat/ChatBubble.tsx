import type { ChatMessage } from "@/services/api";

export function ChatBubble({ message }: { message: ChatMessage }) {
    const isUser = message.role === "user";
    return (
        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    isUser
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-foreground rounded-tl-sm"
                }`}
            >
                {message.content}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                {isUser ? "Vous" : "Assistant"} • {message.timestamp ?? "maintenant"}
            </div>
        </div>
    );
}
