import express from "express";
import { verificarAutenticacion } from "../context/auth.js";
import {
  getAllUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../Usuario/usuarioController.js";
import {
  validarUsuario,
  validarId,
  verificarValidaciones,
} from "../Usuario/usuarioValidaciones.js";

const router = express.Router();

router.get("/", verificarAutenticacion, getAllUsuario);

router.get("/:id", verificarAutenticacion, validarId, verificarValidaciones, getUsuarioById);

router.post("/", validarUsuario, verificarValidaciones, createUsuario);

router.put("/:id", verificarAutenticacion, validarId, validarUsuario,  verificarValidaciones, updateUsuario);

router.delete("/:id", verificarAutenticacion, validarId, verificarValidaciones, deleteUsuario);


export default router;