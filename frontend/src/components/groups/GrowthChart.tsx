import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { GrowthPoint } from "../../types";

export default function GrowthChart({ data }: { data: GrowthPoint[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-52 flex items-center justify-center text-gray-400 text-sm">
                Aucune donnée de croissance disponible
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tickFormatter={(v) => `Jour ${v}`} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => `${value}g`} />
                <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#15803d"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#15803d" }}
                    connectNulls={false}
                    name="Réel"
                />
                <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={false}
                    name="Objectif"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
