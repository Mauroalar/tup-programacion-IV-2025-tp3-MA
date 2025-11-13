import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/Auth";
import { Link } from "react-router";


export const Viaje = () => {
    const { fetchAuth } = useAuth();

  const [Viaje, setViaje] = useState([]);
  const [buscar, setBuscar] = useState("");

  const fetchViaje = useCallback(
    async (buscar) => {
      const searchParams = new URLSearchParams();

      if (buscar) {
        searchParams.append("buscar", buscar);
      }

      const response = await fetchAuth(
        "http://localhost:3000/api/viaje" +
          (searchParams.size > 0 ? "?" + searchParams.toString() : "")
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      console.log(data)
      setViaje(data.conductor);
    },
    [fetchAuth]
  );

  useEffect(() => {
    fetchViaje();
  }, [fetchViaje]);

  const handleQuitar = async (id) => {
    // Preguntar si quiere quitar el viaje
    if (window.confirm("¿Desea quitar el usuario?")) {
      // Pedir a la api que quite el viaje
      const response = await fetchAuth(`http://localhost:3000/api/viaje/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        return window.alert("Error al quitar viaje");
      }

      await fetchViaje();
    }
  };

  return (
    <article>
      <h2>Viaje</h2>
        <Link role="button" to="/Viaje/crear">
          Nuevo viaje
        </Link>
      <div className="group">
        <input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
        <button onClick={() => fetchViaje(buscar)}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehiculo ID</th>
            <th>Conductor ID</th>
            <th>Fecha de Salida</th>
            <th>Fecha de Llegada</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Kilometros</th>
            <th>Obervaciones</th>
          </tr>
        </thead>
        <tbody>
          {Viaje.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.vehiculo_id}</td>
              <td>{u.conductor_id}</td>
              <td>{u.fecha_salida}</td>
              <td>{u.fecha_llegada}</td>
              <td>{u.origen}</td>
              <td>{u.destino}</td>
              <td>{u.kilometros}</td>
              <td>{u.observaciones}</td>
              <td>
                <div>
                  <Link role="button" to={`/Viaje/${u.id}`}>
                    Ver
                  </Link>
                  
                    <Link role="button" to={`/Viaje/${u.id}/modificar`}>
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