import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import Health from "./pages/Health";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/group" element={<Group />} />
          <Route path="/health" element={<Health />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;