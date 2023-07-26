const express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../db.js');

const getVideogameGenres = async (req, res) => {
    const { id } = req.params;
    try {
        const videogame = await Videogame.findByPk(id, {
        include: {
            model: Genre,
            through: { attributes: [] },
        },
        });

        if (!videogame) {
            return res.status(404).json({ error: 'Videojuego no encontrado' });
        }

        const genres = videogame.Genres.map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
            };
        });

        return res.json(genres);
    } catch (error) {
        console.error('Error al obtener los géneros del videojuego:', error);
        return res.status(500).json({ error: 'Error al obtener los géneros del videojuego' });
    }
}

module.exports = getVideogameGenres;
