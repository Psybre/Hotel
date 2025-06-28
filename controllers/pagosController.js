
const pool = require('../db/connection');


// Obtener por ID
exports.getPagosById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservaciones.obtener_pago_por_id($1)', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST 
exports.createPagos = async (req, res) => {
  const {
    id_reservacion,
    monto,
    metodo_pago,
    fecha_pago,
    referencia_pago
  } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.crear_pago($1, $2, $3, $4, $5)',
      [
        id_reservacion,
        monto,
        metodo_pago,
        fecha_pago,
        referencia_pago
      ]
    );
    const respuesta = result.rows[0];
    if (respuesta.pagoid === null) {
      return res.status(400).json({ mensaje: respuesta.mensaje });
    }
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET por filtros (revisar parametros)
exports.searchPagos = async (req, res) => {
  const { id_cliente, fecha_pago, metodo_pago } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.obtener_pago($1, $2, $3)',
      [
        id_cliente ? parseInt(id_cliente) : null,
        fecha_pago || null,
        metodo_pago || null
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
