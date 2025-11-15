import { Outlet, Link } from "react-router";
import { useAuth } from "../../context/Auth";
import { Ingresar } from "../Login/Componente/Ingresar";
import { AuthElements } from "../../context/Auth";

export const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <main className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <AuthElements>
            <li>
                <Link to="/vehiculos">Vehiculos</Link>
            </li>
            <li>
                <Link to="/conductores">Conductores</Link>
            </li>
            <li>
                <Link to="/viajes">viajes</Link>
            </li>
          </AuthElements>
        </ul>
        <li>
          {isAuthenticated ? (
            <button onClick={() => logout()}>Salir</button>
          ) : (
            <>
              <Ingresar />
            <Link type="button" to="/register">
              Registrar
            </Link>
            </>
          )}
        </li>
      </nav>
      <Outlet />
    </main>
  );
};