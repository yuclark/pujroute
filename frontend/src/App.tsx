import { Routes, Route, Navigate } from "react-router-dom";
import { PujListPage }   from "./pages/PujListPage";
import { PujDetailPage } from "./pages/PujDetailPage";
import { LoginPage }     from "./pages/LoginPage";
import { RegisterPage }  from "./pages/RegisterPage";
import { SiteHeader }    from "./components/SiteHeader";
import { BottomNav }     from "./components/BottomNav";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ✅ First page on load */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/pujs" element={
        <PrivateRoute>
          <div className="app-shell">
            <SiteHeader />
            <main className="app-main"><PujListPage /></main>
            <BottomNav />
          </div>
        </PrivateRoute>
      } />

      <Route path="/pujs/:code" element={
        <PrivateRoute>
          <div className="app-shell">
            <SiteHeader />
            <main className="app-main"><PujDetailPage /></main>
            <BottomNav />
          </div>
        </PrivateRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
