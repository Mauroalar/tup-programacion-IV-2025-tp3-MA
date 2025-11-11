import express from "express";
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

router.get("/", getAllUsuario);

router.get("/:id", validarId, verificarValidaciones, getUsuarioById);

router.post("/", validarUsuario, verificarValidaciones, createUsuario);

router.put("/:id", validarId, validarUsuario,  verificarValidaciones, updateUsuario);

router.delete("/:id", validarId, verificarValidaciones, deleteUsuario);


export default router;