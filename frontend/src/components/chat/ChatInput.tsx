import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ChatInput({
  placeholder = "Posez une question à l'assistant...",
  onSend,
  disabled,
}: {
  placeholder?: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = value.trim();
    if (!t) return;
    onSend(t);
    setValue("");
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
