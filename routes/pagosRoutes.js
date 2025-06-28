
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pagosController');

router.post('/pagos', ctrl.createPagos);
router.get('/pagos/:id', ctrl.getPagosById);
router.get('/pagos', ctrl.searchPagos);

module.exports = router;
