const express = require("express");
const animalController = require("../../controllers/animalController");
const router = express.Router();

router.get("/", animalController.obtenerAnimales);

router.get("/:animalId", animalController.obtenerAnimal);

router.post("/", animalController.crearAnimal);

router.patch("/:animalId", animalController.actualizarAnimal);

router.delete("/:animalId", animalController.eliminarAnimal);

module.exports = router;
