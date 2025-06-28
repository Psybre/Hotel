const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/clientesRoutes'));
app.use('/api', require('./routes/habitacionesRoutes'));
app.use('/api', require('./routes/reservacionesRoutes'));
app.use('/api', require('./routes/pagosRoutes'));
app.use('/api', require('./routes/serviciosRoutes'));

// Ruta raíz (¡NUEVO!)
app.get('/', (req, res) => {
  res.json({
    message: "¡Bienvenido al API del Hotel!",
    endpoints: {
      clientes: "/api/clientes",
      habitaciones: "/api/habitaciones",
      reservaciones: "/api/reservaciones",
      pagos: "/api/pagos",
      servicios: "/api/servicios"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
