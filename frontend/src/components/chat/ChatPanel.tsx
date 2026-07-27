import { useEffect, useRef, useState } from "react";
import { SquarePen } from "lucide-react";
// import { postChat, type ChatMessage } from "@/services/api";
// import { useHealthAlerts } from "@/hooks/useHealthAlerts";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { HealthAlertBanner } from "./HealthAlertBanner";
import type { ChatMessage } from "../../types";
import {messagingApi} from "../../api/messaging";

export function ChatPanel({
    groupId,
    title = "Assistant IA Avicole",
}: {
    groupId?: string;
    title?: string;
}) {
    // const { alerts } = useHealthAlerts();
    const conversation_id = '753ed73a-b9d9-4823-b247-2058a9d9f091';
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            // groupId: groupId || "general",
            content: groupId
                ? `Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider avec le lot ${groupId} aujourd'hui ?`
                : "Bonjour ! Posez-moi n'importe quelle question sur votre élevage.",
            timestamp: "10:15 AM",
        },
    ]);
    const [pending, setPending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, pending]);

    async function handleSend(text: string) {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages((m) => [...m, { role: "user", content: text, timestamp: now }]);
        setPending(true);
        try {
            const res = await messagingApi.sendMessage(conversation_id, text);
            console.log(res)
            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content: res.data.content,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
        } finally {
            setPending(false);
        }
    }

    return (
        <aside className="flex h-full w-full flex-col border-l border-border bg-sidebar">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-sm font-semibold">{title}</span>
                <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-secondary">
                    <SquarePen className="h-4 w-4" />
                </button>
            </div>
            <div className="px-4 pt-3">{/* <HealthAlertBanner alerts={alerts} /> */}</div>
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {messages.map((m, i) => (
                    <ChatBubble key={i} message={m} />
                ))}
                {pending && (
                    <div className="text-xs text-muted-foreground">Assistant réfléchit…</div>
                )}
            </div>
            <div className="border-t border-border p-3">
                <ChatInput onSend={handleSend} disabled={pending} />
            </div>
        </aside>
    );
}
