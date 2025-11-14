import { useState } from "react";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "react-router";

export const CreateVehiculo = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState(null);

  const [values, setValues] = useState({
    marca: "",
    modelo: "",
    patente: "",
    año: "",
    capacidad: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores(null);

    const response = await fetchAuth("http://localhost:3000/api/vehiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errores);
      }
      return window.alert("Error al crearvehiculo");
    }
    navigate("/vehiculos");
  };

  return (
    <article>
      <h2>Crear Vehiculos</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Marca
            <input
              required
              value={values.marca}
              onChange={(e) =>
                setValues({ ...values, marca: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "marca")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "marca")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Modelo
            <input
              required
              value={values.modelo}
              onChange={(e) => setValues({ ...values, modelo: e.target.value })}
              aria-invalid={
                errores && errores.some((e) => e.path === "modelo")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "modelo")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Patente
            <input
              required
              value={values.patente}
              onChange={(e) =>
                setValues({ ...values, patente: e.target.value })
              }
              aria-invalid={errores && errores.some((e) => e.path === "patente")}
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "patente")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Año
            <input
              required
              type="año"
              value={values.año}
              onChange={(e) =>
                setValues({ ...values, año: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "año")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "año")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Capacidad de carga
            <input
              type="capacidad"
              required
              value={values.capacidad}
              onChange={(e) =>
                setValues({ ...values, capacidad: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "capacidad")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "capacidad")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
        </fieldset>
        <input type="submit" value="Crear conductores" />
      </form>
    </article>
  );
};