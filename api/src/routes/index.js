const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getVideogames = require('../controllers/getVideogames'); 
const getVideogameById = require('../controllers/getVideogameById');
const getVideogamesByName = require('../controllers/getVideogamesByName');
const createVideogame = require('../controllers/createVideogame');
const getGenres = require('../controllers/getGenres');
const getVideogameGenres = require('../controllers/getVideogameGenres');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getVideogames);
router.get("/videogames/name", getVideogamesByName);
router.get("/videogames/:idVideogame", getVideogameById);
router.post("/videogames", createVideogame);
router.get("/genres", getGenres);
router.get("/videogames/:id/genres", getVideogameGenres);


module.exports = router;
