import { Routes, Route, Navigate } from "react-router-dom";
import { PujListPage } from "./pages/PujListPage";
import { PujDetailPage } from "./pages/PujDetailPage";
import { BottomNav } from "./components/BottomNav";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      <Routes>
        <Route path="/" element={<Navigate to="/pujs" replace />} />
        <Route path="/pujs" element={<PujListPage />} />
        <Route path="/pujs/:code" element={<PujDetailPage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;