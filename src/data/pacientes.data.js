// Arreglo en memoria que simula la base de datos de pacientes del centro medico
// Cada paciente tiene un id unico autoincremental, nombre, edad, rut y diagnostico

export const pacientes = [
  {
    id: 1,
    nombre: "Maria Gonzalez",
    rut: "12.345.678-9",
    edad: 34,
    diagnostico: "Control rutinario",
  },
  {
    id: 2,
    nombre: "Pedro Fuentes",
    rut: "9.876.543-2",
    edad: 58,
    diagnostico: "Hipertension",
  },
  {
    id: 3,
    nombre: "Ana Soto",
    rut: "15.234.567-1",
    edad: 27,
    diagnostico: "Embarazo - control prenatal",
  },
];

// Variable utilizada para asignar el siguiente id disponible
export let nextPacienteId = 4;

export const setNextPacienteId = (valor) => {
  nextPacienteId = valor;
};
