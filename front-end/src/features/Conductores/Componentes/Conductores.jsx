import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/Auth";
import { Link } from "react-router";


export const Conductor = () => {
    const { fetchAuth } = useAuth();

  const [Conductores, setConductores] = useState([]);
  const [buscar, setBuscar] = useState("");

  const fetchConductores = useCallback(
    async (buscar) => {
      const searchParams = new URLSearchParams();

      if (buscar) {
        searchParams.append("buscar", buscar);
      }

      const response = await fetchAuth(
        "http://localhost:3000/api/conductores" +
          (searchParams.size > 0 ? "?" + searchParams.toString() : "")
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      console.log(data)
      setConductores(data.conductor);
    },
    [fetchAuth]
  );

  useEffect(() => {
    fetchConductores();
  }, [fetchConductores]);

  const handleQuitar = async (id) => {
    // Preguntar si quiere quitar el conductor
    if (window.confirm("¿Desea quitar el usuario?")) {
      // Pedir a la api que quite el conductor
      const response = await fetchAuth(`http://localhost:3000/api/conductores/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        return window.alert("Error al quitar conductor");
      }

      await fetchConductores();
    }
  };

  return (
    <article>
      <h2>Conductores</h2>
        <Link role="button" to="/Conductores/crear">
          Nuevo conductor
        </Link>
      <div className="group">
        <input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
        <button onClick={() => fetchConductores(buscar)}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Licencia</th>
            <th>Fecha de vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {Conductores.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.dni}</td>
              <td>{u.licencia}</td>
              <td>{u.fecha_de_vencimiento}</td>
              <td>
                <div>
                  
                    <Link role="button" to={`/Conductores/${u.id}/modificar`}>
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