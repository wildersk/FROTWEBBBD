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
const Pistas = lazy(() =>
  import("./features/system-admin/pages/Pistas")
);
const Usuarios = lazy(() =>
  import("./features/system-admin/pages/Usuarios")
);
const Contratos = lazy(() =>
  import("./features/system-admin/pages/Contratos")
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
  <Route path="/system-admin/dashboard" element={<AdminDashboard />} />
  <Route path="/system-admin/Aeropuertos" element={<Aeropuertos />} />
  <Route path="/system-admin/Aerolineas" element={<Aerolineas />} />
  <Route path="/system-admin/ModelosAvion" element={<ModelosAvion />} />
  <Route path="/system-admin/Pistas" element={<Pistas />} />
  <Route path="/system-admin/Usuarios" element={<Usuarios />} />
  <Route path="/system-admin/Contratos" element={<Contratos />} />
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
/**
 * Para aplicar las modificaciones de un repositorio a este proyecto, sigue estos pasos:
 * 
 * 1. Abre una terminal o línea de comandos.
 * 2. Navega al directorio del proyecto local con el comando:
 *    cd /c:/Users/Giovanny Morales/Desktop/PBD2/FROTWEBBBD/FRONTWEBBD
 * 3. Asegúrate de que no tienes cambios sin guardar ejecutando:
 *    git status
 * 4. Si tienes cambios sin guardar, realiza un commit o guárdalos en un stash:
 *    git add .
 *    git commit -m "Guardando cambios locales"
 *    o usa `git stash` para guardarlos temporalmente.
 * 5. Descarga las actualizaciones del repositorio remoto con:
 *    git pull origin <nombre-de-la-rama>
 *    (Reemplaza <nombre-de-la-rama> con la rama que deseas actualizar, como "main" o "master").
 * 6. Si hay conflictos, resuélvelos manualmente en los archivos afectados.
 * 7. Una vez resueltos los conflictos (si los hay), confirma los cambios con:
 *    git add .
 *    git commit -m "Resolviendo conflictos"
 * 
 * Ahora tu proyecto estará actualizado con las modificaciones del repositorio remoto.
 */