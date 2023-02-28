const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// conectar mongo
/* 
    mongoose.Promise = global.Promise;
    Esta línea de código establece la biblioteca Promise por defecto para Mongoose, 
    una popular herramienta de modelado de objetos MongoDB para Node.js.
*/
mongoose.Promise = global.Promise;
mongoose.set({strictQuery: false}) // esto lo hice para que no me salga la advertencia de que strictQuery sera true en la version 7 de mongoose
mongoose.connect('mongodb://localhost/restapis', {useNewUrlParser: true})

const app = express()

require('dotenv').config()
const port = process.env.PORT

// rutas
const clientsRouter = require('./clients/clients.router').router
const productsRouter = require('./products/products.router').router
const ordersRouter = require('./orders/orders.router').router

//? esta configuracion es para habilitar el req.body
app.use(express.json());

//? esto es para poder usar el -> x-www-form-urlencoded de Postman
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1/', clientsRouter)
app.use('/api/v1/', productsRouter)
app.use('/api/v1/', ordersRouter)

// La función app.listen() se usa para vincular y escuchar las conexiones en el host y el puerto especificados.
app.listen(port, () => {
    console.log(`server started port ${port}`);})

