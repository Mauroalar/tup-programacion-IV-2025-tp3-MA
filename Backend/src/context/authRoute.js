import express from "express";
import {
  validarLogin,  
  verificarValidaciones,
} from "../context/authValidacion.js";
import { login } from "./auth.js";


const router = express.Router();

router.post("/", validarLogin, verificarValidaciones, login );


export default router;