# API Backend Clinica - Node.js + Express

Evaluacion Final del Modulo 8 - Kibernum IT Academy
**Actividad:** API Backend Node Express

## Descripcion

API REST desarrollada con **Node.js** y **Express** para una aplicacion empresarial de un centro medico. La API permite:

- Gestionar pacientes y medicos mediante operaciones **CRUD** (almacenados en un arreglo en memoria).
- Subir examenes medicos en formato **PDF**.
- Listar los archivos subidos al servidor.
- Autenticacion mediante **JWT** para proteger los endpoints privados.

## Tecnologias utilizadas

- Node.js
- Express
- jsonwebtoken (JWT)
- multer (subida de archivos)
- dotenv (variables de entorno)
- cors

## Estructura del proyecto

```
proyecto-modulo8/
├── src/
│   ├── controllers/
│   │   ├── pacientes.controller.js
│   │   ├── medicos.controller.js
│   │   └── archivos.controller.js
│   ├── data/
│   │   ├── pacientes.data.js
│   │   └── medicos.data.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── public.routes.js
│   │   ├── pacientes.routes.js
│   │   ├── medicos.routes.js
│   │   └── archivos.routes.js
│   ├── app.js
│   └── server.js
├── uploads/              # Carpeta donde se guardan los PDFs subidos
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Instalacion

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd proyecto-modulo8

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Copiar .env.example a .env y ajustar valores si es necesario
cp .env.example .env

# 4. Iniciar el servidor
npm start

# (Opcional) Modo desarrollo con recarga automatica
npm run dev
```

El servidor quedara disponible en `http://localhost:3000`.

## Variables de entorno (.env)

| Variable | Descripcion | Valor por defecto |
|----------|-------------|--------------------|
| `PORT` | Puerto del servidor | `3000` |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT | - |
| `JWT_EXPIRES_IN` | Tiempo de expiracion del token | `1h` |
| `ADMIN_USER` | Usuario valido para login | `admin` |
| `ADMIN_PASSWORD` | Contrasena valida para login | `admin123` |

## Autenticacion

Para acceder a los endpoints privados se debe:

1. Obtener un token mediante `POST /api/auth/login`.
2. Enviar el token en cada peticion privada mediante el header:

```
Authorization: Bearer <token>
```

## Endpoints disponibles

### Publicos

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| `POST` | `/api/auth/login` | Autenticacion. Body: `{ "usuario": "admin", "password": "admin123" }` |
| `GET` | `/api/acerca` | Informacion general de la API |

### Pacientes (privados - requieren JWT)

| Metodo | Ruta | Descripcion | Body |
|--------|------|-------------|------|
| `GET` | `/api/pacientes` | Lista todos los pacientes | - |
| `GET` | `/api/pacientes/:id` | Obtiene un paciente por id | - |
| `POST` | `/api/pacientes` | Crea un nuevo paciente | `{ "nombre", "rut", "edad", "diagnostico" }` |
| `PUT` | `/api/pacientes/:id` | Actualiza un paciente | Uno o mas campos del body anterior |
| `DELETE` | `/api/pacientes/:id` | Elimina un paciente | - |

### Medicos (privados - requieren JWT)

| Metodo | Ruta | Descripcion | Body |
|--------|------|-------------|------|
| `GET` | `/api/medicos` | Lista todos los medicos | - |
| `GET` | `/api/medicos/:id` | Obtiene un medico por id | - |
| `POST` | `/api/medicos` | Crea un nuevo medico | `{ "nombre", "especialidad", "email" }` |
| `PUT` | `/api/medicos/:id` | Actualiza un medico | Uno o mas campos del body anterior |
| `DELETE` | `/api/medicos/:id` | Elimina un medico | - |

### Examenes y archivos (privados - requieren JWT)

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| `POST` | `/api/examenes` | Sube un examen en formato PDF (form-data, campo `examen`) |
| `GET` | `/api/archivos` | Lista los nombres de los archivos subidos al servidor |

## Codigos de respuesta HTTP

| Codigo | Significado |
|--------|-------------|
| `200` | Solicitud exitosa (lectura, actualizacion, eliminacion) |
| `201` | Recurso creado exitosamente |
| `400` | Datos invalidos o faltantes en la solicitud |
| `401` | No autenticado o token invalido/expirado |
| `404` | Recurso o ruta no encontrada |
| `500` | Error interno del servidor |

## Ejemplos de uso (curl)

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"admin123"}'
```

### Listar pacientes

```bash
curl http://localhost:3000/api/pacientes \
  -H "Authorization: Bearer <token>"
```

### Crear un paciente

```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Perez","rut":"11.111.111-1","edad":40,"diagnostico":"Gripe"}'
```

### Subir un examen en PDF

```bash
curl -X POST http://localhost:3000/api/examenes \
  -H "Authorization: Bearer <token>" \
  -F "examen=@/ruta/al/archivo.pdf"
```

### Listar archivos subidos

```bash
curl http://localhost:3000/api/archivos \
  -H "Authorization: Bearer <token>"
```

## Notas

- Los datos de pacientes y medicos se almacenan en memoria (arreglos), por lo que se reinician al reiniciar el servidor.
- Solo se permiten archivos en formato **PDF** para la subida de examenes (validacion por extension y tipo MIME), con un tamano maximo de 5MB.
- Todos los endpoints privados validan el token JWT mediante un middleware de autenticacion centralizado.
- El manejo de errores esta centralizado en un middleware que retorna respuestas con formato consistente (`ok`, `mensaje`).
