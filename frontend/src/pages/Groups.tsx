import { useNavigate } from "react-router-dom";
import { Plus, BarChart2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import { useEffect } from "react";

export default function Groups() {
    const { groups, groupsLoading, groupsError, refreshGroups } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        refreshGroups();
    }, []);

    return (
        <div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Groupes de poulets</h1>
                    <p className="text-sm text-gray-500 mt-1">Gérez tous vos lots de troupeau</p>
                </div>
                <button
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900"
                    onClick={() => navigate("/register-batch")}
                >
                    <Plus size={16} /> Nouveau lot
                </button>
            </div>

            {groupsLoading ? (
                <Spinner label="Chargement des groupes..." />
            ) : groupsError ? (
                <ErrorState message={groupsError} onRetry={refreshGroups} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate(`/groups/${group.id}`)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-xs text-gray-400">{group.id}</span>
                                    <h3 className="font-semibold text-gray-900">
                                        {group.batchName}
                                    </h3>
                                </div>
                                <Badge status={group.status} />
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500">Poulets</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {group.count.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Âge</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {group.ageDays} jours
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Mortalité</p>
                                    <p
                                        className={`text-sm font-semibold ${group.mortality > 2 ? "text-red-500" : "text-green-800"}`}
                                    >
                                        {group.mortality}%
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                                <span>
                                    {group.house}, {group.section}
                                </span>
                                <BarChart2 size={16} className="text-green-600" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
