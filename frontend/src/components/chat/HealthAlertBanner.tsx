import { AlertOctagon } from "lucide-react";
import type { HealthAlert } from "@/services/api";

export function HealthAlertBanner({ alerts }: { alerts: HealthAlert[] }) {
  if (alerts.length === 0) return null;
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive-soft p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-destructive font-mono">
          <AlertOctagon className="h-3.5 w-3.5" /> Health Alerts
        </span>
        <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase text-destructive-foreground">
          Live
        </span>
      </div>
      {alerts.map((a) => (
        <div key={a.id} className="text-sm">
          <div className="font-semibold text-foreground">{a.title}</div>
          <div className="text-xs text-muted-foreground font-mono">{a.source} • {a.time}</div>
        </div>
      ))}
    </div>
  );
}
