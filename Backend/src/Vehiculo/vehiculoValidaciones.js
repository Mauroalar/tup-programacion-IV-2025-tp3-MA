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
export const validarVehiculo = [
  body("marca")
    .isAlpha("es-ES")
    .withMessage("La marca solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("La marca no puede tener más de 50 caracteres."),
  
  body("modelo")
    .isAlpha("es-ES")
    .withMessage("El modelo solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("El modelo no puede tener más de 50 caracteres."),  
    
  body("patente")
    .isAlpha("es-ES")
    .withMessage("La patente solo puede contener letras.")
    .isLength({ max: 20 })
    .withMessage("La patente no puede tener más de 20 caracteres."),

  body("año")
    .isNumeric()
    .withMessage("El nombre solo puede contener numeros.")
    .isLength({ max: 10 })
    .withMessage("El año no puede tener más de 10 caracteres."),  

  body("capacidad")
  .isInt({ min: 1, max: 500 })
  .withMessage("La capacidad debe ser un número entre 1 y 200."),

];