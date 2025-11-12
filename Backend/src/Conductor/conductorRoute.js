import express from "express";
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

router.get("/", getAllConductor);

router.get("/:id", validarId, verificarValidaciones, getConductorById);

router.post("/", validarConductor, verificarValidaciones, createConductor);

router.put("/:id", validarId, validarConductor,  verificarValidaciones, updateConductor);

router.delete("/:id", validarId, verificarValidaciones, deleteConductor);


export default router;