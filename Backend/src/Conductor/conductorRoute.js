import express from "express";
import { createConductor, getAllConductor, getConductorById } from "./conductorController.js";

const router = express.Router();

router.get("/", getAllConductor);
router.get("/:id", getConductorById);
router.post("/", createConductor);
// router.put("/:id", validarAlumno, validarId("id"), verificarValidacion, updateAlumno);
// router.delete("/:id", validarId("id"), verificarValidacion, deleteAlumno);

export default router;