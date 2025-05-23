import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
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
  import("./features/system-admin/pages/Dashboard/AdminDashboard")
);
const Aeropuertos = lazy(() =>
  import("./features/system-admin/pages/Aeropuertos")
);
const Aerolineas = lazy(() =>
  import("./features/system-admin/pages/Aerolineas")
);
const ModelosAvion = lazy(() =>
  import("./features/system-admin/pages/ModelosAvion")
);
const Pistas = lazy(() => import("./features/system-admin/pages/Pistas"));
const Usuarios = lazy(() => import("./features/system-admin/pages/Usuarios"));
const Contratos = lazy(() => import("./features/system-admin/pages/Contratos"));

// paginas de DGAC (ejemplo)
const DgacDashboard = lazy(() =>
  import("./features/DGAC/pages/Dashboard/Dashboard")
);

// Páginas de segAero (ejemplo)
const SegAeroDashboard = lazy(() =>
  import("./features/segAero/pages/Dashboard/Dashboard")
);
const CreateRegin = lazy(() =>
  import("./features/segAero/pages/regincident/Create")
);

const CreateListarincidente = lazy(() =>
  import("./features/segAero/pages/Dashboard/listarIncidente")
);

// paginas de usureports (ejemplo)
const UsuReportsDashboard = lazy(() =>
  import("./features/usuReports/pages/Dashboard/Dashboard")
);
// Páginas de control de vuelo (ejemplo)
const ControlVueloDashboard = lazy(() =>
  import("./features/controlVuelo/pages/Dashboard/Dashboard")
);
// Páginas de check (ejemplo)
const CheckDashboard = lazy(() =>
  import("./features/checking/pages/Dashboard/Dashboard")
);
// Páginas de usuario (ejemplo)
const UserDashboard = lazy(() =>
  import("./features/usuario/pages/Dashboard/Dashboard")
);

const VuelosProgramados = lazy(() =>
  import("./features/usuario/pages/consultVuelos/vuelosProgramados")
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
            <Route path="/flight-operator/dashboard" element={<Dashboard />} />
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

            {/* Rutas protegidas para administrador */}
            <Route
              path="/system-admin/dashboard"
              element={<AdminDashboard />}
            />
            <Route path="/system-admin/Aeropuertos" element={<Aeropuertos />} />
            <Route path="/system-admin/Aerolineas" element={<Aerolineas />} />
            <Route
              path="/system-admin/ModelosAvion"
              element={<ModelosAvion />}
            />
            <Route path="/system-admin/Pistas" element={<Pistas />} />
            <Route path="/system-admin/Usuarios" element={<Usuarios />} />
            <Route path="/system-admin/Contratos" element={<Contratos />} />

            {/* Rutas protegidas para DGAC */}
            <Route path="/dgac/dashboard" element={<DgacDashboard />} />

            {/* Rutas protegidas para segAero */}

            <Route path="/segaero/dashboard" element={<SegAeroDashboard />} />
            <Route
              path="/segaero/regincident/create"
              element={<CreateRegin />}
            />
            <Route
              path="/segaero/Dashboard/listarIncidente"
              element={<CreateListarincidente />}
            />

            {/* Rutas protegidas para usureports*/}

            <Route
              path="/usureports/dashboard"
              element={<UsuReportsDashboard />}
            />

            <Route
              path="/controlvuelo/dashboard"
              element={<ControlVueloDashboard />}
            />
            {/* Agrega aquí más rutas si tienes más páginas para este rol */}

            {/* Rutas protegidas para check */}

            <Route path="/check/dashboard" element={<CheckDashboard />} />
            {/* Agrega aquí más rutas si tienes más páginas para este rol */}

            {/* Rutas protegidas para usuario */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/vuelosProgramados/" element={<VuelosProgramados />} />

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
