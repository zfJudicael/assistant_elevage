import { useEffect, useMemo, useState } from "react";
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    LoaderCircle,
    NotebookPen,
    Weight,
} from "lucide-react";
import { apiClient } from "../../api/client";
import { useApp } from "../../context/AppContext";

interface DailyLogEntry {
    id?: number;
    groupId?: string | number;
    avgWeightG?: number | null;
    mortality: number;
    symptom?: string | null;
}

interface DailyLogsPanelProps {
    groupId: string;
}

export default function DailyLogsPanel({ groupId }: DailyLogsPanelProps) {
    const { refreshGroups } = useApp();
    const [logs, setLogs] = useState<DailyLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [form, setForm] = useState({ avgWeightG: "", mortality: "", symptom: "" });

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await apiClient.get<DailyLogEntry[]>(
                `/groups/${encodeURIComponent(groupId)}/daily-logs`,
            );
            setLogs(data);
        } catch (error) {
            console.error("Unable to load daily logs", error);
            setMessage("Impossible de charger les journaux récents.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadLogs();
    }, [groupId]);

    const latestLog = useMemo(() => logs[0], [logs]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const payload = {
                avg_weight_g: form.avgWeightG === "" ? null : Number(form.avgWeightG),
                mortality: Number(form.mortality || 0),
                symptom: form.symptom.trim() || null,
            };

            const created = await apiClient.post<DailyLogEntry>(
                `/groups/${encodeURIComponent(groupId)}/daily-logs`,
                payload,
            );

            setLogs((prev) => [created, ...prev]);
            setForm({ avgWeightG: "", mortality: "", symptom: "" });
            void refreshGroups();
            setMessage("Journal quotidien enregistré avec succès.");
        } catch (error) {
            console.error("Unable to save daily log", error);
            setMessage("L’enregistrement a échoué. Vérifiez les valeurs puis réessayez.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        <NotebookPen className="h-3.5 w-3.5" />
                        Journal quotidien
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                        Ajoutez une observation du jour
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Suivez le poids moyen et les pertes pour garder une vue claire du troupeau.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                            <span className="mb-2 flex items-center gap-2">
                                <Weight className="h-4 w-4 text-emerald-600" />
                                Poids moyen (g)
                            </span>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={form.avgWeightG}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, avgWeightG: event.target.value }))
                                }
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                placeholder="e.g. 1850"
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                            <span className="mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                                Mortalité
                            </span>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={form.mortality}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, mortality: event.target.value }))
                                }
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                placeholder="0"
                            />
                        </label>
                    </div>

                    <label className="mt-4 block text-sm font-medium text-slate-700">
                        <span className="mb-2 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-sky-600" />
                            Symptôme observé
                        </span>
                        <textarea
                            rows={3}
                            value={form.symptom}
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, symptom: event.target.value }))
                            }
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                            placeholder="Ex. Diarrhée légère, toux, baisse d’appétit..."
                        />
                    </label>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitting ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Enregistrer
                                </>
                            )}
                        </button>
                        {message ? (
                            <p className="text-sm text-slate-600">{message}</p>
                        ) : (
                            <p className="text-sm text-slate-500">
                                {loading
                                    ? "Chargement..."
                                    : "Le symptôme sera enregistré sur le groupe."}
                            </p>
                        )}
                    </div>

                    {latestLog?.symptom ? (
                        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                            Dernier symptôme : {latestLog.symptom}
                        </div>
                    ) : null}
                </div>
            </form>
        </div>
    );
}
