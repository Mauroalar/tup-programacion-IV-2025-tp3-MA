import { useState } from "react";

export const Register = () => {

  const [datoCliente, setDatoCliente] = useState({
    nombre: "", email: "", password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatoCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datoCliente),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data.error || data.message);
      return;
    }

    console.log("Usuario registrado:", data);
    alert("Registro exitoso");

  } catch (error) {
    console.error("Error en la petición:", error);
  }
};

  return (
    <article>
      <h2>Registrarse</h2>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="nombre">Nombre:</label>
          <input
            name="nombre"
            value={datoCliente.nombre}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={datoCliente.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            name="password"
            type="password"
            value={datoCliente.password}
            onChange={handleChange}
          />
        </fieldset>

        <footer>
          <div className="grid">
            <input
              type="button"
              className="secondary"
              value="Cancelar"
            />
            <input type="submit" value="Ingresar" />
          </div>
        </footer>
      </form>
    </article>
  );
};
