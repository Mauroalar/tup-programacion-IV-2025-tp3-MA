import { useState } from "react";
import "./App.css"

export function App() {
  const [session, setSession] = useState(null);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, password }),
    });

    const session = await response.json();

    if (!response.ok && response.status === 400) {
      console.log("Error:", session.error);
      return;
    }

    setSession(session);
  };

  return (
  <div className="app-container">
    <h1>APLICACION DE GESTION DE VEHICULOS, CONDUCTORES Y VIAJES</h1>

    <img
      className="app-image"
      src="https://iconsvg.co/icon/08dbb3ce-0f59-4660-86da-597ea669c7a1.svg"
      alt="auto"
    />

    <p className="app-description">
      La aplicación fue diseñada para optimizar el control operativo de una empresa de transporte. 
      La plataforma permite registrar y administrar de manera eficiente los vehículos disponibles, 
      sí como la información de cada conductor. Además, ofrece herramientas completas para gestionar 
      los viajes realizados, facilitando la creación, modificación y eliminación de registros. 
      Con una interfaz clara y funcional, la aplicación centraliza todos los datos en un solo sistema, 
      mejorando la organización interna y permitiendo un seguimiento más preciso de las actividades de 
      transporte.
    </p>

    {session && (
      <>
        <button className="btn-logout" onClick={() => setSession(null)}>Salir</button>
        <h2 className="usuarios-title">Usuarios</h2>
        <Usuarios token={session.token} />
      </>
    )}
  </div>
);

}