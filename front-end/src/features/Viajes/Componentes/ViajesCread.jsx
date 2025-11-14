import { useState } from "react";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "react-router";

export const CreateViaje = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState(null);

  const [values, setValues] = useState({
    vehiculo_id: "",
    conductor_id: "",
    fecha_salida: "",
    fecha_llegada: "",
    origen: "",
    destino: "",
    kilometros: "",
    observaciones: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores(null);

    const response = await fetchAuth("http://localhost:3000/api/viajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errores);
      }
      return window.alert("Error al crear viaje");
    }
    navigate("/viajes");
  };

  return (
    <article>
      <h2>Arma tu Viaje</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Vehiculo ID
            <input
              required
              value={values.vehiculo_id}
              onChange={(e) =>
                setValues({ ...values, vehiculo_id: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "vehiculo_id")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "vehiculo_id")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Conductor ID
            <input
              required
              value={values.conductor_id}
              onChange={(e) => setValues({ ...values, conductor_id: e.target.value })}
              aria-invalid={
                errores && errores.some((e) => e.path === "conductor_id")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "conductor_id")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Fecha de Salida
            <input
              type="date"
              required
              value={values.fecha_salida?.split("T")[0] || ""}
              onChange={(e) =>
                setValues({ ...values, fecha_salida: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "date")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "date")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Fecha de Llegada
            <input
              type="date"
              required
              value={values.fecha_llegada?.split("T")[0] || ""}
              onChange={(e) =>
                setValues({ ...values, fecha_llegada: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "date")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "date")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Origen
            <input
              required
              type="origen"
              value={values.origen}
              onChange={(e) =>
                setValues({ ...values, origen: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "origen")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "origen")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Destino
            <input
              type="destino"
              required
              value={values.destino}
              onChange={(e) =>
                setValues({ ...values, destino: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "destino")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "destino")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Kilometros
            <input
              type="kilometros"
              required
              value={values.kilometros}
              onChange={(e) =>
                setValues({ ...values, kilometros: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "kilometros")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "kilometros")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Observaciones
            <input
              type="observaciones"
              required
              value={values.observaciones}
              onChange={(e) =>
                setValues({ ...values, observaciones: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "observaciones")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "observaciones")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
        </fieldset>
        <input type="submit" value="Crear viaje" />
      </form>
    </article>
  );
};