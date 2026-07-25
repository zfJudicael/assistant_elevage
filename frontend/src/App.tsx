import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Health from "./pages/Health";
import { AppProvider } from "./context/AppContext";
import GroupDetail from "./pages/GroupDetail";
import RegisterBatch from "./pages/RegisterBatch";
import Groups from "./pages/Groups";

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/groups" element={<Groups />} />
                        <Route path="/groups/:id" element={<GroupDetail />} />
                        <Route path="/register-batch" element={<RegisterBatch />} />
                        <Route path="/health" element={<Health />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
