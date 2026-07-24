interface BadgeProps {
  status: string;
}

const STYLES: Record<string, string> = {
  Healthy: "bg-green-800 text-white",
  Alert: "bg-white text-red-500 border border-red-300",
  Warning: "bg-amber-100 text-amber-800 border border-amber-300",
  DONE: "bg-green-100 text-green-800",
  SCHEDULED: "bg-blue-100 text-blue-800",
  Good: "bg-green-100 text-green-800",
  Damp: "bg-amber-100 text-amber-800",
  Optimal: "bg-green-100 text-green-800",
};

const DOT_COLORS: Record<string, string> = {
  Healthy: "bg-green-400",
  Alert: "bg-red-500",
  Warning: "bg-amber-500",
};

export default function Badge({ status }: BadgeProps) {
  const className = STYLES[status] || "bg-gray-100 text-gray-700";
  const dot = DOT_COLORS[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
      {status}
    </span>
  );
}
