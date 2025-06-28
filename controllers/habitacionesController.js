
const pool = require('../db/connection');

// POST (Hay que meterle todos los parametros)
exports.createHabitaciones = async (req, res) => {
  const {
    numero,
    tipo,
    descripcion,
    precio_noche,
    disponibilidad
  } = req.body;

  try {
    const result = await pool.query(
      'SELECT reservaciones.crear_habitacion($1, $2, $3, $4, $5)',
      [numero, tipo, descripcion, precio_noche, disponibilidad]
    );

    const mensaje = result.rows[0].crear_habitacion;

    if (mensaje === 'Habitación creada exitosamente') {
      return res.status(201).json({ mensaje });
    } else {
      return res.status(400).json({ mensaje }); // en caso de error lógico, como tipo no encontrado
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET por ID
exports.getHabitacionesById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservaciones.obtener_habitacion_por_id($1)', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT (Tipo, descripcion, precio_noche, disponibilidad)
exports.updateHabitaciones = async (req, res) => {
  const {
    tipo,
    descripcion,
    precio_noche,
    disponibilidad
  } = req.body;
  try {
    const result = await pool.query(
      'SELECT reservaciones.actualizar_habitacion($1, $2, $3, $4, $5)',
      [
        parseInt(req.params.id),
        tipo,
        descripcion,
        precio_noche,
        disponibilidad
      ]
    );
    const mensaje = result.rows[0].actualizar_habitacion;
    if (mensaje === 'Habitación actualizada correctamente') {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ mensaje }); // errores lógicos como tipo no encontrado
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE por id
exports.deleteHabitaciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT reservaciones.eliminar_habitacion($1)', [req.params.id]);
    res.json({ mensaje: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET con filtros (Faltan los filtros)
exports.searchHabitaciones = async (req, res) => {
  const { tipo, precio_maximo, disponibilidad } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.obtener_habitacion($1, $2, $3)',
      [
        tipo || null,
        precio_maximo ? parseFloat(precio_maximo) : null,
        disponibilidad || null
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

