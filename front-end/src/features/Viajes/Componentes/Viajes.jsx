import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/Auth";
import { Link } from "react-router";


export const Viaje = () => {
    const { fetchAuth } = useAuth();

  const [Viajes, setViajes] = useState([]);
  const [buscar, setBuscar] = useState("");

  const fetchViajes = useCallback(
    async (buscar) => {
      const searchParams = new URLSearchParams();

      if (buscar) {
        searchParams.append("consul", buscar);
      }

      const response = await fetchAuth(
        "http://localhost:3000/api/viajes" +
          (searchParams.size > 0 ? "?" + searchParams.toString() : "")
      );
      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data.error);
        return;
      }

      console.log(data)
      setViajes(data.viaje);
    },
    [fetchAuth]
  );

  useEffect(() => {
    fetchViajes();
  }, [fetchViajes]);

  const handleQuitar = async (id) => {
    // Preguntar si quiere quitar el Viajes
    if (window.confirm("¿Desea quitar el Viajes?")) {
      // Pedir a la api que quite el Viajes
      const response = await fetchAuth(`http://localhost:3000/api/viajes/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        return window.alert("Error al quitar Viajes");
      }

      await fetchViajes();
    }
  };

  const resultKilometros = Viajes.map((v) => (
    {id:v.conductor_id , kilometros: v.kilometros}

  ));
  
  return (
    <article>
      <h2>Viajes</h2>
        <Link role="button" to="/Viajes/crear">
          Nuevo Viajes
        </Link>
      <div className="group">
        <input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
        <button onClick={() => fetchViajes(buscar)}>Buscar</button>
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
            <th>Kilometros por Conductor</th>
          </tr>
        </thead>
        <tbody>
          {Viajes.map((u) => (
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
                {resultKilometros
                  .filter(km => km.id === u.conductor_id)
                  .reduce((ac, km) => ac + Number(km.kilometros), 0)}
              </td>
              <td>
                <div>
                  {/* <Link role="button" to={`/Viajes/${u.id}`}>
                    Ver
                  </Link>
                   */}
                    <Link role="button" to={`/Viajes/${u.id}/modificar`}>
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