const animalService = require("../services/animalService");

const obtenerAnimales = async (req, res) => {
    const { alimentacion, origen } = req.query;
    try {
        const todosLosAnimales = await animalService.obtenerAnimales({ alimentacion, origen });
        res.send({ status: "OK", data: todosLosAnimales.data });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const obtenerAnimal = async (req, res) => {
    const { animalId } = req.params;
    if (!animalId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Necesitas mandar el id" } });
    }
    try {
        const animal = await animalService.obtenerAnimal(animalId);
        res.send({ status: "OK", data: animal });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const crearAnimal = async (req, res) => {
    const { body } = req;
    if (!body.nombre || !body.nombreCientifico || !body.foto || !body.alimentacion || !body.origen) {
        return res.status(400).send({ status: "FAILED", data: { error: "Falta uno de los parámetros obligatorios" } });
    }

    const nuevoAnimal = {
        nombre: body.nombre,
        nombreCientifico: body.nombreCientifico,
        foto: body.foto,
        alimentacion: body.alimentacion,
        origen: body.origen,
    };

    try {
        const animalCreado = await animalService.crearAnimal(nuevoAnimal);
        res.status(201).send({ status: "OK", data: animalCreado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const actualizarAnimal = async (req, res) => {
    const { body, params: { animalId } } = req;
    if (!animalId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El parámetro del id no puede estar vacío" } });
    }
    try {
        const animalActualizado = await animalService.actualizarAnimal(animalId, body);
        res.send({ status: "OK", data: animalActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const eliminarAnimal = async (req, res) => {
    const { animalId } = req.params;
    if (!animalId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El id no puede estar vacío" } });
    }
    try {
        await animalService.eliminarAnimal(animalId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    obtenerAnimales,
    obtenerAnimal,
    crearAnimal,
    actualizarAnimal,
    eliminarAnimal,
};
