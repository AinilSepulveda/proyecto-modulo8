import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import medicosRoutes from "./routes/medicos.routes.js";
import archivosRoutes from "./routes/archivos.routes.js";
import { manejadorErrores, rutaNoEncontrada } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta estatica para acceder a los archivos subidos (examenes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Endpoint GET /files - Lista archivos de la carpeta uploads
app.get("/files", (req, res) => {
  const carpetaUploads = path.join(process.cwd(), "uploads");
  
  fs.readdir(carpetaUploads, (err, archivos) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "No se pudo leer el directorio de archivos.",
      });
    }
    
    const archivosFiltrados = archivos.filter((nombre) => nombre !== ".gitkeep");
    
    res.status(200).json({
      ok: true,
      total: archivosFiltrados.length,
      archivos: archivosFiltrados,
    });
  });
});

// Rutas publicas
app.use("/api/auth", authRoutes); // POST /api/auth/login
app.use("/api", publicRoutes); // GET /api/acerca

// Rutas privadas (requieren JWT)
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/medicos", medicosRoutes);
app.use("/", archivosRoutes); // POST /api/examenes, GET /api/archivos

// Ruta raiz de cortesia
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: "API Backend Clinica funcionando correctamente. Visita /api/acerca para mas informacion.",
  });
});

// Manejo de rutas no encontradas (404)
app.use(rutaNoEncontrada);

// Manejo centralizado de errores
app.use(manejadorErrores);

export default app;
