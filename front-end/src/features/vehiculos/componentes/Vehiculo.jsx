import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/Auth";
import { Link } from "react-router";


export const Vehiculo = () => {
    const { fetchAuth } = useAuth();

  const [Vehiculos, setVehiculos] = useState([]);
  const [buscar, setBuscar] = useState("");

  const fetchVehiculos = useCallback(
    async (buscar) => {
      const searchParams = new URLSearchParams();

      if (buscar) {
        searchParams.append("consulta", buscar);
      }

      const response = await fetchAuth(
        "http://localhost:3000/api/vehiculos" +
          (searchParams.size > 0 ? "?" + searchParams.toString() : "")
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      console.log(data)
      setVehiculos(data.vehiculo);
    },
    [fetchAuth]
  );

  useEffect(() => {
    fetchVehiculos();
  }, [fetchVehiculos]);

  const handleQuitar = async (id) => {
    // Preguntar si quiere quitar el usuario
    if (window.confirm("¿Desea quitar el usuario?")) {
      // Pedir a la api que quite el usuario
      const response = await fetchAuth(`http://localhost:3000/api/vehiculos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        return window.alert("Error al quitar usuario");
      }

      await fetchVehiculos();
    }
  };

  return (
    <article>
      <h2>Vehiculos</h2>
        <Link role="button" to="/vehiculos/crear">
          Nuevo vehiculo
        </Link>
      <div className="group">
        <input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
        <button onClick={() => fetchVehiculos(buscar)}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Patente</th>
            <th>Año</th>
            <th>Capacidad de Carga</th>
          </tr>
        </thead>
        <tbody>
          {Vehiculos.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.marca}</td>
              <td>{u.modelo}</td>
              <td>{u.patente}</td>
              <td>{u.año}</td>
              <td>{u.capacidad_de_carga}</td>
              <td>
                <div>
                  {/* <Link role="button" to={`/Vehiculos/${u.id}`}>
                    Ver
                  </Link>
                   */}
                    <Link role="button" to={`/Vehiculos/${u.id}/modificar`}>
                      Modificar
                    </Link>
                    <button onClick={() => handleQuitar(u.id)}>Quitar</button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}