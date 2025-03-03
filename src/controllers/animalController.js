const bodyParser = require("body-parser");
const animalService = require("../services/animalService");

const obtenerAnimales = (req, res) => {
    const {alimentacion} = req.query;
    const {origen} = req.query;
    try {
        const todosLosAnimales = animalService.obtenerAnimales({alimentacion,origen});
        res.send({ status: "OK", data: todosLosAnimales });
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", data: { error: error?.message || error}})
        
    }
    
};

const obtenerAnimal = (req, res) => {
    const {
        params: { animalId },
    } = req;
    if (!animalId) {

        res.status(400).send({

            status: "FAILED",
            data: { error: "Necesitas mandar el id"}
        })
        
    }
    try {
        const animal = animalService.obtenerAnimal(animalId);
    res.send({ status: "OK", data: animal });
    } catch (error) {
        res.status(error?.status|| 500).send({status: "FAILED", data: {error: error?.message || error}});
    }
    
};

const crearAnimal = (req, res) => {
    const { body } = req;
    if (!body.nombre || !body.nombreCientifico || !body.foto || !body.alimentacion || !body.origen) {
        res.status(400).send({

            status: "FAILED",
            data: {
                error: "Falta uno de los parametros obligatorio"
                
            }
        });
        
    }
    const nuevoAnimal = {
        nombre: body.nombre,
        nombreCientifico: body.nombreCientifico,
        foto: body.foto,
        alimentacion: body.alimentacion,
        origen: body.origen,
    };
    try {
        const animalCreado = animalService.crearAnimal(nuevoAnimal);
    res.status(201).send({ status: "OK", data: animalCreado });
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED",data: {error: error?.message || error}})
    }
    
};

const actualizarAnimal = (req, res) => {
    const {
        body,
        params: { animalId },
    } = req;
    if (!animalId) {
       res.status(400).send({
        status: "FAILED",
        data: { error: " El parametro del id no puede estar vacio"},
       });
    }
    try {
        const animalActualizado = animalService.actualizarAnimal(animalId, body);
        res.send({ status: "OK", data: animalActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}});
    }
   
};

const eliminarAnimal = (req, res) => {
    const {
        params: { animalId },
    } = req;
    if (!animalId) {
        res.status(400).send({
            status: "FAILED",
            data: {error: "El id no puede estar vacio"}
        })
    }
    try {
        animalService.eliminarAnimal(animalId);
    res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", data: { error: error?.message || error}})
    }
    
};

module.exports = {
    obtenerAnimales,
    obtenerAnimal,
    crearAnimal,
    actualizarAnimal,
    eliminarAnimal,
};
