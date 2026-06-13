import fs from "fs";
import path from "path";

const carpetaUploads = path.join(process.cwd(), "uploads");

/**
 * POST /api/examenes
 * Permite subir un examen medico en formato PDF.
 * El archivo debe enviarse mediante form-data con la key "examen".
 */
export const subirExamen = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe adjuntar un archivo PDF en el campo 'examen'.",
    });
  }

  res.status(201).json({
    ok: true,
    mensaje: "Examen subido correctamente.",
    archivo: {
      nombre: req.file.filename,
      nombreOriginal: req.file.originalname,
      tamano: req.file.size,
      ruta: `/uploads/${req.file.filename}`,
    },
  });
};

/**
 * GET /api/archivos
 * Lista los nombres de todos los archivos (examenes) subidos al servidor.
 */
export const listarArchivos = (req, res) => {
  fs.readdir(carpetaUploads, (err, archivos) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "No se pudo leer el directorio de archivos.",
        error: err.message,
      });
    }

    // Se excluye el archivo .gitkeep utilizado para mantener la carpeta en el repositorio
    const archivosFiltrados = archivos.filter((nombre) => nombre !== ".gitkeep");

    res.status(200).json({
      ok: true,
      total: archivosFiltrados.length,
      archivos: archivosFiltrados,
    });
  });
};
