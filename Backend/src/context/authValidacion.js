import { body, validationResult } from "express-validator";


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
export const validarLogin = [
  body("email")
    .isEmail({host_whitelist: ["gmail.com", "hotmail.com"]})
    .withMessage("Dominio de correo no permitido. Solo Gmail o Hotmail."),

  body("password", "Contraseña inválida")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres y contener letras y números."
    ),
];