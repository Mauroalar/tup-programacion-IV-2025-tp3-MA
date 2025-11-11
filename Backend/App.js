import express from "express";
import cors from "cors";
import { conectarDB } from "./src/config/db.js";
import conductorRoute from "./src/Conductor/conductorRoute.js";
import usuarioRoute from "./src/Usuario/usuarioRoute.js";
import vehiculoRoute from "./src/Vehiculo/vehiculoRoute.js";

conectarDB();

const app = express();
const port = 3000;

// Para interpretar body como JSON
app.use(express.json());

// Habilito CORS
app.use(cors());

app.get("/", (req, res) => {
  // Responder con string
  res.send("Hola mundo!");
});

app.use("/api/conductores", conductorRoute);
app.use("/api/usuarios", usuarioRoute);
app.use("/api/vehiculos", vehiculoRoute);


app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});