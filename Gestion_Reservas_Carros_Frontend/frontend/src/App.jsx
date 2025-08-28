// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./layout/Dashboard";
import Home from "./pages/Home"; // ← agregada

// Clientes
import ClienteCreate from "./pages/Clientes/ClienteCreate";
import ClientesList from "./pages/Clientes/ClientesList";

// Reservas
import ReservasList from "./pages/reservas/ReservasList";
import ReservaCreate from "./pages/reservas/ReservaCreate";
import ReservaEdit from "./pages/reservas/ReservaEdit";

// Vehiculos
import VehiculosList from "./pages/Vehiculos/VehiculosList";
import VehiculoCreate from "./pages/Vehiculos/VehiculoCreate";
import VehiculoEdit from "./pages/Vehiculos/VehiculoEdit";

import PublicRoute from "./routers/PublicRoute";
import ProtectedRoute from "./routers/ProtectedRoute";

import NotFound from "./pages/NotFound";
import ClienteEdit from "./pages/Clientes/ClienteEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Rutas protegidas */}
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route index element={<Home />} />

          {/* Clientes */}
          <Route path="clientes" element={<ClientesList />} />
          <Route path="clientes/create" element={<ClienteCreate />} />
          <Route path="clientes/edit/:id" element={<ClienteEdit/>} />

          {/* Vehiculos */}
          <Route path="vehiculos" element={<VehiculosList />} />
          <Route path="vehiculos/create" element={<VehiculoCreate />} />
          <Route path="vehiculos/edit/:id" element={<VehiculoEdit />} />

          {/* Reservas */}
          <Route path="reservas" element={<ReservasList />} />
          <Route path="reservas/create" element={<ReservaCreate />} />
          <Route path="reservas/edit/:id" element={<ReservaEdit />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


