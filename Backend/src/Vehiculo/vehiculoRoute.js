import express from "express";
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

router.get("/", getAllVehiculo);

router.get("/:id", validarId, verificarValidaciones, getVehiculoById);

router.post("/", validarVehiculo, verificarValidaciones, createVehiculo);

router.put("/:id", validarId, validarVehiculo,  verificarValidaciones, updateVehiculo);

router.delete("/:id", validarId, verificarValidaciones, deleteVehiculo);


export default router;