import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import RoleGuard from "./auth/components/RoleGuard/RoleGuard";
import LoadingSpinner from "./shared/components/LoadingSpinner";

// Componentes lazy-loaded
const Login = lazy(() => import("./auth/pages/Login/Login"));
const Register = lazy(() => import("./auth/pages/Register/Register"));
const Unauthorized = lazy(() => import("./shared/pages/Unauthorized"));

// Páginas del operador de vuelos
const Dashboard = lazy(() =>
  import("./features/flight-operator/pages/Dashboard/Dashboard")
);
const CreateFlightPlan = lazy(() =>
  import("./features/flight-operator/pages/FlightPlans/Create/Create")
);
const EditFlightPlan = lazy(() =>
  import("./features/flight-operator/pages/FlightPlans/Edit/Edit")
);
const DeleteFlightPlan = lazy(() =>
  import("./features/flight-operator/pages/FlightPlans/Delete/Delete")
);

// Páginas del administrador (ejemplo)
const AdminDashboard = lazy(() =>
  import("./features/system-admin/pages/Dashboard/Dashboard")
);

// paginas de DGAC (ejemplo)
const DgacDashboard = lazy(() =>
  import("./features/DGAC/pages/Dashboard/Dashboard")
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Rutas protegidas para operador de vuelos */}
            <Route element={<RoleGuard allowedRoles={["flight_operator"]} />}>
              <Route
                path="/flight-operator/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/flight-operator/flight-plans/create"
                element={<CreateFlightPlan />}
              />
              <Route
                path="/flight-operator/flight-plans/edit/:id"
                element={<EditFlightPlan />}
              />
              <Route
                path="/flight-operator/flight-plans/delete/:id"
                element={<DeleteFlightPlan />}
              />
            </Route>
            {/* Rutas protegidas para administrador */}
            <Route element={<RoleGuard allowedRoles={["system_admin"]} />}>
              <Route
                path="/system-admin/dashboard"
                element={<AdminDashboard />}
              />
              {/* Agregar más rutas de admin aquí */}
            </Route>
            // Rutas protegidas para DGAC
            <Route element={<RoleGuard allowedRoles={["DGAC"]} />}>
              <Route path="/dgac/dashboard" element={<DgacDashboard />} />
            </Route>
            {/* Redirecciones */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/unauthorized" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
