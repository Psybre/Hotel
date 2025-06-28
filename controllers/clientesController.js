const pool = require('../db/connection');

// POST
exports.createCliente = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    documento_identidad,
    nacionalidad,
    fecha_nacimiento
  } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.crear_cliente($1, $2, $3, $4, $5, $6, $7)',
      [nombre, apellido, email, telefono, documento_identidad, nacionalidad, fecha_nacimiento]
    );
    const respuesta = result.rows[0];
    if (respuesta.clienteid === null) {
      // Error lógico desde la función PL/pgSQL (email o fecha inválida)
      return res.status(400).json({ mensaje: respuesta.mensaje });
    }
    // Cliente creado exitosamente
    res.status(201).json(respuesta);
  } catch (error) {
    // Error inesperado en el servidor
    res.status(500).json({ error: error.message });
  }
};


//GET por ID
exports.getClienteById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservaciones.obtener_cliente_por_id($1)', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (error) {
    console.error('Error en getClienteById:', error);
    res.status(500).json({ error: error.toString() });
  }
};


//PUT 
exports.updateCliente = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    documento_identidad,
    nacionalidad,
    fecha_nacimiento
  } = req.body;
  try {
    const result = await pool.query(
      'SELECT reservaciones.actualizar_cliente($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        req.params.id,
        nombre,
        apellido,
        email,
        telefono,
        documento_identidad,
        nacionalidad,
        fecha_nacimiento
      ]
    );
    const mensaje = result.rows[0].actualizar_cliente;
    if (mensaje !== 'Cliente actualizado') {
      // Error lógico detectado en la función (email inválido o fecha futura)
      return res.status(400).json({ mensaje });
    }
    // Actualización exitosa
    res.status(200).json({ mensaje });
  } catch (error) {
    // Error inesperado (ej. conexión o SQL)
    res.status(500).json({ error: error.message });
  }
};


//DELETE por id
exports.deleteCliente = async (req, res) => {
  try {
    const result = await pool.query('SELECT reservaciones.eliminar_cliente($1)', [req.params.id]);
    res.json({ mensaje: result.rows[0].eliminar_cliente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET por nombre, email, país
exports.searchClientes = async (req, res) => {
  const { nombre, email, pais } = req.query;
  // Validar que al menos uno de los campos esté presente
  if (!nombre && !email && !pais) {
    return res.status(400).json({
      mensaje: 'Debe proporcionar al menos un criterio de búsqueda: nombre, email o país'
    });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM reservaciones.obtener_cliente($1, $2, $3)',
      [nombre || null, email || null, pais || null]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
