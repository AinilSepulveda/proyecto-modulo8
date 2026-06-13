import {
  pacientes,
  nextPacienteId,
  setNextPacienteId,
} from "../data/pacientes.data.js";

/**
 * GET /api/pacientes
 * Lista todos los pacientes registrados.
 */
export const obtenerPacientes = (req, res) => {
  res.status(200).json({
    ok: true,
    total: pacientes.length,
    pacientes,
  });
};

/**
 * GET /api/pacientes/:id
 * Obtiene un paciente especifico por su id.
 */
export const obtenerPacientePorId = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El id debe ser un numero." });
  }

  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontro un paciente con id ${id}.`,
    });
  }

  res.status(200).json({ ok: true, paciente });
};

/**
 * POST /api/pacientes
 * Crea un nuevo paciente.
 * Body esperado: { nombre, rut, edad, diagnostico }
 */
export const crearPaciente = (req, res) => {
  const { nombre, rut, edad, diagnostico } = req.body;

  // Validacion de campos requeridos
  if (!nombre || !rut || edad === undefined || !diagnostico) {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos 'nombre', 'rut', 'edad' y 'diagnostico' son obligatorios.",
    });
  }

  // Validacion de tipos de datos
  if (typeof nombre !== "string" || typeof rut !== "string" || typeof diagnostico !== "string") {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos 'nombre', 'rut' y 'diagnostico' deben ser texto.",
    });
  }

  if (typeof edad !== "number" || edad <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "El campo 'edad' debe ser un numero mayor a 0.",
    });
  }

  const nuevoPaciente = {
    id: nextPacienteId,
    nombre,
    rut,
    edad,
    diagnostico,
  };

  pacientes.push(nuevoPaciente);
  setNextPacienteId(nextPacienteId + 1);

  res.status(201).json({
    ok: true,
    mensaje: "Paciente creado correctamente.",
    paciente: nuevoPaciente,
  });
};

/**
 * PUT /api/pacientes/:id
 * Actualiza los datos de un paciente existente.
 */
export const actualizarPaciente = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El id debe ser un numero." });
  }

  const indice = pacientes.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontro un paciente con id ${id}.`,
    });
  }

  const { nombre, rut, edad, diagnostico } = req.body;

  // Al menos un campo debe ser enviado para actualizar
  if (
    nombre === undefined &&
    rut === undefined &&
    edad === undefined &&
    diagnostico === undefined
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: "Debe enviar al menos un campo para actualizar (nombre, rut, edad, diagnostico).",
    });
  }

  // Validacion de tipos solo para los campos enviados
  if (nombre !== undefined && typeof nombre !== "string") {
    return res.status(400).json({ ok: false, mensaje: "El campo 'nombre' debe ser texto." });
  }
  if (rut !== undefined && typeof rut !== "string") {
    return res.status(400).json({ ok: false, mensaje: "El campo 'rut' debe ser texto." });
  }
  if (diagnostico !== undefined && typeof diagnostico !== "string") {
    return res.status(400).json({ ok: false, mensaje: "El campo 'diagnostico' debe ser texto." });
  }
  if (edad !== undefined && (typeof edad !== "number" || edad <= 0)) {
    return res.status(400).json({ ok: false, mensaje: "El campo 'edad' debe ser un numero mayor a 0." });
  }

  const pacienteActualizado = {
    ...pacientes[indice],
    ...(nombre !== undefined && { nombre }),
    ...(rut !== undefined && { rut }),
    ...(edad !== undefined && { edad }),
    ...(diagnostico !== undefined && { diagnostico }),
  };

  pacientes[indice] = pacienteActualizado;

  res.status(200).json({
    ok: true,
    mensaje: "Paciente actualizado correctamente.",
    paciente: pacienteActualizado,
  });
};

/**
 * DELETE /api/pacientes/:id
 * Elimina un paciente existente.
 */
export const eliminarPaciente = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ ok: false, mensaje: "El id debe ser un numero." });
  }

  const indice = pacientes.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontro un paciente con id ${id}.`,
    });
  }

  const [pacienteEliminado] = pacientes.splice(indice, 1);

  res.status(200).json({
    ok: true,
    mensaje: "Paciente eliminado correctamente.",
    paciente: pacienteEliminado,
  });
};
