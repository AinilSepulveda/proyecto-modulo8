// Arreglo en memoria que simula la base de datos de medicos del centro medico
// Cada medico tiene un id unico autoincremental, nombre, especialidad y email

export const medicos = [
  {
    id: 1,
    nombre: "Dr. Carlos Reyes",
    especialidad: "Medicina General",
    email: "carlos.reyes@clinica.cl",
  },
  {
    id: 2,
    nombre: "Dra. Francisca Munoz",
    especialidad: "Pediatria",
    email: "francisca.munoz@clinica.cl",
  },
  {
    id: 3,
    nombre: "Dr. Ignacio Torres",
    especialidad: "Cardiologia",
    email: "ignacio.torres@clinica.cl",
  },
];

// Variable utilizada para asignar el siguiente id disponible
export let nextMedicoId = 4;

export const setNextMedicoId = (valor) => {
  nextMedicoId = valor;
};
