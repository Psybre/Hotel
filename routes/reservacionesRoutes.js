
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservacionesController');

router.post('/reservaciones', ctrl.createReservaciones);
router.get('/reservaciones/:id', ctrl.getReservacionesById);
router.put('/reservaciones/:id', ctrl.updateReservaciones);
router.delete('/reservaciones/:id', ctrl.deleteReservaciones);
router.get('/reservaciones', ctrl.searchReservaciones);

module.exports = router;
