import { Routes, Route, Navigate } from "react-router-dom";
import { PujListPage }   from "./pages/PujListPage";
import { PujDetailPage } from "./pages/PujDetailPage";
import { LoginPage }     from "./pages/LoginPage";
import { HomePage }      from "./pages/HomePage";
import { RegisterPage }  from "./pages/RegisterPage";
import { ProfilePage }   from "./pages/ProfilePage";
import { AuthProvider, useAuth } from "./shared/context/AuthContext";
import "./App.css";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"         element={<Navigate to="/login" replace />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/home" element={
        <PrivateRoute><HomePage /></PrivateRoute>
      } />

      <Route path="/pujs" element={
        <PrivateRoute><PujListPage /></PrivateRoute>
      } />

      <Route path="/profile" element={
        <PrivateRoute><ProfilePage /></PrivateRoute>
      } />

      <Route path="/pujs/:code" element={
        <PrivateRoute>
          <div className="app-shell">
            <main className="app-main"><PujDetailPage /></main>
          </div>
        </PrivateRoute>
      } />

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