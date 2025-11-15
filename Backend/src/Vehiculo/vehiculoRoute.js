import express from "express";
import { verificarAutenticacion } from "../context/auth.js";
import {
  getAllVehiculo,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../Vehiculo/vehiculoController.js";
import {
  validarVehiculo,
  validarId,
  verificarValidaciones,
} from "../Vehiculo/vehiculoValidaciones.js";

const router = express.Router();

router.get("/", verificarAutenticacion, getAllVehiculo);

router.get("/:id", verificarAutenticacion, validarId, verificarValidaciones, getVehiculoById);

router.post("/", verificarAutenticacion, validarVehiculo, verificarValidaciones, createVehiculo);

router.put("/:id", verificarAutenticacion, validarId, validarVehiculo,  verificarValidaciones, updateVehiculo);

router.delete("/:id", verificarAutenticacion, validarId, verificarValidaciones, deleteVehiculo);


export default router;