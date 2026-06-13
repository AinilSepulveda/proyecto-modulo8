import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { uploadPdf } from "../middlewares/upload.middleware.js";
import { subirExamen, listarArchivos } from "../controllers/archivos.controller.js";

const router = Router();

// Subida de examenes en PDF (campo del formulario: "examen") - ruta privada
router.post("/api/examenes", verificarToken, uploadPdf.single("examen"), subirExamen);

// Listado de archivos subidos al servidor - ruta privada
router.get("/api/archivos", verificarToken, listarArchivos);

export default router;
