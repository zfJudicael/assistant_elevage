import { Link } from "react-router-dom";
import { ArrowRight, Wheat, Syringe, Stethoscope, BookOpen } from "lucide-react";
import { AkohoHeader } from "../components/layout/AkohoHeader";
import { FeatureCard } from "../components/shared/FeatureCard";
import { Footer } from "../components/shared/Footer";

function RoosterIllustration() {
    return (
        <svg
            viewBox="0 0 200 200"
            className="mx-auto h-56 w-56 sm:h-72 sm:w-72"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#1B4332" />
                    <stop offset="1" stopColor="#2D6A4F" />
                </linearGradient>
            </defs>
            <ellipse cx="100" cy="180" rx="70" ry="8" fill="#000" opacity="0.08" />
            <path
                d="M60 130c0-25 18-45 45-45 25 0 45 15 48 38l14-8-4 18 15 4-18 10c-4 22-24 38-50 38-27 0-50-16-50-40v-15z"
                fill="url(#body)"
            />
            <path d="M95 60l8-25 6 20 12-15-3 18 18 5-20 12-7-14-14-1z" fill="#E67E22" />
            <path d="M120 45l6-8 4 8-4 4z" fill="#C0392B" />
            <circle cx="132" cy="105" r="4" fill="#fff" />
            <circle cx="133" cy="105" r="2" fill="#1B4332" />
            <path d="M148 115l14-2-10 8z" fill="#E67E22" />
            <path
                d="M85 170l-4 20M105 170l-4 20"
                stroke="#E67E22"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function Home() {
    return (
        // <div className="min-h-screen flex items-center justify-center bg-slate-50">
        //     <div className="text-center">
        //         <h1 className="text-2xl font-bold text-gray-900">Inscription</h1>
        //         <p className="text-sm text-gray-500 mt-1">Bienvenue sur la page d'inscription.</p>
        //         <Link
        //             to="/dashboard"
        //             className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-green-800 text-white text-sm font-medium hover:bg-green-900"
        //         >
        //             Aller au tableau de bord
        //         </Link>
        //     </div>
        <div className="min-h-screen bg-background">
            <AkohoHeader />
            <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
                <div className="mb-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-1.5 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Réponses sourcées — guides Cobb, Ross, FAO
                    </span>
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                            Vos poulets grandissent bien,{" "}
                            <span className="text-primary">on vous guide.</span>
                        </h1>
                        <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                            Posez vos questions sur l'alimentation, la santé et la gestion de votre
                            lot. Akoho répond en langage simple, avec les sources des grands guides
                            d'élevage.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/exemples"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                            >
                                Poser une question <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/exemples"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
                            >
                                Voir des exemples
                            </Link>
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-transparent px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary-soft"
                            >
                                Espace technicien →
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-primary-soft/60 p-6">
                        <RoosterIllustration />
                    </div>
                </div>

                <div className="mt-16 grid gap-4 sm:grid-cols-2">
                    <FeatureCard
                        icon={<Wheat className="h-5 w-5" />}
                        title="Alimentation"
                        description="Quantités par âge, types de mash, transitions démarrage → finition."
                    />
                    <FeatureCard
                        icon={<Syringe className="h-5 w-5" />}
                        title="Vaccination"
                        description="Calendriers types Newcastle, Gumboro, IBD et rappels adaptés."
                    />
                    <FeatureCard
                        icon={<Stethoscope className="h-5 w-5" />}
                        title="Maladies"
                        description="Reconnaître les symptômes courants et savoir quand consulter un vétérinaire."
                    />
                    <FeatureCard
                        icon={<BookOpen className="h-5 w-5" />}
                        title="Bonnes pratiques"
                        description="Biosécurité, litière, densité, ventilation : les fondamentaux au quotidien."
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
    // </div>
    // );
}
