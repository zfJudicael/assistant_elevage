import { useNavigate } from "react-router-dom";
import { BarChart2, Download, SlidersHorizontal, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import Badge from "../components/ui/Badge";
import StatCard from "../components/dashboard/StatCard";
import Spinner from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import { useEffect, useState } from "react";
import { getGroups } from '../services/api';
import type { IGroup } from "../types";

export default function Dashboard() {
    const { groupsLoading, groupsError, refreshGroups, totalBirds, stats, statsLoading } =
        useApp();

    const navigate = useNavigate();
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (err) {
                setError('Impossible de charger les utilisateurs');
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble des poulets</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        État en temps réel de toutes les unités de production actives
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                    label="Nombre total de poulets"
                    value={totalBirds.toLocaleString()}
                    badge="+2.4%"
                    progress={75}
                />
                <StatCard
                    label="Poids moyen"
                    value={statsLoading ? "…" : stats ? `${stats.avgWeight} kg` : "—"}
                    note="Cible projetée : 2,10 kg (Semaine 6)"
                />
                <StatCard
                    label="Ratio de conversion alimentaire"
                    value={statsLoading ? "…" : stats ? stats.feedConversionRatio : "—"}
                    valueClassName="text-orange-500"
                    note={
                        <>
                            <TrendingUp size={14} className="text-green-400" />
                            Amélioration de l'efficacité
                        </>
                    }
                />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900">Groupes de production actifs</h2>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                            <Download size={15} /> Exporter les données
                        </button>
                        <button className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                            <SlidersHorizontal size={15} /> Filtrer
                        </button>
                    </div>
                </div>

                {groupsLoading ? (
                    <Spinner label="Chargement des groupes..." />
                ) : groupsError ? (
                    <ErrorState message={groupsError} onRetry={refreshGroups} />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                                    <th className="px-5 py-3 font-medium">ID du groupe</th>
                                    <th className="px-5 py-3 font-medium">Nom du lot</th>
                                    <th className="px-5 py-3 font-medium">Âge</th>
                                    <th className="px-5 py-3 font-medium">Effectif</th>
                                    <th className="px-5 py-3 font-medium">Mortalité</th>
                                    <th className="px-5 py-3 font-medium">Statut</th>
                                    <th className="px-5 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((group) => (
                                    <tr
                                        key={group.id}
                                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                                    >
                                        <td className="px-5 py-3 font-medium text-gray-900">
                                            {group.id}
                                        </td>
                                        <td className="px-5 py-3">{group.name}</td>
                                        <td className="px-5 py-3">
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                {group.age_days} jours
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            {group.count.toLocaleString()}
                                        </td>
                                        <td
                                            className={`px-5 py-3 ${group.mortality > 2 ? "text-red-500 font-semibold" : ""}`}
                                        >
                                            {group.mortality}%
                                        </td>
                                        <td className="px-5 py-3">
                                            <Badge status={group.status} />
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                                                onClick={() => navigate(`/groups/${group.id}`)}
                                            >
                                                <BarChart2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
