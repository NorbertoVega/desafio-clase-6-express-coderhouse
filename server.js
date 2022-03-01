const express = require('express');
const app = express();
const PORT = 8080;

const Contenedor = require('./contenedor.js');
let productContainer = new Contenedor('productos.txt');

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

app.get('/productos', (solicitud, respuesta) => {

    productContainer.getAll().then((productArray)=> {
        respuesta.send(productArray);
    }).catch((error)=> {
        respuesta.send('No se pudieron obtener todos los productos. ' + error)
    });
})

app.get('/productoRandom', (solicitud, respuesta) => {

    productContainer.getAll().then((productArray)=> {
        if (productArray.length === 1)
            respuesta.send(productArray[0]);
        if (productArray.length > 1){
            const min = 1;
            const max = productArray.length + 1;
            const randomPosition = Math.floor(Math.random() * (max -min) + min);
            respuesta.send(productArray[randomPosition - 1]);
        }
    }).catch((error)=> {
        respuesta.send('No se pudo obtener un producto de forma aleatoria. ' + error)
    });
})
