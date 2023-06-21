// Imports
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')


const path = require('path');

const app = express();

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet())
app.use(express.json());



app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.get('*', (_req, res) => {
    res.status(404).send('Error 404 - La peticion no coincide con ninguna de las rutas declaradas');
})

// Starting the server
app.listen(45635, () => console.log('Server on port xxxx'));