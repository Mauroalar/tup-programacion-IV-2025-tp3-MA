import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarConductor = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    licencia: "",
    fecha_de_vencimiento: "",
  });
  const [loading, setLoading] = useState(true);

  //Traer los datos del conductor
  const fetchConductor = useCallback(async () => {
    try {
      const response = await fetchAuth(`http://localhost:3000/api/conductores/${id}`);
      const data = await response.json();

      if (!response.ok || !data.conductor) {
        console.error("Error al consultar el conductor:", data.error);
        return;
      }

      setValues(data.conductor);
    } catch (err) {
      console.error("Error al cargar conductor:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchConductor();
  }, [fetchConductor]);

  console.log(values)
  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchAuth(`http://localhost:3000/api/conductores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      console.log(data)

      if (!response.ok || !data.success) {
        return window.alert("Error al modificar conductor");
      }

      window.alert("Conductor modificado correctamente");
      navigate("/Conductores");
    } catch (err) {
      console.error("Error al modificar:", err);
      window.alert("Error inesperado al modificar conductor");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <article>
      <h2>Modificar conductor</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Nombre
            <input
              required
              value={values.nombre}
              onChange={(e) => setValues({ ...values, nombre: e.target.value })}
            />
          </label>
          <label>
            Apellido
            <input
              required
              value={values.apellido}
              onChange={(e) => setValues({ ...values, apellido: e.target.value })}
            />
          </label>
          <label>
            DNI
            <input
              required
              value={values.dni}
              onChange={(e) => setValues({ ...values, dni: e.target.value })}
            />
          </label>
          <label>
            Licencia
            <input
              required
              value={values.licencia}
              onChange={(e) => setValues({ ...values, licencia: e.target.value })}
            />
          </label>
          <label>
            Fecha de vencimiento
            <input
              type="date"
              required
              value={values.fecha_de_vencimiento?.split("T")[0] || ""}
              onChange={(e) =>
                setValues({ ...values, fecha_de_vencimiento: e.target.value })
              }
            />
          </label>
        </fieldset>
        <input type="submit" value="Guardar cambios" />
      </form>
    </article>
  );
};