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
export const validarUsuario = [
  body("nombre")
    .isAlpha("es-ES")
    .withMessage("El nombre solo puede contener letras.")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede tener más de 50 caracteres."),
  
  body("email")
    .isEmail({host_whitelist: ["gmail.com", "hotmail.com"]})
    .withMessage("Dominio de correo no permitido. Solo Gmail o Hotmail."),

  body("password", "Contraseña inválida")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres y contener letras y números."
    ),
];