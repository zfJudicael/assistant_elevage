import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  badge?: string;
  progress?: number;
  note?: ReactNode;
  valueClassName?: string;
}

export default function StatCard({ label, value, badge, progress, note, valueClassName }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className={`text-2xl font-bold text-gray-900 ${valueClassName || ""}`}>{value}</span>
        {badge && (
          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-700 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      )}
      {note && <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">{note}</p>}
    </div>
  );
}
