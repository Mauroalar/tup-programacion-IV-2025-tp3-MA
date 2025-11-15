import express from "express";
import { verificarAutenticacion } from "../context/auth.js";
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

router.get("/",verificarAutenticacion, getAllViaje);

router.get("/:id", verificarAutenticacion, validarId, verificarValidaciones, getViajeById);

router.post("/",verificarAutenticacion, validarViaje, verificarValidaciones, createViaje);

router.put("/:id",verificarAutenticacion, validarId, validarViaje,  verificarValidaciones, updateViaje);

router.delete("/:id",verificarAutenticacion, validarId, verificarValidaciones, deleteViaje);


export default router;