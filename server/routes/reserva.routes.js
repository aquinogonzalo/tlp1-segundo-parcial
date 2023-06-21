// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores
const router = require('express').Router();

const {
    obtenerReservas,
    crearReserva,
    obtenerReservas,
    actualizarReserva,
    eliminarReserva
} = require('../controllers/reserva.controllers');

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
router.get('/reserva/', async (_req, res) => {
    return res.render('reserva/lista_reservas');
});

// Formulario para crear una reserva
router.get('/reserva/nueva', async (_req, res) => {
    return res.render('reserva/nueva_reserva');
});

// Formulario para actualizar una reserva
router.get('/usuario/editar/:cod_reserva', async (req, res) => {
    return res.render('usuario/actualizar_reserva', { id: req.params.cod_reserva });
});


// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get('/api/reservas/', obtenerReservas);

// Crear una reserva
router.post('/api/reserva/', crearReserva);

// Actualizar una reserva
router.put('/api/reserva/:cod_reserva', actualizarReserva);

// Eliminar una reserva de forma lógica
router.delete('/api/reserva/:cod_reserva', eliminarReserva);


module.exports = router;