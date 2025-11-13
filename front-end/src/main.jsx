import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import "@picocss/pico"
import { App } from "./App.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import { Route, Routes, BrowserRouter } from "react-router";
import { Layout } from "./features/Layout/Layout.jsx";
import { Vehiculo } from "./features/vehiculos/componentes/Vehiculo.jsx";
import { Conductores } from "./features/Conductores/Componentes/Conductores.jsx";
import { Viaje } from "./features/Viajes/Componentes/Viajes.jsx";
import { AuthPage } from "./context/Auth.jsx";

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
            <Route path="/conductores" element={<Conductores/>}/>
            <Route path="/viajes" element={<Viaje/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
  
);