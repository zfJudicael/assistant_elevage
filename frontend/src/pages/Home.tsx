import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Inscription</h1>
        <p className="text-sm text-gray-500 mt-1">Bienvenue sur la page d'inscription.</p>
        <Link
          to="/dashboard"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-green-800 text-white text-sm font-medium hover:bg-green-900"
        >
          Aller au tableau de bord
        </Link>
      </div>
    </div>
  );
}
