import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Informacion de la API disponible en http://localhost:${PORT}/api/acerca`);
});
