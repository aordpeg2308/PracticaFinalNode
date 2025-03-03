const Animal = require("../database/Animal");
const { v4: uuid } = require("uuid");

const obtenerAnimales = (filterParams) => {

    try {
        const todosLosAnimales = Animal.obtenerAnimales(filterParams);
        return todosLosAnimales;
    } catch (error) {
        throw error;
    }
   
};

const obtenerAnimal = (animalId) => {
    try {
        const animal = Animal.obtenerAnimal(animalId);
    return animal;
    } catch (error) {
        throw error;
    }
    
};

const crearAnimal = (nuevoAnimal) => {
    const animalAInsertar = {
        ...nuevoAnimal,
        id: uuid(),
        creadoEn: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
        actualizadoEn: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
    };
    try {
        const animalCreado = Animal.crearAnimal(animalAInsertar);
    return animalCreado;
    } catch (error) {
        throw error;
    }
    
};

const actualizarAnimal = (animalId, cambios) => {
    try {
        const animalActualizado = Animal.actualizarAnimal(animalId, cambios);
        return animalActualizado;
    } catch (error) {
        throw error;
    }
   
};

const eliminarAnimal = (animalId) => {

    try {
        Animal.eliminarAnimal(animalId);
        
    } catch (error) {
         throw error;
    }
    
};

module.exports = {
    obtenerAnimales,
    obtenerAnimal,
    crearAnimal,
    actualizarAnimal,
    eliminarAnimal
};
