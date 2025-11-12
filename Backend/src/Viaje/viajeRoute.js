import express from "express";
import {
  getAllViaje,
  getViajeById,
  createViaje,
  updateViaje,
  deleteViaje,
} from "../Viaje/viajeController.js"
import {
  validarViaje,
  validarId,
  verificarValidaciones,
} from "../Viaje/viajeValidaciones.js";

const router = express.Router();

router.get("/", getAllViaje);

router.get("/:id", validarId, verificarValidaciones, getViajeById);

router.post("/", validarViaje, verificarValidaciones, createViaje);

router.put("/:id", validarId, validarViaje,  verificarValidaciones, updateViaje);

router.delete("/:id", validarId, verificarValidaciones, deleteViaje);


export default router;