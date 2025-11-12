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
export const validarViaje = [
  body("vehiculo_id")
    .isInt({ min: 1 })
    .withMessage("ID inválido"),
  
  body("conductor_id")
    .isInt({ min: 1 })
    .withMessage("ID inválido"),
  
  body("fecha_salida")
  .notEmpty()
  .withMessage("Debe ingresar la fecha de salida.")
  .bail()
  .isISO8601()
  .withMessage("La fecha de salida debe tener un formato válido (YYYY-MM-DD)."),
  
  body("fecha_llegada")
  .notEmpty()
  .withMessage("Debe ingresar la fecha de llegada.")
  .bail()
  .isISO8601()
  .withMessage("La fecha de llegada debe tener un formato válido (YYYY-MM-DD)."),
    
  body("origen")
    .isAlpha("es-ES")
    .withMessage("El origen solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("El origen no puede tener más de 50 caracteres."),

  body("destino")
    .isAlpha("es-ES")
    .withMessage("El destino solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("El destino no puede tener más de 50 caracteres."),  

  body("kilometros")
  .isInt({ min: 1 })
  .withMessage("Los kilometros solo puede contener numeros positivos."),

  body("observaciones")
    .isAlpha("es-ES")
    .withMessage("Las observaciones solo puede contener letras.")
    .isLength({ max: 100 })
    .withMessage("Las observaciones no puede tener más de 50 caracteres."),  
];