import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} from "../controllers/medicos.controller.js";

const router = Router();

// Todas las rutas de medicos son privadas y requieren un token JWT valido
router.use(verificarToken);

router.get("/", obtenerMedicos);
router.get("/:id", obtenerMedicoPorId);
router.post("/", crearMedico);
router.put("/:id", actualizarMedico);
router.delete("/:id", eliminarMedico);

export default router;
