import express from "express";
import { verificarAutenticacion } from "../context/auth.js";
import {
  getAllConductor,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
} from "../Conductor/conductorController.js"
import {
  validarConductor,
  validarId,
  verificarValidaciones,
} from "../Conductor/conductorValidaciones.js";

const router = express.Router();

router.get("/", verificarAutenticacion, getAllConductor);

router.get("/:id", verificarAutenticacion, validarId, verificarValidaciones, getConductorById);

router.post("/", verificarAutenticacion, validarConductor, verificarValidaciones, createConductor);

router.put("/:id", verificarAutenticacion, validarId, validarConductor,  verificarValidaciones, updateConductor);

router.delete("/:id", verificarAutenticacion, validarId, verificarValidaciones, deleteConductor);


export default router;