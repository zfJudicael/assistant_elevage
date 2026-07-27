import { AlertTriangle } from "lucide-react";

export function DisclaimerBox() {
  return (
    <div className="flex gap-3 rounded-2xl border border-warning/40 bg-warning-soft/60 p-4 text-sm text-foreground">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
      <p>
        <strong>Akoho ne pose pas de diagnostic vétérinaire.</strong> En cas de mortalité anormale
        ou de symptômes sévères, contactez immédiatement un vétérinaire agréé. Les réponses sont
        basées sur des guides d'élevage (Cobb, Ross, FAO) à titre informatif.
      </p>
    </div>
  );
}
