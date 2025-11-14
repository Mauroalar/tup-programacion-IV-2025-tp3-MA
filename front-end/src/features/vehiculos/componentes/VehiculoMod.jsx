import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarVehiculo = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    marca: "",
    modelo: "",
    patente: "",
    año: "",
    capacidad: "",
  });
  const [loading, setLoading] = useState(true);

  //Traer los datos del vehiculo
  const fetchVehiculo = useCallback(async () => {
    try {
      const response = await fetchAuth(`http://localhost:3000/api/vehiculos/${id}`);
      const data = await response.json();

      if (!response.ok || !data.vehiculo) {
        console.error("Error al consultar el vehiculo:", data.error);
        return;
      }

      setValues(data.vehiculo);
    } catch (err) {
      console.error("Error al cargar vehiculo:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchVehiculo();
  }, [fetchVehiculo]);

  console.log(values)
  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values, "kkkkk")
    try {
      const response = await fetchAuth(`http://localhost:3000/api/vehiculos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      console.log(data)

      if (!response.ok || !data.success) {
        return window.alert("Error al modificar vehiculo");
      }

      window.alert("vehiculo modificado correctamente");
      navigate("/vehiculos");
    } catch (err) {
      console.error("Error al modificar:", err);
      window.alert("Error inesperado al modificar vehiculo");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <article>
      <h2>Modificar vehiculo</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Marca
            <input
              required
              value={values.marca}
              onChange={(e) => setValues({ ...values, marca: e.target.value })}
            />
          </label>
          <label>
            Modelo
            <input
              required
              value={values.modelo}
              onChange={(e) => setValues({ ...values, modelo: e.target.value })}
            />
          </label>
          <label>
            Patente
            <input
              required
              value={values.patente}
              onChange={(e) => setValues({ ...values, patente: e.target.value })}
            />
          </label>
          <label>
            Año
            <input
              required
              value={values.año}
              onChange={(e) => setValues({ ...values, año: e.target.value })}
            />
          </label>
          <label>
            Capacidad de carga
            <input
              required
              value={values.capacidad}
              onChange={(e) => setValues({ ...values, capacidad: e.target.value })}
            />
          </label>
        </fieldset>
        <input type="submit" value="Guardar cambios" />
      </form>
    </article>
  );
};