import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * POST /api/auth/login
 * Endpoint publico que permite autenticarse y obtener un token JWT.
 * Body esperado: { "usuario": "admin", "password": "admin123" }
 */
router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  // Validacion de datos de entrada
  if (!usuario || !password) {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos 'usuario' y 'password' son obligatorios.",
    });
  }

  // Validacion de credenciales contra los datos definidos en variables de entorno
  const usuarioValido = usuario === process.env.ADMIN_USER;
  const passwordValida = password === process.env.ADMIN_PASSWORD;

  if (!usuarioValido || !passwordValida) {
    return res.status(401).json({
      ok: false,
      mensaje: "Usuario o contrasena incorrectos.",
    });
  }

  // Generacion del token JWT
  const token = jwt.sign(
    { usuario, rol: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return res.status(200).json({
    ok: true,
    mensaje: "Autenticacion exitosa.",
    token,
  });
});

export default router;
