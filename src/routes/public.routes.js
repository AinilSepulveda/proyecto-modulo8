import { Router } from "express";

const router = Router();

/**
 * GET /api/acerca
 * Endpoint publico con informacion general sobre la API.
 */
router.get("/acerca", (req, res) => {
  res.status(200).json({
    ok: true,
    nombre: "API Backend Clinica - Node + Express",
    version: "1.0.0",
    descripcion:
      "API REST para la gestion de pacientes y medicos de un centro medico. " +
      "Permite operaciones CRUD sobre pacientes y medicos (almacenados en memoria), " +
      "subida de examenes en formato PDF y autenticacion mediante JWT.",
    autenticacion: "JWT (Bearer Token). Obtener token en POST /api/auth/login",
    endpoints: {
      publicos: ["POST /api/auth/login", "GET /api/acerca"],
      privados: [
        "GET /api/pacientes",
        "GET /api/pacientes/:id",
        "POST /api/pacientes",
        "PUT /api/pacientes/:id",
        "DELETE /api/pacientes/:id",
        "GET /api/medicos",
        "GET /api/medicos/:id",
        "POST /api/medicos",
        "PUT /api/medicos/:id",
        "DELETE /api/medicos/:id",
        "POST /api/examenes",
        "GET /api/archivos",
      ],
    },
  });
});

export default router;
