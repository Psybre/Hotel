const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/clientesController');

router.post('/clientes', ctrl.createCliente);
router.get('/clientes/:id', ctrl.getClienteById);
router.put('/clientes/:id', ctrl.updateCliente);
router.delete('/clientes/:id', ctrl.deleteCliente);
router.get('/clientes', ctrl.searchClientes);

module.exports = router;