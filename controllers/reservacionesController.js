
const pool = require('../db/connection');

// POST
exports.createReservaciones = async (req, res) => {
  const {
    id_cliente,
    id_habitacion,
    fecha_entrada,
    fecha_salida,
    numero_huespedes,
    solicitudes_especiales
  } = req.body;
  try {
    const result = await pool.query(
      'SELECT reservaciones.crear_reservacion($1, $2, $3, $4, $5, $6)',
      [
        id_cliente,
        id_habitacion,
        fecha_entrada,
        fecha_salida,
        numero_huespedes,
        solicitudes_especiales
      ]
    );
    const mensaje = result.rows[0].crear_reservacion;
    // Verifica si fue error o éxito según el mensaje
    if (mensaje === 'Reservación creada con éxito') {
      return res.status(201).json({ mensaje });
    } else {
      return res.status(400).json({ mensaje });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET por ID
exports.getReservacionesById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservaciones.obtener_reservacion_por_id($1)', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT 
exports.updateReservaciones = async (req, res) => {
  const {
    fecha_entrada,
    fecha_salida,
    numero_huespedes,
    solicitudes_especiales
  } = req.body;
  try {
    const result = await pool.query(
      'SELECT reservaciones.actualizar_reservacion($1, $2, $3, $4, $5)',
      [
        req.params.id,
        fecha_entrada,
        fecha_salida,
        numero_huespedes,
        solicitudes_especiales
      ]
    );
    const mensaje = result.rows[0].actualizar_reservacion;
    res.status(200).json({ mensaje });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE (Cambiar por cancelar)
exports.deleteReservaciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT reservaciones.cancelar_reservacion($1)', [req.params.id]);
    res.json({ mensaje: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET con filtros(Actualizar parametros)
exports.searchReservaciones = async (req, res) => {
  const { clienteid, fechaentrada, estado } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.obtener_reservacion($1, $2, $3)',
      [
        clienteid ? parseInt(clienteid) : null,
        fechaentrada || null,
        estado || null
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

