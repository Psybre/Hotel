
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/serviciosController');

router.post('/servicios', ctrl.createServicios);
router.get('/servicios/:id', ctrl.getServiciosById);
router.put('/servicios/:id', ctrl.updateServicios);
router.delete('/servicios/:id', ctrl.deleteServicios);
router.get('/servicios', ctrl.searchServicios);

module.exports = router;
