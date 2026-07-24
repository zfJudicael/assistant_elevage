import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit2, Download, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import Spinner from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "../components/groupDetail/MetricCard";
import { Users, Utensils } from "lucide-react";
import { apiClient } from "../api/client";
import DailyLogsPanel from "../components/groupDetail/DailyLogsPanel";

interface ConsumptionGroup {
    feedKg: number;
    feedPerBird: number;
    waterL: number;
    withinRangePct: number;
}

export default function GroupDetail() {
    const { id } = useParams();
    const { groups, groupsLoading, groupsError, refreshGroups } = useApp();
    const navigate = useNavigate();

    if (groupsLoading) return <Spinner label="Chargement du groupe..." />;
    if (groupsError) return <ErrorState message={groupsError} onRetry={refreshGroups} />;

    const group = useMemo(() => {
        return groups.find((g) => g.id == id);
    }, [groups, id]);

    if (!group) {
        return (
            <div>
                <p className="text-gray-500 mb-4">Groupe non trouvé.</p>
                <button
                    onClick={() => navigate("/groups")}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-green-800 text-white hover:bg-green-900"
                >
                    Retour aux groupes
                </button>
            </div>
        );
    }

    const [consumptionGroup, setConsumptionGroup] = useState<ConsumptionGroup>();

    useEffect(() => {
        // Fetch consumption data for the group
        apiClient
            .get<ConsumptionGroup>(`/groups/${id}/consumption`)
            .then(setConsumptionGroup)
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des données de consommation :",
                    error,
                );
            });
    }, [id]);
    return (
        <div>
            <div className="text-xs text-gray-500 mb-3">
                <Link to="/groups" className="hover:underline">
                    Groupes
                </Link>
                <span> › </span>
                <span>ID du troupeau : {group.id}</span>
            </div>

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{group.batchName}</h1>
                    <p className="text-sm text-gray-500 mt-1">Âge : {group.ageDays} jours •</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Edit2 size={14} /> Modifier les détails
                    </button>
                    <button className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900">
                        <Download size={14} /> Exporter le rapport
                    </button>
                </div>
            </div>

            {group && (
                <>
                    <div className="grid gap-4 md:grid-cols-3 mb-6">
                        <MetricCard
                            label="Population"
                            icon={<Users className="h-4 w-4" />}
                            accentColor="green"
                            // footer={
                            //     <span className="inline-flex items-center gap-1 text-success">
                            //         ↓ {group.population.deltaYesterday} from yesterday
                            //     </span>
                            // }
                        >
                            <div className="font-serif text-4xl font-bold">
                                {group.count.toLocaleString()}
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-xs text-muted-foreground">Active</div>
                                    <div className="font-mono font-semibold text-primary">
                                        {group.active.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">
                                        Mortality (TTL)
                                    </div>
                                    <div className="font-mono font-semibold text-destructive">
                                        {group.mortalityTotal}{" "}
                                        <span className="text-xs">({group.mortality}%)</span>
                                    </div>
                                </div>
                            </div>
                        </MetricCard>

                        {consumptionGroup && (
                            <MetricCard
                                label="Consumption (Daily)"
                                icon={<Utensils className="h-4 w-4" />}
                                accentColor="orange"
                                footer={
                                    <span className="inline-flex items-center gap-1 text-accent">
                                        ⓵ Within expected range (+{consumptionGroup.withinRangePct}
                                        %)
                                    </span>
                                }
                            >
                                <div className="font-serif text-4xl font-bold">
                                    {consumptionGroup.feedKg} <span className="text-lg">kg</span>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <div className="text-xs text-muted-foreground">
                                            Feed Intake
                                        </div>
                                        <div className="font-mono font-semibold text-accent">
                                            {consumptionGroup.feedPerBird} g/bird
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">
                                            Water Intake
                                        </div>
                                        <div className="font-mono font-semibold">
                                            {consumptionGroup.waterL} L
                                        </div>
                                    </div>
                                </div>
                            </MetricCard>
                        )}

                        {/* 
                        <MetricCard
                            label="Health Alert"
                            icon={<Heart className="h-4 w-4" />}
                            accentColor="yellow"
                            footer={
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" /> Next:{" "}
                                    {group.health.nextVaccination}
                                </span>
                            }
                        >
                            <div className="font-serif text-3xl font-bold">
                                {group.health.status}
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-xs text-muted-foreground">
                                        Last Vaccination
                                    </div>
                                    <span className="mt-1 inline-block rounded-md bg-warning-soft px-2 py-0.5 font-mono text-xs font-semibold text-warning">
                                        {group.health.lastVaccination}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">
                                        Active Symptoms
                                    </div>
                                    <div className="text-xs font-semibold">
                                        {group.health.symptoms}
                                    </div>
                                </div>
                            </div>
                        </MetricCard>
                    </div> */}

                        {/* <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
                        <GrowthChart data={group.growth} />
                        <MedicalLogTable log={group.medicalLog} />
                    </div>

                    <div className="mt-6">
                        <DailyLogTable rows={group.dailyLog} />
                    </div> */}
                    </div>
                </>
            )}

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> */}
            {/* Population */}
            {/* <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">
                                Population
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {group.count.toLocaleString()}
                            </p>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-50 text-lg">
                            👥
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <p className="text-xs text-gray-500">Actifs</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {group.active?.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Mortalité (Total)</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {group.mortalityTotal}{" "}
                                <span className="text-red-500 text-xs">({group.mortality}%)</span>
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">↘ -2 depuis hier</p>
                </div> */}

            {/* Consumption */}
            {/* <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">
                                Consommation (Quotidienne)
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {group.feedIntake * 1.5} kg
                            </p>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-50 text-lg">
                            🍽️
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <p className="text-xs text-gray-500">Apport alimentaire</p>
                            <p className="text-sm font-semibold text-orange-500">
                                {group.feedIntake} g/bird
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Apport en eau</p>
                            <p className="text-sm font-semibold text-cyan-600">
                                {group.waterIntake} L
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">⚠ Dans la plage attendue (+1,2%)</p>
                </div> */}

            {/* Health */}
            {/* <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">
                                Alerte sanitaire
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {group.healthAlert}
                            </p>
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-50 text-lg">
                            ❤️
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Dernière vaccination</span>
                            <span className="font-medium text-gray-900">
                                {group.lastVaccination}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Symptômes actifs</span>
                            <span className="font-medium text-gray-900">
                                {group.activeSymptoms}
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                        📅 Prochain : {group.nextVaccination}
                    </p>
                </div>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">
                            Progression de la croissance (Poids corporel)
                        </h2>
                        <div className="flex gap-3 text-xs text-gray-500">
                            <span>● Réel (g)</span>
                            <span>⟳ Objectif (g)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">
                            Journal médical et de vaccination
                        </h2>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                            <Plus size={16} />
                        </button>
                    </div>
                    <button className="w-full text-center text-sm text-green-700 font-medium py-3 hover:underline">
                        Voir l'historique médical complet
                    </button>
                </div>
            </div>

            {/* {group.dailyLogs.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Journal quotidien (5 derniers jours)
                            </h2>
                            <p className="text-xs text-gray-400">
                                Métriques environnementales et de production
                            </p>
                        </div>
                        <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                            ⚙ Filtrer les métriques
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                                    <th className="px-5 py-2 font-medium">Jour</th>
                                    <th className="px-5 py-2 font-medium">Poids moyen</th>
                                    <th className="px-5 py-2 font-medium">Mortalité</th>
                                    <th className="px-5 py-2 font-medium">Nourriture (kg)</th>
                                    <th className="px-5 py-2 font-medium">Eau (L)</th>
                                    <th className="px-5 py-2 font-medium">Temp. (min/max)</th>
                                    <th className="px-5 py-2 font-medium">Humidité</th>
                                    <th className="px-5 py-2 font-medium">Qualité de la litière</th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.dailyLogs.map((log, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0">
                                        <td className="px-5 py-2.5">{log.day}</td>
                                        <td className="px-5 py-2.5">{log.avgWeight}</td>
                                        <td className="px-5 py-2.5">{log.mortality}</td>
                                        <td className="px-5 py-2.5">{log.feed}</td>
                                        <td className="px-5 py-2.5">{log.water}</td>
                                        <td className="px-5 py-2.5">
                                            {log.tempMin}°C / {log.tempMax}°C
                                        </td>
                                        <td className="px-5 py-2.5">{log.humidity}%</td>
                                        <td className="px-5 py-2.5">
                                            <Badge status={log.litQuality} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )} */}
            <div className="mb-6">
                <DailyLogsPanel groupId={group.id} />
            </div>
        </div>
    );
}
