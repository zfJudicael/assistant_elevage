import { Link } from "react-router-dom";

export function RoosterLogo() {
    return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14 30c0-6 4-11 10-11 5 0 9 3 10 8l4-2-1 5 4 1-5 3c-1 5-6 8-11 8-6 0-11-4-11-9v-3z"
                fill="#1B4332"
            />
            <path d="M20 15l3-5 2 5 4-3-1 5 4 1-5 3-2-3-5-3z" fill="#E67E22" />
            <circle cx="28" cy="26" r="1.5" fill="#fff" />
        </svg>
    );
}

export function AkohoHeader() {
    return (
        <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
                <RoosterLogo />
                <div className="flex flex-col leading-tight">
                    <span className="font-serif text-lg font-semibold text-primary">
                        Taiza Akoho
                    </span>
                    <span className="text-xs text-muted-foreground">Assistant élevage</span>
                </div>
            </Link>
            <a href="#reprendre" className="text-sm font-medium text-primary hover:underline">
                Reprendre →
            </a>
        </header>
    );
}
