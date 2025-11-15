import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import "@picocss/pico"
import { App } from "./App.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import { Route, Routes, BrowserRouter } from "react-router";
import { Layout } from "./features/Layout/Layout.jsx";
import { Vehiculo } from "./features/vehiculos/componentes/Vehiculo.jsx";
import { CreateVehiculo } from "./features/vehiculos/componentes/VehiculoCread.jsx";
import { ModificarVehiculo } from "./features/vehiculos/componentes/VehiculoMod.jsx";
import { Conductor } from "./features/Conductores/Componentes/Conductores.jsx";
import { CreateConductor } from "./features/Conductores/Componentes/ConductoresCread.jsx";
import { ModificarConductor } from "./features/Conductores/Componentes/ConductoresMod.jsx";
import { Viaje } from "./features/Viajes/Componentes/Viajes.jsx";
import { CreateViaje } from "./features/Viajes/Componentes/ViajesCread.jsx";
import { AuthPage } from "./context/Auth.jsx";
import { ModificarViaje } from "./features/Viajes/Componentes/ViajesMod.jsx";
import { Register } from "./features/Login/Componente/Register.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<App/>}/>
            <Route path="/vehiculos" element={
                <AuthPage>
                  <Vehiculo/>
                </AuthPage>
            }/>
            <Route path="/vehiculos/crear" element={
                <AuthPage>
                  <CreateVehiculo/>
                </AuthPage>
            }/>
            <Route path="/conductores" element={
              <AuthPage>
                <Conductor/>
              </AuthPage>
            }/>
            <Route path="/conductores/crear" element={
              <AuthPage>
                <CreateConductor/>
              </AuthPage>
            }/>
            <Route path="/conductores/:id/modificar" element={
              <AuthPage>
                <ModificarConductor/>
              </AuthPage>
            }/>
            <Route path="/vehiculos/:id/modificar" element={
              <AuthPage>
                <ModificarVehiculo/>
              </AuthPage>
            }/>
            <Route path="/viajes" element={
              <AuthPage>
                <Viaje/>
              </AuthPage>
            }/>
            <Route path="/viajes/crear" element={
              <AuthPage>
                <CreateViaje/>
              </AuthPage>
            }/>
            <Route path="/viajes/:id/modificar" element={
              <AuthPage>
                <ModificarViaje/>
              </AuthPage>
            }/>
            <Route path="/register" element={<Register/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
  
);