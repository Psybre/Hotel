
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/habitacionesController');

router.post('/habitaciones', ctrl.createHabitaciones);
router.get('/habitaciones/:id', ctrl.getHabitacionesById);
router.put('/habitaciones/:id', ctrl.updateHabitaciones);
router.delete('/habitaciones/:id', ctrl.deleteHabitaciones);
router.get('/habitaciones', ctrl.searchHabitaciones);

module.exports = router;
