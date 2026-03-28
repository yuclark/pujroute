import { Routes, Route, Navigate } from "react-router-dom";
import { PujListPage }   from "./pages/PujListPage";
import { PujDetailPage } from "./pages/PujDetailPage";
import { LoginPage }     from "./pages/LoginPage";
import { HomePage }      from "./pages/HomePage";
import { RegisterPage }  from "./pages/RegisterPage";
import { ProfilePage }   from "./pages/ProfilePage";
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
      {/* ── Public ── */}
      <Route path="/"         element={<Navigate to="/login" replace />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ── Self-contained (own navbar) ── */}
      <Route path="/home" element={
        <PrivateRoute><HomePage /></PrivateRoute>
      } />

      <Route path="/pujs" element={
        <PrivateRoute><PujListPage /></PrivateRoute>
      } />

      <Route path="/profile" element={
        <PrivateRoute><ProfilePage /></PrivateRoute>
      } />

      {/* ── App shell (SiteHeader + BottomNav) ── */}
      <Route path="/pujs/:code" element={
        <PrivateRoute>
          <div className="app-shell">
            <SiteHeader />
            <main className="app-main"><PujDetailPage /></main>
            <BottomNav />
          </div>
        </PrivateRoute>
      } />

      {/* ── Catch-all ── */}
      <Route path="*" element={<Navigate to="/login" replace />} />
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
