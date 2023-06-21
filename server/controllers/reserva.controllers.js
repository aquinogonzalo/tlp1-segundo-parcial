const Reserva = require("../models/Reserva");

const ctrlReservas = {};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrlReservas.obtenerReservas = async (_req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true,
            }
        });

        if (!reservas) {
            throw ({
                status: 404,
                message: 'No se encontraron reservas',
            });
        }

        return res.status(200).json(reservas);

    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al obtener las reservas',
        });
    }
};

// Obtener una reserva
ctrlReservas.obtenerReserva = async (req, res) => {
    try {
        const { cod_reserva } = req.params;
        const reserva = await Reserva.findByPk(cod_reserva);
        //console.log('reserva:', reserva);
        if (!reserva) {
            throw ({
                status: 404,
                message: 'No se encontraron reservas',
            });
        }
        return res.status(200).json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al obtener la reserva',
        });
    }
}

// Crear una reserva
ctrlReservas.crearReserva = async (req, res) => {
    const { nombre, apellido, email, telefono, destino, fecha, hora } = req.body;

    try {
        const existeReserva = await Usuario.findOne({
            where: {
                email
            }
        });


        if (existeReserva) {
            throw ({
                status: 400,
                message: 'La reserva ya existe',
            })
        };

        const nuevaReserva = new Reserva({
            nombre,
            apellido,
            email,
            telefono,
            destino,
            fecha,
            hora,
        });


        // Se va a guardar la reserva en la base de datos
        const reservaCreada = await nuevaReserva.save();

        if (!reservaCreada) {
            throw ({
                message: 'Error al crear la reserva',
            })
        }

        return res.status(201).json({
            message: 'La reserva se ha creado exitosamente.',
        });  //Se retornó la res al cliente
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Ha ocurrido un error al crearse la reserva.',
        });
    }
};

// Actualizar una reserva
ctrlReservas.actualizarReserva = async (req, res) => {

    const { cod_reserva } = req.params;

    const { nombre, apellido, telefono, email, destino, fecha, hora } = req.body;


    try {
        const reservaActualizada = await Usuario.update({
            nombre,
            apellido,
            telefono,
            email,
            destino,
            fecha,
            hora
        }, {
            where: {
                cod_reserva
            }
        })

        if (!reservaActualizada) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la reserva.'
            })
        }

        return res.json({
            message: 'La reserva se ha actualizado correctamente.',
            reservaActualizada
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'El servidor falló, contactese con el servicio tecnico.'
        })
    }
};

// Ctrl para eliminar una reserva de forma lógica
ctrlReservas.eliminarReserva = async (req, res) => {

    const { cod_reserva } = req.params

    try {

        // cambio de estado de true a false(no se elimina, se inhabilita)
        const reservaEliminada = Reserva.update({
            status: false
        }, {
            where: {
                cod_reserva,
                status: true
            }
        })

        //si no se elimina se notifica
        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'Ocurrio un error al eliminar la reserva.'
            })
        }

        // Pass validation
        return res.json({
            message: 'La reserva ha sido eliminada correctamente.',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 5000).json({
            message: error.message || 'Error de servidor, contacte al área de sistemas'
        })
    }
};

module.exports = ctrlReservas;