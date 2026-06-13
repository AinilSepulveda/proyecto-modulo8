import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import {
  obtenerPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacientes.controller.js";

const router = Router();

// Todas las rutas de pacientes son privadas y requieren un token JWT valido
router.use(verificarToken);

router.get("/", obtenerPacientes);
router.get("/:id", obtenerPacientePorId);
router.post("/", crearPaciente);
router.put("/:id", actualizarPaciente);
router.delete("/:id", eliminarPaciente);

export default router;
