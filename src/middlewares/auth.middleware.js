import jwt from "jsonwebtoken";

// Middleware que protege las rutas privadas validando el token JWT
// El token debe enviarse en el header Authorization con el formato: Bearer <token>
export const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        mensaje: "Acceso denegado. No se proporciono un token de autenticacion.",
      });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        ok: false,
        mensaje: "Formato de token invalido. Use: Bearer <token>",
      });
    }

    const token = partes[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          mensaje: "Token invalido o expirado.",
        });
      }

      // Se guarda la informacion del usuario autenticado en la request
      req.usuario = payload;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error interno al validar el token.",
      error: error.message,
    });
  }
};
