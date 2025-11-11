import express from "express";
import { createVehiculo, getAllVehiculo, getVehiculoById } from "./vehiculoController.js";

const router = express.Router();

router.get("/", getAllVehiculo);
router.get("/:id", getVehiculoById);
router.post("/", createVehiculo);
// router.put("/:id", validarAlumno, validarId("id"), verificarValidacion, updateAlumno);
// router.delete("/:id", validarId("id"), verificarValidacion, deleteAlumno);

export default router;