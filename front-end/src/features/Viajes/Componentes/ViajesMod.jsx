import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarViaje = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);

  //Traer los datos de los viajes
  const fetchViaje = useCallback(async () => {
    try {
      const response = await fetchAuth(`http://localhost:3000/api/viajes/${id}`);
      const data = await response.json();

      if (!response.ok || !data.viaje) {
        console.error("Error al consultar el viaje:", data.error);
        return;
      }

      setValues(data.viaje);
    } catch (err) {
      console.error("Error al cargar viaje:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchViaje();
  }, [fetchViaje]);

  console.log(values)
  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values, "pruebaaa")
    try {
      const response = await fetchAuth(`http://localhost:3000/api/viajes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      console.log(data)

      if (!response.ok || !data.success) {
        return window.alert("Error al modificar viaje");
      }

      window.alert("viaje modificado correctamente");
      navigate("/viajes");
    } catch (err) {
      console.error("Error al modificar:", err);
      window.alert("Error inesperado al modificar viaje");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <article>
      <h2>Modificar Viaje</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Vehiculo 
            <input
              required
              value={values.vehiculo_id}
              onChange={(e) => setValues({ ...values, vehiculo_id: e.target.value })}
            />
          </label>
          <label>
            Conductor
            <input
              required
              value={values.conductor_id}
              onChange={(e) => setValues({ ...values, conductor_id: e.target.value })}
            />
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
            />
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
            />
          </label>
          <label>
            Origen
            <input
              required
              value={values.origen}
              onChange={(e) => setValues({ ...values, origen: e.target.value })}
            />
          </label>
          <label>
            Destino
            <input
              required
              value={values.destino}
              onChange={(e) => setValues({ ...values, destino: e.target.value })}
            />
          </label>
          <label>
            Kilometros
            <input
              required
              value={values.kilometros}
              onChange={(e) => setValues({ ...values, kilometros: e.target.value })}
            />
          </label>
          <label>
            Observaciones
            <input
              required
              value={values.observaciones}
              onChange={(e) => setValues({ ...values, observaciones: e.target.value })}
            />
          </label>
        </fieldset>
        <input type="submit" value="Guardar cambios" />
      </form>
    </article>
  );
};