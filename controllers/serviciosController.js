
const pool = require('../db/connection');

// POST 
exports.createServicios = async (req, res) => {
  const {
    nombre_servicio,
    descripcion,
    precio_unitario,
    disponible
  } = req.body;
  // Convertir booleano a texto para la función SQL
  const disponibilidad = disponible ? 'Disponible' : 'No disponible';
  try {
    const result = await pool.query(
      'SELECT reservaciones.crear_servicio($1, $2, $3, $4)',
      [
        nombre_servicio,
        descripcion,
        precio_unitario,
        disponibilidad
      ]
    );
    const mensaje = result.rows[0].crear_servicio;
    res.status(201).json({ mensaje });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET por ID
exports.getServiciosById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservaciones.obtener_servicio_por_id($1)', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT (Faltan parametros)
exports.updateServicios = async (req, res) => {
  const {
    nombre_servicio,
    descripcion,
    precio_unitario,
    disponible
  } = req.body;
  const disponibilidad = disponible ? 'Disponible' : 'No disponible';
  try {
    const result = await pool.query(
      'SELECT reservaciones.actualizar_servicio($1, $2, $3, $4, $5)',
      [
        req.params.id,
        nombre_servicio,
        descripcion,
        precio_unitario,
        disponibilidad
      ]
    );
    const mensaje = result.rows[0].actualizar_servicio;

    res.status(200).json({ mensaje });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteServicios = async (req, res) => {
  try {
    const result = await pool.query('SELECT reservaciones.eliminar_servicio($1)', [req.params.id]);
    res.json({ mensaje: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET con filtros (disponibilidad)
exports.searchServicios = async (req, res) => {
  const { disponibilidad } = req.query;
  // Convertir disponibilidad booleana (como string) a texto esperado por la base
  let estado = null;
  if (disponibilidad === 'true') {
    estado = 'Disponible';
  } else if (disponibilidad === 'false') {
    estado = 'No disponible';
  }
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.obtener_servicio($1)',
      [estado]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};