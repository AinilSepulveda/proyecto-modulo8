import {
  medicos,
  nextMedicoId,
  setNextMedicoId,
} from "../data/medicos.data.js";

// Expresion regular simple para validar formato de email
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /api/medicos
 * Lista todos los medicos registrados.
 */
export const obtenerMedicos = (req, res) => {
  res.status(200).json({
    ok: true,
    total: medicos.length,
    medicos,
  });
};

/**
 * GET /api/medicos/:id
 * Obtiene un medico especifico por su id.
 */
export const obtenerMedicoPorId = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El id debe ser un numero." });
  }

  const medico = medicos.find((m) => m.id === id);

  if (!medico) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontro un medico con id ${id}.`,
    });
  }

  res.status(200).json({ ok: true, medico });
};

/**
 * POST /api/medicos
 * Crea un nuevo medico.
 * Body esperado: { nombre, especialidad, email }
 */
export const crearMedico = (req, res) => {
  const { nombre, especialidad, email } = req.body;

  if (!nombre || !especialidad || !email) {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos 'nombre', 'especialidad' y 'email' son obligatorios.",
    });
  }

  if (typeof nombre !== "string" || typeof especialidad !== "string" || typeof email !== "string") {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos 'nombre', 'especialidad' y 'email' deben ser texto.",
    });
  }

  if (!REGEX_EMAIL.test(email)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El campo 'email' debe tener un formato valido.",
    });
  }

  const nuevoMedico = {
    id: nextMedicoId,
    nombre,
    especialidad,
    email,
  };

  medicos.push(nuevoMedico);
  setNextMedicoId(nextMedicoId + 1);

  res.status(201).json({
    ok: true,
    mensaje: "Medico creado correctamente.",
    medico: nuevoMedico,
  });
};

/**
 * PUT /api/medicos/:id
 * Actualiza los datos de un medico existente.
 */
export const actualizarMedico = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El id debe ser un numero." });
  }

  const indice = medicos.findIndex((m) => m.id === id);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontro un medico con id ${id}.`,
    });
  }

  const { nombre, especialidad, email } = req.body;

  if (nombre === undefined && especialidad === undefined && email === undefined) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe enviar al menos un campo para actualizar (nombre, especialidad, email).",
    });
  }

  if (nombre !== undefined && typeof nombre !== "string") {
    return res.status(400).json({ ok: false, mensaje: "El campo 'nombre' debe ser texto." });
  }
  if (especialidad !== undefined && typeof especialidad !== "string") {
    return res.status(400).json({ ok: false, mensaje: "El campo 'especialidad' debe ser texto." });
  }
  if (email !== undefined) {
    if (typeof email !== "string" || !REGEX_EMAIL.test(email)) {
      return res.status(400).json({ ok: false, mensaje: "El campo 'email' debe tener un formato valido." });
    }
  }

  const medicoActualizado = {
    ...medicos[indice],
    ...(nombre !== undefined && { nombre }),
    ...(especialidad !== undefined && { especialidad }),
    ...(email !== undefined && { email }),
  };

  medicos[indice] = medicoActualizado;

  res.status(200).json({
    ok: true,
    mensaje: "Medico actualizado correctamente.",
    medico: medicoActualizado,
  });
};

/**
 * DELETE /api/medicos/:id
 * Elimina un medico existente.
 */
export const eliminarMedico = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El id debe ser un numero." });
  }

  const indice = medicos.findIndex((m) => m.id === id);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontro un medico con id ${id}.`,
    });
  }

  const [medicoEliminado] = medicos.splice(indice, 1);

  res.status(200).json({
    ok: true,
    mensaje: "Medico eliminado correctamente.",
    medico: medicoEliminado,
  });
};
