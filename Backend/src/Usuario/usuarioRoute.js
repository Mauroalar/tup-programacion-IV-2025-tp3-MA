import express from "express";
import { createUsuario, getAllUsuario, getUsuarioById } from "./usuarioController.js";

const router = express.Router();

router.get("/", getAllUsuario);
router.get("/:id", getUsuarioById);
router.post("/", createUsuario);
// router.put("/:id", validarAlumno, validarId("id"), verificarValidacion, updateAlumno);
// router.delete("/:id", validarId("id"), verificarValidacion, deleteAlumno);

export default router;