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
            <Route path="/vehiculos/crear" element={<CreateVehiculo/>}/>
            <Route path="/conductores" element={<Conductor/>}/>
            <Route path="/conductores/crear" element={<CreateConductor/>}/>
            <Route path="/conductores/:id/modificar" element={<ModificarConductor/>}/>
            <Route path="/vehiculos/:id/modificar" element={<ModificarVehiculo/>}/>
            <Route path="/viajes" element={<Viaje/>}/>
            <Route path="/viajes/crear" element={<CreateViaje/>}/>
            <Route path="/viajes/:id/modificar" element={<ModificarViaje/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
  
);