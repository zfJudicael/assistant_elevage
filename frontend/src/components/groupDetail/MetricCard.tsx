import type { ReactNode } from "react";

export function MetricCard({
    label,
    icon,
    accentColor,
    children,
    footer,
}: {
    label: string;
    icon: ReactNode;
    accentColor: "green" | "orange" | "yellow";
    children: ReactNode;
    footer?: ReactNode;
}) {
    const topBorder = {
        green: "border-t-4 border-t-primary",
        orange: "border-t-4 border-t-accent",
        yellow: "border-t-4 border-t-warning",
    }[accentColor];
    const iconBg = {
        green: "bg-primary-soft text-primary",
        orange: "bg-accent-soft text-accent",
        yellow: "bg-warning-soft text-warning",
    }[accentColor];
    return (
        <div className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${topBorder}`}>
            <div className="mb-4 flex items-start justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono">
                    {label}
                </span>
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${iconBg}`}>
                    {icon}
                </span>
            </div>
            {children}
            {footer && (
                <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    {footer}
                </div>
            )}
        </div>
    );
}
