import { HeartPulse, AlertTriangle } from "lucide-react";
import { useApp } from "../context/AppContext";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";

export default function Health() {
    const { groups, groupsLoading, groupsError, refreshGroups } = useApp();

    const alertGroups = groups.filter((g) => g.status === "Alert" || g.status === "Warning");

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Suivi de la santé</h1>
            <p className="text-sm text-gray-500 mt-1 mb-6">
                Suivre et gérer la santé du troupeau dans toutes les unités
            </p>

            {groupsLoading ? (
                <Spinner label="Chargement..." />
            ) : groupsError ? (
                <ErrorState message={groupsError} onRetry={refreshGroups} />
            ) : (
                <>
                    {alertGroups.length > 0 && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
                            <AlertTriangle size={18} className="text-red-600" />
                            <span>
                                {alertGroups.length} groupe(s) nécessite une attention immédiate
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groups.map((g) => (
                            <div
                                key={g.id}
                                className="bg-white border border-gray-200 rounded-xl p-5"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <HeartPulse size={20} className="text-green-600" />
                                    <Badge status={g.status} />
                                </div>
                                <h3 className="font-semibold text-gray-900">{g.batchName}</h3>
                                <p className="text-xs text-gray-400 mb-4">{g.id}</p>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Poulets actifs</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {(g.active || g.count).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Mortalité</p>
                                        <p
                                            className={`text-sm font-semibold ${g.mortality > 2 ? "text-red-500" : "text-green-800"}`}
                                        >
                                            {g.mortality}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Âge</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {g.ageDays} jours
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500">Dernière vaccination</p>
                                    <p className="text-sm text-gray-700">{g.lastVaccination}</p>
                                </div>
                                <div className="pt-3">
                                    <p className="text-xs text-gray-500">Symptômes actifs</p>
                                    <p
                                        className={`text-sm ${g.activeSymptoms === "None Observed" ? "text-green-700" : "text-red-500"}`}
                                    >
                                        {g.activeSymptoms === "None Observed"
                                            ? "Aucun observé"
                                            : g.activeSymptoms}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
