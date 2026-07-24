import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapPin, Users, Info } from "lucide-react";
import { useApp } from "../context/AppContext";

// Reference list of breeds for the select input. This is static reference
// data (not user data), so it doesn't need its own API endpoint — but if
// your backend manages breeds dynamically, swap this for a fetch call
// the same way groups/conversations are loaded in AppContext.
const CHICKEN_BREEDS = ["Ross 308", "Cobb 500"];

interface FormState {
    batchName: string;
    breed: string;
    count: string;
    hatchDate: string;
}

export default function RegisterBatch() {
    const { addGroup, addGroupLoading, addGroupError } = useApp();
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>({
        batchName: "",
        breed: "",
        count: "",
        hatchDate: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    const validate = () => {
        const e: Partial<Record<keyof FormState, string>> = {};
        if (!form.batchName) e.batchName = "Requis";
        if (!form.breed) e.breed = "Requis";
        if (!form.count || isNaN(Number(form.count))) e.count = "Nombre valide requis";
        if (!form.hatchDate) e.hatchDate = "Requis";
        return e;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        try {
            await addGroup({
                batchName: form.batchName,
                breed: form.breed,
                count: parseInt(form.count, 10),
                hatchDate: form.hatchDate,
            });
            navigate("/groups");
        } catch (e) {
            // addGroupError is already set in context and rendered below
            console.error(e);
        }
    };

    const handleChange = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const inputClass = (hasError: boolean) =>
        `w-full px-3 py-2.5 text-sm rounded-lg border ${
            hasError ? "border-red-400" : "border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700`;

    return (
        <div>
            <div className="text-xs text-gray-500 mb-3">
                <Link to="/groups" className="hover:underline">
                    Groupes
                </Link>
                <span> › </span>
                <span>Nouveau lot</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
                Enregistrer un nouveau groupe de poulets
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Initialisez un nouveau dossier de troupeau pour le suivi de la croissance et de la
                santé.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl mt-6 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Nom du groupe / ID du lot <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass(!!errors.batchName)}
                                placeholder="ex. BT-2023-001"
                                value={form.batchName}
                                onChange={(e) => handleChange("batchName", e.target.value)}
                            />
                            {errors.batchName ? (
                                <p className="text-xs text-red-500 mt-1">{errors.batchName}</p>
                            ) : (
                                <p className="text-xs text-gray-400 mt-1">
                                    Identifiant unique pour le suivi interne.
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Race de poulet <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={inputClass(!!errors.breed)}
                                value={form.breed}
                                onChange={(e) => handleChange("breed", e.target.value)}
                            >
                                <option value="">Sélectionnez le type de race</option>
                                {CHICKEN_BREEDS.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                            {errors.breed && (
                                <p className="text-xs text-red-500 mt-1">{errors.breed}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Nombre initial <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className={`${inputClass(!!errors.count)} pr-9`}
                                    placeholder="Entrez le nombre total de poussins"
                                    value={form.count}
                                    onChange={(e) => handleChange("count", e.target.value)}
                                />
                            </div>
                            {errors.count && (
                                <p className="text-xs text-red-500 mt-1">{errors.count}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Date d'éclosion <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className={inputClass(!!errors.hatchDate)}
                                value={form.hatchDate}
                                onChange={(e) => handleChange("hatchDate", e.target.value)}
                            />
                            {errors.hatchDate && (
                                <p className="text-xs text-red-500 mt-1">{errors.hatchDate}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 items-start bg-gray-50 border border-gray-100 rounded-lg p-4 mt-5">
                        <Info size={18} className="text-gray-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Calcul automatique du cycle de vie
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Une fois créé, le système calculera automatiquement le calendrier de
                                vaccination prévu et la date de commercialisation en fonction de la
                                race et de la date d'éclosion fournies.
                            </p>
                        </div>
                    </div>

                    {addGroupError && <p className="text-sm text-red-500 mt-4">{addGroupError}</p>}

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                            onClick={() => navigate("/groups")}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-green-800 text-white hover:bg-green-900 disabled:opacity-60"
                            disabled={addGroupLoading}
                        >
                            {addGroupLoading ? "Création en cours..." : "+ Créer un groupe"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
