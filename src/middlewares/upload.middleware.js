import multer from "multer";
import path from "path";
import fs from "fs";

// Carpeta donde se almacenaran los examenes subidos
const carpetaDestino = path.join(process.cwd(), "uploads");

// Si la carpeta no existe, se crea automaticamente
if (!fs.existsSync(carpetaDestino)) {
  fs.mkdirSync(carpetaDestino, { recursive: true });
}

// Configuracion de almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaDestino);
  },
  filename: (req, file, cb) => {
    // Se renombra el archivo agregando una marca de tiempo para evitar sobreescrituras
    const timestamp = Date.now();
    const nombreOriginal = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${nombreOriginal}`);
  },
});

// Filtro que valida que el archivo subido sea un PDF
const filtroArchivo = (req, file, cb) => {
  const esPdfMime = file.mimetype === "application/pdf";
  const esPdfExtension = path.extname(file.originalname).toLowerCase() === ".pdf";

  if (esPdfMime && esPdfExtension) {
    cb(null, true);
  } else {
    cb(new Error("TIPO_ARCHIVO_INVALIDO"), false);
  }
};

// Middleware de subida configurado: solo PDF, maximo 20MB
export const uploadPdf = multer({
  storage,
  fileFilter: filtroArchivo,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});
