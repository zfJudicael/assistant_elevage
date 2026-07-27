import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="h-screen flex">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
