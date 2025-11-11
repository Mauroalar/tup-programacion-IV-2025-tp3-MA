import express from "express";
import { createViaje, getAllviaje, getViajeById } from "./viajeController.js";

const router = express.Router();

router.get("/", getAllviaje);
router.get("/:id", getViajeById);
router.post("/", createViaje);
// router.put("/:id", validarAlumno, validarId("id"), verificarValidacion, updateAlumno);
// router.delete("/:id", validarId("id"), verificarValidacion, deleteAlumno);

export default router;