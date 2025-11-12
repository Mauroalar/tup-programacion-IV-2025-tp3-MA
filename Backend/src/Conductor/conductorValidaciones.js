import { body, param, validationResult } from "express-validator";

//  Validar ID de usuario
export const validarId = param("id").isInt({ min: 1 }).withMessage("ID inválido");

// Middleware genérico para verificar validaciones
export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Falla de validación",
      errores: validacion.array(),
    });
  }
  next();
};

//  Validaciones para crear usuario
export const validarConductor = [
  body("nombre")
    .isAlpha("es-ES")
    .withMessage("El nombre solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede tener más de 50 caracteres."),
  
  body("apellido")
    .isAlpha("es-ES")
    .withMessage("El apellido solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("El apellido no puede tener más de 50 caracteres."),  
    
  body("dni")
    .isInt({ min: 1000000, max: 99999999 })
    .withMessage("El DNI solo puede contener numeros."),

  body("licencia")
    .isAlpha("es-ES")
    .withMessage("La licencia solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("La licencia no puede tener más de 50 caracteres."),  

  body("fecha_de_vencimiento")
  .notEmpty()
  .withMessage("Debe ingresar la fecha de vencimiento.")
  .bail()
  .isISO8601()
  .withMessage("La fecha de vencimiento debe tener un formato válido (YYYY-MM-DD).")
];