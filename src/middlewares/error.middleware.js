// Middleware de manejo centralizado de errores
// Captura cualquier error pasado mediante next(error) y responde con un formato consistente
export const manejadorErrores = (err, req, res, next) => {
  console.error("Error capturado:", err.message);

  // Errores generados por Multer (subida de archivos)
  if (err.name === "MulterError") {
    let mensaje = "Error al subir el archivo.";

    if (err.code === "LIMIT_FILE_SIZE") {
      mensaje = "El archivo supera el tamano maximo permitido (5MB).";
    }

    return res.status(400).json({
      ok: false,
      mensaje,
    });
  }

  // Error lanzado manualmente desde el filtro de archivos (tipo invalido)
  if (err.message === "TIPO_ARCHIVO_INVALIDO") {
    return res.status(400).json({
      ok: false,
      mensaje: "Solo se permite la subida de archivos en formato PDF.",
    });
  }

  // Error generico no controlado
  const codigo = err.statusCode || 500;
  return res.status(codigo).json({
    ok: false,
    mensaje: err.mensaje || "Ha ocurrido un error interno en el servidor.",
  });
};

// Middleware para rutas no encontradas (404)
export const rutaNoEncontrada = (req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: `La ruta ${req.method} ${req.originalUrl} no existe.`,
  });
};
